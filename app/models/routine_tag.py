from .db import db

class RoutineTag(db.Model):
  __tablename__ = "routine_tags"

  id = db.Column(db.Integer, primary_key=True)
  routineId = db.Column(db.Integer, db.ForeignKey('routines.id'), nullable=False)
  tagId = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'routineId': self.routineId,
      'tagId': self.tagId,
    }
