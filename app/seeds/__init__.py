from flask.cli import AppGroup
from .users import seed_users, undo_users
from .categories import seed_categories, undo_categories
from .tags import seed_tags, undo_tags
from .workouts import seed_workouts, undo_workouts
from .user_tags import seed_user_tags, undo_user_tags
from .follows import seed_follows, undo_follows
from .routines import seed_routines, undo_routines
from .user_routines import seed_user_routines, undo_user_routines
from .sessions import seed_sessions, undo_sessions
from .routine_tags import seed_routine_tags, undo_routine_tags
from .exercises import seed_exercises, undo_exercises

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_categories()
    seed_tags()
    seed_workouts()
    seed_user_tags()
    seed_follows()
    seed_routines()
    seed_user_routines()
    seed_sessions()
    seed_routine_tags()
    seed_exercises()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_categories()
    undo_tags()
    undo_workouts()
    undo_user_tags()
    undo_follows()
    undo_routines()
    undo_user_routines()
    undo_sessions()
    undo_routine_tags()
    undo_exercises()
    # Add other undo functions here
