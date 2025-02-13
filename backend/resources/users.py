from flask import current_app, jsonify
from flask_restful import Resource
from models import Users

# This file contains the UsersResource class which handles HTTP requests
# related to users. It provides an endpoint for retrieving all users from the database
# and returning them as JSON.
class UsersResource(Resource):
    # This method handles GET requests to retrieve all users from the database.
    def get(self):
        current_app.logger.info('Fetching all users.')
        users = Users.select()
        return jsonify([user.serialize() for user in users])
