from flask import current_app, jsonify
from flask_restful import Resource
from models import Columns

# This file contains the ColumnsResource class which handles HTTP requests
# related to Kanban board columns. It provides endpoints for retrieving
# all columns from the database and returning them as JSON.
class ColumnsResource(Resource):
    def get(self):
        current_app.logger.info('Fetching all columns.')
        columns = Columns.select()
        return jsonify([column.serialize() for column in columns])
