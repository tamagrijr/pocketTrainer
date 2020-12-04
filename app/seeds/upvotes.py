from app.models import db, Upvote

def seed_upvotes():
  warrenUp1 = Upvote(userId=2, routineId=1)
  warrenUp2 = Upvote(userId=2, workoutId=1)

  upvotes = [
    warrenUp1, warrenUp2
  ]

  db.session.add_all(upvotes)
  db.session.commit()

def undo_upvotes():
  db.session.execute('TRUNCATE upvotes CASCADE;')
  db.session.commit()
