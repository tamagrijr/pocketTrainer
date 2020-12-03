from .db import db

class UserSession(db.Model):
  __tablename__ = "user_sessions"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  sessionId = db.Column(db.Integer, db.ForeignKey('sessions.id'), nullable=False)
  completed = db.Column(db.Boolean, nullable=False, default=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'sessionId': self.sessionId,
      'completed': self.completed,
    }
