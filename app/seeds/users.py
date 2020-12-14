from werkzeug.security import generate_password_hash
from app.models import db, User

# Adds a demo user, you can add other users here if you want
def seed_users():
    pocket = User(username='Pocket Trainer', email='pocket@aa.io', password='password', avatar='https://i.imgur.com/3DS8gg1.png',
    bio='Pocket Trainer is dedicated to helping you train yourself as well as you train your Pokémon')
    warren = User(username='Warren', email='warren@aa.io', password='password', avatar='https://i.imgur.com/97eHz4V.gif', bio='Yo, I made this. With a lotta help from my classmates.')
    demo = User(
        username='Demo', email='demo@aa.io', password='password', avatar='''https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.5AC1heOgalAvv5HoQ1m_WQHaHa%26pid%3DApi&f=1''',
        faceBook='''http://www.facebook.com''', bio='Thank you for trying out Pocket Trainer I hope you have fun messing with the workout routines!',
        insta='http://www.instagram.com', youTube='http://www.youtube.com',
    )
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
