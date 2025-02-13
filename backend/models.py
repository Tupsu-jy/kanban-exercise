import uuid
from peewee import Model, CharField, IntegerField, UUIDField
from playhouse.postgres_ext import PostgresqlExtDatabase, ArrayField
from config import DB_NAME, DB_USER, DB_PASSWORD, DB_HOST

# This file contains the models for the database.
db = PostgresqlExtDatabase(DB_NAME, user=DB_USER, password=DB_PASSWORD, host=DB_HOST)

class BaseModel(Model):
    class Meta:
        database = db

# This model represents a user in the database.
class Users(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    name = CharField()

    def serialize(self):
        return {'id': str(self.id), 'name': self.name}

# This model represents a task in the database.
class Tasks(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    name = CharField()
    assigned = ArrayField(UUIDField, default=[])
    description = CharField()
    importance = IntegerField()

    def serialize(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'assigned': [str(a) for a in self.assigned],
            'description': self.description,
            'importance': self.importance
        }

# This model represents a column in the database.  
class Columns(BaseModel):
    id = UUIDField(primary_key=True, default=uuid.uuid4)
    task_ids = ArrayField(UUIDField, default=[])
    name = CharField()

    def serialize(self):
        return {
            'id': str(self.id),
            'name': self.name,
            'task_ids': [str(task_id) for task_id in self.task_ids]
        }
