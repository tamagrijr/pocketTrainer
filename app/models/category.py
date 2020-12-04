from .db import db

class Category(db.Model):
  __tablename__ = "categories"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  workouts = db.relationship('Workout',
    back_populates='category'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
    }
