from .db import db


class UserRoutine(db.Model):
    __tablename__ = "user_routines"

    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    routineId = db.Column(db.Integer, db.ForeignKey(
        'routines.id'), nullable=False)
    active = db.Column(db.Boolean, nullable=False, default=False)
    complete = db.Column(db.Boolean, nullable=False, default=False)
    removed = db.Column(db.Boolean, nullable=False, default=False)
    created_on = db.Column(db.DateTime, server_default=db.func.now())
    updated_on = db.Column(
        db.DateTime, server_default=db.func.now(), server_onupdate=db.func.now())

    # RLEATIONSHIPS
    routine = db.relationship('Routine',
                              back_populates='user_routines'
                              )
    user = db.relationship('User',
                           back_populates='user_routines'
                           )

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'routineId': self.routineId,
            'routine': self.routine.short_dict(),
            'active': self.active,
            'complete': self.complete,
            'removed': self.removed,
        }

    def short_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'routineId': self.routineId,
            # 'routine': self.routine.short_dict(),
            'active': self.active,
            'complete': self.complete,
            'removed': self.removed,
        }
