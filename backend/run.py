from flask import Flask, jsonify, request, current_app
from flask_cors import CORS
from flask_restful import Api, Resource
from peewee import Model, CharField, IntegerField, UUIDField, PrimaryKeyField, IntegrityError
import uuid
import logging
from playhouse.postgres_ext import PostgresqlExtDatabase, ArrayField
from uuid import UUID
import subprocess
import os
from dotenv import load_dotenv

load_dotenv()
load_dotenv("/etc/secrets/.env")


# Load the database configurations from environment variables
db_name = os.environ.get('DB_NAME', 'DEFAULT_DB_NAME')
db_user = os.environ.get('DB_USER', 'DEFAULT_DB_USER')
db_password = os.environ.get('DB_PASSWORD', 'DEFAULT_DB_PASSWORD')
db_host = os.environ.get('DB_HOST', 'DEFAULT_DB_HOST')

# TODO: Swagger documentation would be nice to have
# Flask application initialization
app = Flask(__name__)

# TODO: This is not secure, needs to be changed
# Allow all domains to access the API
CORS(app)

api = Api(app)

# Database connection settings
db = PostgresqlExtDatabase(db_name, user=db_user,
                           password=db_password, host=db_host)

# TODO: database table names need to be changed. This is big and annoyng job. Remember to do correclty from the beginning in future projects.
# edit. these came from the readme instructions. Maybe not change them after all??

# Setting up logging for the application to track errors and other information
logging.basicConfig(level=logging.DEBUG)

# BaseModel provides a common base for other models, linking them to the same database.


class BaseModel(Model):
    class Meta:
        database = db

# User model definition with its serialization method


class Users(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    name = CharField()

    def serialize(self):
        return {'id': str(self.id), 'name': self.name}

# Tasks model definition with its serialization method


class Tasks(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    name = CharField()
    assigned = ArrayField(UUIDField, default=[])
    description = CharField()
    importance = IntegerField()

    def serialize(self):
        return {'id': str(self.id), 'name': self.name, 'assigned': [str(a) for a in self.assigned], 'description': self.description, 'importance': self.importance}

# Columns model definition with its serialization method


class Columns(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    task_ids = ArrayField(UUIDField, default=[])
    name = CharField()

    def serialize(self):
        return {'id': str(self.id), 'name': self.name, 'task_ids': [str(task_id) for task_id in self.task_ids]}

# API resource to handle user-related operations


class UsersResource(Resource):
    def get(self):
        current_app.logger.info('Fetching all users.')
        users = Users.select()
        return jsonify([user.serialize() for user in users])


# API resource to handle column-related operations
class ColumnsResource(Resource):
    def get(self):
        current_app.logger.info('Fetching all columns.')
        columns = Columns.select()
        return jsonify([column.serialize() for column in columns])


# API resource to handle moving tasks within a single column
class TaskMovementInsideColumnResource(Resource):
    def put(self):
        # Parse the JSON data received in the request
        data = request.json

        # Retrieve the column ID from the data and ensure it's in UUID format
        column_id = ensure_uuid(data.get('column_id'))

        # Fetch the 'from' and 'to' index positions indicating where the task should be moved from and to
        from_index = data.get('from_index')
        to_index = data.get('to_index')

        # Fetch the task ID that needs to be moved and ensure it's in UUID format
        task_id = ensure_uuid(data.get('task_id'))

        # Fetch the column using the provided column ID from the database
        column = Columns.get_or_none(id=column_id)

        # Check if the column is found in the database
        if not column:
            return {"error": "Column not found"}, 404

        # Validate that both 'from' and 'to' index positions are provided
        if from_index is None or to_index is None:
            return {"error": "Both from_index and to_index must be provided"}, 400

        # Check if the given index positions are within the valid range of the column's task list
        if from_index < 0 or from_index >= len(column.task_ids) or \
           to_index < 0 or to_index >= len(column.task_ids):
            return {"error": "Invalid index values provided"}, 400

        # Ensure that the task ID at the 'from' index in the column matches the provided task ID
        if str(column.task_ids[from_index]) != str(task_id):
            return {"error": "The provided task_id does not match the task being moved"}, 400

        # Remove the task from its current position within the column
        task = column.task_ids.pop(from_index)

        # Insert the task into its new desired position within the column
        column.task_ids.insert(to_index, task)

        # Save the updated column to the database
        column.save()

        # Return the updated state of the column
        return column.serialize()


# API resource to handle moving tasks between two columns
class TaskMovementAcrossColumnsResource(Resource):
    def put(self):
        # Parsing the JSON data received in the request
        data = request.json

        # Retrieving column IDs and converting any string representation to UUID
        column1_id = ensure_uuid(data.get('column1_id'))
        column2_id = ensure_uuid(data.get('column2_id'))

        # Fetching the index positions for task movement
        column1_from_index = data.get('column1_from_index')
        column2_to_index = data.get('column2_to_index')

        # Fetching the task ID to be moved and converting string to UUID
        task_id = ensure_uuid(data.get('task_id'))

        # Fetching columns from the database using the provided IDs
        column1 = Columns.get_or_none(id=column1_id)
        column2 = Columns.get_or_none(id=column2_id)

        # Check if both columns are found in the database
        if not all([column1, column2]):
            return {"error": "One or both columns not found"}, 404

        # Validate if the given index positions are within the valid range for each column's task list
        if not (0 <= column1_from_index <= len(column1.task_ids)) or \
           not (0 <= column2_to_index <= len(column2.task_ids)):
            return {"error": "Invalid index values provided for one or both columns"}, 400

        # Validate if the task ID at the provided 'from' index in the first column matches the given task ID
        if str(column1.task_ids[column1_from_index]) != str(task_id):
            # Constructing an error message detailing the mismatch
            error_message = (
                f"Mismatch in task ID. "
                f"Expected Task ID: {column1.task_ids[column1_from_index]}, "
                f"Provided Task ID: {task_id}. "
                f"Column1 ID: {column1_id}, "
                f"Column2 ID: {column2_id}. "
                f"Moving from index {column1_from_index} in Column1 to index {column2_to_index} in Column2."
            )
            return {"error": error_message}, 400

        # Removing the task from its current position in the first column
        task_to_move = column1.task_ids.pop(column1_from_index)
        # Inserting the task into the desired position in the second column
        column2.task_ids.insert(column2_to_index, task_to_move)

        # Saving the updated columns to the database
        column1.save()
        column2.save()

        # Returning the updated state of both columns
        return {
            "column1": column1.serialize(),
            "column2": column2.serialize()
        }


# API resource to handle task CRUD operations
class TaskResource(Resource):

    def get(self, task_id=None):
        if task_id:
            task_id = ensure_uuid(task_id)
            task = Tasks.get_or_none(id=task_id)
            if task:
                return task.serialize()
            return {"error": "Task not found"}, 404

        tasks = Tasks.select()
        return jsonify([task.serialize() for task in tasks])

    def post(self):
        data = request.json
        column_id = data.pop('column_id', None)

        column = Columns.get_or_none(id=column_id)
        if not column:
            return {"error": "Column not found"}, 404

        # Convert string IDs to UUIDs
        if 'assigned' in data:
            data['assigned'] = [UUID(user_id) for user_id in data['assigned']]

        new_task = Tasks.create(**data)
        column.task_ids.append(new_task.id)
        column.save()

        return new_task.serialize(), 201

    def put(self, task_id):
        task_id = ensure_uuid(task_id)
        task = Tasks.get_or_none(id=task_id)
        if task:
            for key, value in request.json.items():
                if key == 'assigned':
                    value = [UUID(user_id) for user_id in value]
                setattr(task, key, value)
            task.save()
            return task.serialize()
        return {"error": "Task not found"}, 404

    def delete(self, task_id):
        task_id = ensure_uuid(task_id)
        with db.atomic() as transaction:  # Start a new transaction
            try:
                task = Tasks.get_or_none(id=task_id)
                if task:
                    # Step 1: Identify the column which has this task.
                    related_column = Columns.get_or_none(
                        Columns.task_ids.contains(task.id))
                    if related_column:
                        # Step 2: Remove the task ID from the column's task_ids array.
                        related_column.task_ids.remove(task.id)
                        related_column.save()

                    # Delete the task.
                    task.delete_instance()

                else:
                    return {"error": "Task not found"}, 404

            except IntegrityError:  # Catch any database integrity errors
                transaction.rollback()  # If there's any issue, roll back the transaction
                return {"error": "There was a problem deleting the task."}, 500

        return {"message": "Task deleted"}, 200


# Helper function to validate and ensure UUID format
def ensure_uuid(value):
    if isinstance(value, str):
        try:
            return UUID(value)
        except ValueError:
            return None  # or raise an appropriate error
    elif isinstance(value, UUID):
        return value
    else:
        return None  # or raise an appropriate error

# Helper function to check that database is ready to accept connections


def is_db_ready():
    cmd = ["pg_isready", "-h", db_host, "-U", db_user, "-d", db_name]
    try:
        subprocess.check_call(cmd)
        return True
    except subprocess.CalledProcessError:
        return False

import time

def wait_for_db_connection(retries=10, delay=6):
    """Wait for the database to become available."""
    
    for i in range(retries):
        if is_db_ready():
            current_app.logger.info('Connected to the database successfully.')
            return True
        else:
            current_app.logger.warning(
                f"Can't connect to the database. Attempt {i + 1}/{retries}. Waiting for {delay} seconds before retrying.")
            time.sleep(delay)
    
    current_app.logger.error('Failed to connect to the database after multiple attempts.')
    return False


# API Endpoints
api.add_resource(UsersResource, "/user")
api.add_resource(ColumnsResource, "/column")
api.add_resource(TaskResource, "/task", "/task/<string:task_id>")
api.add_resource(TaskMovementInsideColumnResource,
                 "/columns/move_task/inside")
api.add_resource(TaskMovementAcrossColumnsResource,
                 "/columns/move_task/across")

# Before and after request handlers to manage database connections


@app.before_request
def before_request():
    current_app.logger.info('Database connection opened.')
    db.connect()


@app.after_request
def after_request(response):
    current_app.logger.info('Database connection closed.')
    db.close()
    return response


if __name__ == "__main__":
    with app.app_context():
        current_app.logger.info('Starting Flask server.')

        if not wait_for_db_connection():
            current_app.logger.error('Database is not ready.')
            exit(1)

        current_app.logger.info('Connecting to the database.')
        db.connect()
    app.run(host='0.0.0.0')
