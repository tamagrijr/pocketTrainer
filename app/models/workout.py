from .db import db

class Workout(db.Model):
  __tablename__ = "workouts"

  id = db.Column(db.Integer, primary_key=True)
  userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
  categoryId = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
  name = db.Column(db.String(255), nullable=False)
  description = db.Column(db.Text, nullable=False)
  exampleLink = db.Column(db.Text)
  approved = db.Column(db.Boolean, nullable=False, default=False)
  public = db.Column(db.Boolean, nullable=False, default=False)
  reported = db.Column(db.Boolean, nullable=False, default=False)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  upvotes = db.relationship('Upvote',
    back_populates='workout'
  )
  user = db.relationship('User',
    back_populates='workouts'
  )
  category = db.relationship('Category',
    back_populates='workouts'
  )
  reports = db.relationship('UserReport',
    back_populates='workout'
  )
  exercise = db.relationship('Exercise',
    back_populates='workout'
  )


  def to_dict(self):
    return {
      'id': self.id,
      'userId': self.userId,
      'categoryId': self.categoryId,
      'name': self.name,
      'description': self.description,
      'exampleLink': self.exampleLink,
      'approved': self.approved,
      'public': self.public,
      'reported': self.reported,
      'category': self.category.to_dict()
    }
