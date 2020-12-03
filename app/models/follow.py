from .db import db

class Follow(db.Model):
  __tablename__ = "follows"

  id = db.Column(db.Integer, primary_key=True)
  followerId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  followingId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'follwerId': self.followerId,
      'followingId': self.followingId,
    }
