from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .follow import Follow
from .user_tag import user_tags

class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(255), nullable = False)
  avatar = db.Column(db.Text, nullable = True)
  bio = db.Column(db.Text, nullable = True)
  insta = db.Column(db.String, nullable = True)
  faceBook = db.Column(db.String, nullable = True)
  youTube = db.Column(db.String, nullable = True)
  created_on = db.Column(db.DateTime, server_default=db.func.now())
  updated_on = db.Column(db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

  #RELATIONSHIPS
  followers = db.relationship('Follow',
    foreign_keys=[Follow.followingId],
    back_populates='user_followers'
  )
  following = db.relationship('Follow',
    foreign_keys=[Follow.followerId],
    back_populates='user_following'
  )
  upvotes = db.relationship('Upvote',
    back_populates='user'
  )
  workouts = db.relationship('Workout',
    back_populates='user'
  )
  tags = db.relationship('Tag',
    secondary=user_tags,
    back_populates='user'
  )
  routines = db.relationship('Routine',
    back_populates='user'
  )
  reports = db.relationship('UserReport',
    back_populates='user'
  )
  user_routines = db.relationship('UserRoutine',
    back_populates='user'
  )
  user_sessions = db.relationship('UserSession',
    back_populates='user'
  )
  user_exercises = db.relationship('UserExercise',
    back_populates='user'
  )


  @property
  def password(self):
    return self.hashed_password


  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)


  def check_password(self, password):
    return check_password_hash(self.password, password)


  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email,
      "avatar": self.avatar,
      "bio": self.bio,
      "insta": self.insta,
      "faceBook": self.faceBook,
      "youTube": self.youTube,
      "followers": [follower.to_dict() for follower in self.followers],
      "following": [following.to_dict() for following in self.following],
      "upvotes": [upvotes.to_dict() for upvotes in self.upvotes],
      "workouts": [workout.to_dict() for workout in self.workouts],
      "tags": [tag.to_dict() for tag in self.tags],
      "routines": [routine.to_dict() for routine in self.routines],
      "user_routines": [routine.to_dict() for routine in self.user_routines]
    }
