from .db import db

class Exercise(db.Model):
  __tablename__ = "exercises"

  id = db.Column(db.Integer, primary_key=True)
  sessionId = db.Column(db.Integer, db.ForeignKey('sessions.id'), nullable=False)
  workoutId = db.Column(db.Integer, db.ForeignKey('workouts.id'), nullable=False)
  sets = db.Column(db.String)
  reps = db.Column(db.String)
  setType = db.Column(db.String)
  tempo = db.Column(db.String)
  rest = db.Column(db.String)
  time = db.Column(db.String)
  additionalComments = db.Column(db.Text)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  session = db.relationship('Session',
    back_populates='exercises'
  )
  workout = db.relationship('Workout',
    back_populates='exercise'
  )
  user_exercise = db.relationship('UserExercise',
    back_populates='exercise'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'sessionId': self.sessionId,
      'workoutId': self.workoutId,
      'sets': self.sets,
      'reps': self.reps,
      'setType': self.setType,
      'tempo': self.tempo,
      'rest': self.rest,
      'time': self.time,
      'additionalComments': self.additionalComments,
      'workout': self.workout.to_dict()
    }
