from app.models import db,  Category

def seed_categories():
  cardio = Category(name='Cardio')
  flexibility = Category(name='Felxibility')
  strength = Category(name='Strength')
  power = Category(name='Power')
  rest = Category(name='Rest')
  highIntensity = Category(name='High Intensity')
  abdominal = Category(name='Abdominal')

  categoreis=[
    cardio, flexibility, strength, power, rest, highIntensity, abdominal
  ]

  db.session.add_all(categoreis)
  db.session.commit()

def undo_categories():
  db.session.execute('TRUNCATE categories CASCADE;')
  db.session.commit()
