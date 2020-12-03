from app.models import db, Tag

def seed_tags():
  beginner = Tag(name='Beginner')
  intermediate = Tag(name='Intermediate')
  advanced = Tag(name='Advanced')
  weightLoss = Tag(name='Weight Loss')

  tags = [
    beginner, intermediate, advanced, weightLoss,
  ]

  db.session.add_all(tags)
  db.session.commit()

def undo_tags():
  db.session.execute('TRUNCATE tags CASCADE;')
  db.session.commit()
