from flask import request, jsonify
from flask_restful import Resource
from uuid import UUID
from models import Tasks, Columns
from utils import ensure_uuid

# This class handles HTTP requests related to tasks.
class TaskResource(Resource):
    # This method handles GET requests to retrieve a task by its ID or all tasks.
    def get(self, task_id=None):
        if task_id:
            task_id = ensure_uuid(task_id)
            task = Tasks.get_or_none(id=task_id)
            if task:
                return task.serialize()
            return {"error": "Task not found"}, 404
        tasks = Tasks.select()
        return jsonify([task.serialize() for task in tasks])
    
    # This method handles POST requests to create a new task.
    def post(self):
        data = request.json
        column_id = data.pop('column_id', None)
        column = Columns.get_or_none(id=column_id)
        if not column:
            return {"error": "Column not found"}, 404
        if 'assigned' in data:
            data['assigned'] = [UUID(user_id) for user_id in data['assigned']]
        new_task = Tasks.create(**data)
        column.task_ids.append(new_task.id)
        column.save()
        return new_task.serialize(), 201
    
    # This method handles PUT requests to update a task by its ID.
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

    # This method handles DELETE requests to delete a task by its ID.
    def delete(self, task_id):
        task_id = ensure_uuid(task_id)
        from models import db
        with db.atomic() as transaction:
            try:
                task = Tasks.get_or_none(id=task_id)
                if task:
                    related_column = Columns.get_or_none(Columns.task_ids.contains(task.id))
                    if related_column:
                        related_column.task_ids.remove(task.id)
                        related_column.save()
                    task.delete_instance()
                else:
                    return {"error": "Task not found"}, 404
            except Exception:
                transaction.rollback()
                return {"error": "There was a problem deleting the task."}, 500
        return {"message": "Task deleted"}, 200
