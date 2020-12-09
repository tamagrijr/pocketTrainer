from .db import db
from .routine_tag import routine_tags

class Routine(db.Model):
  __tablename__ = "routines"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text, nullable=False)
  public = db.Column(db.Boolean, nullable=False, default=False)
  reported = db.Column(db.Boolean, nullable=False, default=False)
  removed = db.Column(db.Boolean, nullable=False, default=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  upvotes = db.relationship('Upvote',
    back_populates='routine'
  )
  tags = db.relationship('Tag',
    secondary=routine_tags,
    back_populates='routine'
  )
  user = db.relationship('User',
    back_populates='routines'
  )
  reports = db.relationship('UserReport',
    back_populates='routine'
  )
  user_routines = db.relationship('UserRoutine',
    back_populates='routine'
  )
  sessions = db.relationship('Session',
    back_populates='routine'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'name': self.name,
      'description': self.description,
      'public': self.public,
      'reported': self.reported,
      'tags': [tag.to_dict() for tag in self.tags],
      'sessions': [session.to_dict() for session in self.sessions]
    }


  def short_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'name': self.name,
      'description': self.description,
      'public': self.public,
      'tags': [tag.to_dict() for tag in self.tags],
      'reported': self.reported,
      'upvotes': [upvote.to_dict() for upvote in self.upvotes],
      'userRoutines': [user_routine.short_dict() for user_routine in self.user_routines]
    }


  def routine_id(self):
    return {
      'sessionIds': [session.session_id() for session in self.sessions],
      'exerciseIds': [session.exercise_ids() for session in self.sessions]
    }
