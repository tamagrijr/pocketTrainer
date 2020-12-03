from .db import db

class Session(db.Model):
  __tablename__ = "sessions"

  id = db.Column(db.Integer, primary_key=True)
  routineId = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text, nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'routineId': self.routineId,
      'name': self.name,
      'description': self.description,
    }
