from .db import db

class Session(db.Model):
  __tablename__ = "sessions"

  id = db.Column(db.Integer, primary_key=True)
  routineId = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
  order = db.Column(db.Integer)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text, nullable=False)
  removed = db.Column(db.Boolean, nullable=False, default=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  routine = db.relationship('Routine',
    back_populates='sessions'
  )
  user_sessions = db.relationship('UserSession',
    back_populates='session'
  )
  exercises = db.relationship('Exercise',
    back_populates='session'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'routineId': self.routineId,
      'name': self.name,
      'description': self.description,
      'order': self.order,
      'removed': self.removed,
      'exercises': [exercise.to_dict() for exercise in self.exercises]
    }


  def session_id(self):
    return self.id


  def exercise_ids(self):
    return [exercise.exercise_id() for exercise in self.exercises]
