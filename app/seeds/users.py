from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    pocket = User(username='Pocket Trainer', email='pocket@aa.io', password='password')
    warren = User(username='Warren', email='warren@aa.io', password='password')
    demo = User(username='Demo', email='demo@aa.io', password='password')
    gabe = User(username='Gabe', email='gabe@aa.io', password='password')
    mark = User(username='Mark', email='mark@aa.io', password='password')
    cole = User(username='Cole', email='cole@aa.io', password='password')
    ranson = User(username='Ranson', email='ranson@aa.io', password='password')
    mike = User(username='Mike', email='mike@aa.io', password='password')

    users = [
        pocket, warren, demo, gabe, mark, cole, ranson, mike
    ]

    db.session.add_all(users)

    db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and resets
# the auto incrementing primary key
def undo_users():
    db.session.execute('TRUNCATE users CASCADE;')
    db.session.commit()
