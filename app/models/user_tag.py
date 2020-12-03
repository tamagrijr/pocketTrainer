from .db import db

class UserTag(db.Model):
  __tablename__ = "user_tags"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  tagId = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'tagId': self.tagId,
    }
