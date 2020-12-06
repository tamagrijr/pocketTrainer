from .db import db

class Upvote(db.Model):
  __tablename__ = "upvotes"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  routineId = db.Column(db.Integer, db.ForeignKey('routines.id'))
  workoutId = db.Column(db.Integer, db.ForeignKey('workouts.id'))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  user = db.relationship('User',
    back_populates='upvotes'
  )
  routine = db.relationship('Routine',
    back_populates='upvotes'
  )
  workout = db.relationship('Workout',
    back_populates='upvotes'
  )

  def to_dict(self):
    return {
      'userId': self.userId,
      'routineId': self.routineId,
      'wokroutId': self.workoutId,
    }
