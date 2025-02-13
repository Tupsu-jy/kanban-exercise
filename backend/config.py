import os
from dotenv import load_dotenv

# This file contains the configuration for the backend application.
# It loads environment variables from a .env file and provides them as constants.

load_dotenv()
load_dotenv("/etc/secrets/.env")

DB_NAME = os.environ.get('DB_NAME', 'DEFAULT_DB_NAME')
DB_USER = os.environ.get('DB_USER', 'DEFAULT_DB_USER')
DB_PASSWORD = os.environ.get('DB_PASSWORD', 'DEFAULT_DB_PASSWORD')
DB_HOST = os.environ.get('DB_HOST', 'DEFAULT_DB_HOST')
