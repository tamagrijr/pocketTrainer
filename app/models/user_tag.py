from .db import db

user_tags = db.Table(
  'user_tags',
  db.Column('userId', db.Integer, db.ForeignKey('users.id')),
  db.Column('tagId', db.Integer, db.ForeignKey('tags.id'), nullable=False),
  db.Column('created_on', db.DateTime, server_default=db.func.now()),
  db.Column('updated_on', db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())
)

# class UserTag(db.Model):
#   __tablename__ = "user_tags"

#   id = db.Column(db.Integer, primary_key=True)
#   userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
#   tagId = db.Column(db.Integer, db.ForeignKey('tags.id'), nullable=False)
#   created_on = db.Column(db.DateTime, server_default=db.func.now())
#   updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

#   #RELATIONSHIPS
#   user = db.relationship('User',
#     foreign_keys=[userId],
#     back_populates='tags'
#   )
#   tag = db.relationship('Tag',
#     back_populates='user_tag'
#   )

#   def to_dict(self):
#     return {
#       'id': self.id,
#       'userId': self.userId,
#       'tagId': self.tagId,
#     }
