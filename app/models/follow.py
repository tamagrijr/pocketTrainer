from .db import db


class Follow(db.Model):
    __tablename__ = "follows"

    id = db.Column(db.Integer, primary_key=True)
    followerId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    followingId = db.Column(
        db.Integer, db.ForeignKey('users.id'), nullable=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # RELATIONSHIPS
    user_followers = db.relationship( 'User',
                                      foreign_keys=[followerId],
                                      back_populates='followers'
                                    )
    user_following = db.relationship('User',
                                      foreign_keys=[followingId],
                                      back_populates='following'
                                    )

    def to_dict(self):
        return {
            'id': self.id,
            'followerId': self.followerId,
            'followingId': self.followingId,
        }

    def followers(self):
        return self.user_followers.short_dict()


    def following(self):
        return self.user_following.short_dict()
