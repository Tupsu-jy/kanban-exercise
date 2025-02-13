import time
import subprocess
from uuid import UUID
from flask import current_app

# This file contains utility functions for the backend application.

# This function ensures that a value is a valid UUID.
def ensure_uuid(value):
    if isinstance(value, str):
        try:
            return UUID(value)
        except ValueError:
            return None
    elif isinstance(value, UUID):
        return value
    else:
        return None

# This function checks if the database is ready to connect to.
def is_db_ready(db_host, db_user, db_name):
    cmd = ["pg_isready", "-h", db_host, "-U", db_user, "-d", db_name]
    try:
        subprocess.check_call(cmd)
        return True
    except subprocess.CalledProcessError:
        return False

# This function waits for the database to be ready to connect to.
def wait_for_db_connection(db_host, db_user, db_name, retries=100, delay=6):
    for i in range(retries):
        if is_db_ready(db_host, db_user, db_name):
            current_app.logger.info('Connected to the database successfully.')
            return True
        else:
            current_app.logger.warning(
                f"Can't connect to the database. Attempt {i+1}/{retries}. Waiting for {delay} seconds before retrying."
            )
            time.sleep(delay)
    current_app.logger.error('Failed to connect to the database after multiple attempts.')
    return False
