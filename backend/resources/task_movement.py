from flask import request, current_app
from flask_restful import Resource
from models import Columns
from utils import ensure_uuid

# This class handles HTTP requests related to task movement within a column.
class TaskMovementInsideColumnResource(Resource):
    def put(self):
        data = request.json
        column_id = ensure_uuid(data.get('column_id'))
        from_index = data.get('from_index')
        to_index = data.get('to_index')
        task_id = ensure_uuid(data.get('task_id'))
        column = Columns.get_or_none(id=column_id)
        if not column:
            return {"error": "Column not found"}, 404
        if from_index is None or to_index is None:
            return {"error": "Both from_index and to_index must be provided"}, 400
        if from_index < 0 or from_index >= len(column.task_ids) or to_index < 0 or to_index >= len(column.task_ids):
            return {"error": "Invalid index values provided"}, 400
        if str(column.task_ids[from_index]) != str(task_id):
            return {"error": "The provided task_id does not match the task being moved"}, 400
        task = column.task_ids.pop(from_index)
        column.task_ids.insert(to_index, task)
        column.save()
        return column.serialize()

# This class handles HTTP requests related to task movement between columns.
class TaskMovementAcrossColumnsResource(Resource):
    def put(self):
        data = request.json
        column1_id = ensure_uuid(data.get('column1_id'))
        column2_id = ensure_uuid(data.get('column2_id'))
        column1_from_index = data.get('column1_from_index')
        column2_to_index = data.get('column2_to_index')
        task_id = ensure_uuid(data.get('task_id'))
        column1 = Columns.get_or_none(id=column1_id)
        column2 = Columns.get_or_none(id=column2_id)
        if not all([column1, column2]):
            return {"error": "One or both columns not found"}, 404
        if not (0 <= column1_from_index <= len(column1.task_ids)) or not (0 <= column2_to_index <= len(column2.task_ids)):
            return {"error": "Invalid index values provided for one or both columns"}, 400
        if str(column1.task_ids[column1_from_index]) != str(task_id):
            error_message = (
                f"Mismatch in task ID. "
                f"Expected Task ID: {column1.task_ids[column1_from_index]}, "
                f"Provided Task ID: {task_id}. "
                f"Column1 ID: {column1_id}, "
                f"Column2 ID: {column2_id}. "
                f"Moving from index {column1_from_index} in Column1 to index {column2_to_index} in Column2."
            )
            return {"error": error_message}, 400
        task_to_move = column1.task_ids.pop(column1_from_index)
        column2.task_ids.insert(column2_to_index, task_to_move)
        column1.save()
        column2.save()
        return {
            "column1": column1.serialize(),
            "column2": column2.serialize()
        }
