from .db import db

class UserExercise(db.Model):
  __tablename__ = "user_exercises"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  exerciseId = db.Column(db.Integer, db.ForeignKey('exercises.id'))
  complete = db.Column(db.Boolean, nullable=False, default=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  user = db.relationship('User',
    back_populates='user_exercises'
  )
  exercise = db.relationship('Exercise',
    back_populates='user_exercise'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'exerciseId': self.exerciseId,
      'complete': self.complete,
    }
