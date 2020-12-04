from .db import db
from .user_tag import user_tags
from .routine_tag import routine_tags

class Tag(db.Model):
  __tablename__ = "tags"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String(255), nullable=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  user = db.relationship('User',
    secondary=user_tags,
    back_populates='tags'
  )
  routine = db.relationship('Routine',
    secondary=routine_tags,
    back_populates='tags'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'name': self.name,
    }
