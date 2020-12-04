from .db import db

class UserReport(db.Model):
  __tablename__ = "user_reports"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  routineId = db.Column(db.Integer, db.ForeignKey('routines.id'))
  workoutId = db.Column(db.Integer, db.ForeignKey('workouts.id'))
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  user = db.relationship('User',
    back_populates='reports'
  )
  workout = db.relationship('Workout',
    back_populates='reports'
  )
  routine = db.relationship('Routine',
    back_populates='reports'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'routineId': self.routineId,
      'wokroutId': self.workoutId,
    }
