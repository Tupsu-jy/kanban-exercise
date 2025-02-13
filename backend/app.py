from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from config import DB_NAME, DB_USER, DB_PASSWORD, DB_HOST
from models import db
from resources.users import UsersResource
from resources.columns import ColumnsResource
from resources.task import TaskResource
from resources.task_movement import TaskMovementInsideColumnResource, TaskMovementAcrossColumnsResource
from utils import wait_for_db_connection

app = Flask(__name__)
CORS(app)
api = Api(app)

# This file contains the Flask application and API endpoints for the backend.
# It sets up the Flask application, connects to the database, and defines the API endpoints.
api.add_resource(UsersResource, "/user")
api.add_resource(ColumnsResource, "/column")
api.add_resource(TaskResource, "/task", "/task/<string:task_id>")
api.add_resource(TaskMovementInsideColumnResource, "/columns/move_task/inside")
api.add_resource(TaskMovementAcrossColumnsResource, "/columns/move_task/across")

# This function is called before each request to ensure that the database connection is opened.
@app.before_request
def before_request():
    app.logger.info('Database connection opened.')
    db.connect()

# This function is called after each request to ensure that the database connection is closed.
@app.after_request
def after_request(response):
    app.logger.info('Database connection closed.')
    db.close()
    return response

# This block is executed when the script is run directly.
if __name__ == "__main__":
    # This block ensures that the Flask application context is available.
    with app.app_context():
        app.logger.info('Starting Flask server.')
        if not wait_for_db_connection(DB_HOST, DB_USER, DB_NAME):
            app.logger.error('Database is not ready.')
            exit(1)
        app.logger.info('Connecting to the database.')
        db.connect()
    app.run(host='0.0.0.0')
