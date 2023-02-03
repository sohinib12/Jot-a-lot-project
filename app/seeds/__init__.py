from flask.cli import AppGroup
from .users import seed_users, undo_users
from .notebook import seed_notebook, undo_notebook
from .note import seed_notes, undo_notes
from .scratchpad import seed_scratchpad, undo_scratchpad

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_notebook()
        undo_notes()
        undo_scratchpad()
    seed_users()
    seed_notebook()
    seed_notes()
    seed_scratchpad()

    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_notebook()
    undo_notes()
    undo_scratchpad()
    # Add other undo functions here
