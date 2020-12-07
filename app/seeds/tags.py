from app.models import db, Tag, Routine

def seed_tags():
  beginner = Tag(name='Beginner')
  intermediate = Tag(name='Intermediate')
  advanced = Tag(name='Advanced')
  weightLoss = Tag(name='Weight Loss')

  routine1 = Routine.query.get(1)
  routine2 = Routine.query.get(2)
  routine3 = Routine.query.get(3)

  tags = [
    beginner, intermediate, advanced, weightLoss,
  ]
  db.session.add_all(tags)
  db.session.commit()
  routine1.tags.append(beginner)
  routine2.tags.append(intermediate)
  routine3.tags.append(advanced)
  db.session.add_all([routine1, routine2, routine3])
  db.session.commit()

def undo_tags():
  db.session.execute('TRUNCATE tags CASCADE;')
  db.session.commit()
