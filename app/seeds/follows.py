from app.models import db, Follow

def seed_follows():
  ptFollower1 = Follow(followerId=2, followingId=1)
  ptFollower2 = Follow(followerId=3, followingId=1)
  ptFollower3 = Follow(followerId=4, followingId=1)
  ptFollower4 = Follow(followerId=5, followingId=1)
  ptFollower5 = Follow(followerId=6, followingId=1)
  ptFollower6 = Follow(followerId=7, followingId=1)
  ptFollower7 = Follow(followerId=8, followingId=1)
  demoFollower1 = Follow(followerId=2, followingId=3)
  warrenFollower1 = Follow(followerId=3, followingId=2)

  follows = [
    ptFollower1, ptFollower2, ptFollower3, ptFollower4,
    ptFollower5, ptFollower6, ptFollower7, demoFollower1,
    warrenFollower1,
  ]

  db.session.add_all(follows)
  db.session.commit()


def undo_follows():
  db.session.execute('TRUNCATE follows CASCADE;')
  db.session.commit()
