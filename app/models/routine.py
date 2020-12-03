from .db import db

class Routine(db.Model):
  __tablename__ = "routines"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text, nullable=False)
  public = db.Column(db.Boolean, nullable=False, default=False)
  reported = db.Column(db.Boolean, nullable=False, default=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'name': self.name,
      'description': self.description,
      'public': self.public,
      'reported': self.reported,
    }
