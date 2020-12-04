# from app.models import db, UserTag

# def seed_user_tags():
#   warrenTag = UserTag(userId=2, tagId=2)
#   gabeTag = UserTag(userId=4, tagId=1)
#   demoTag = UserTag(userId=3, tagId=1)
#   coleTag1 = UserTag(userId=6, tagId=1)
#   coleTag2 = UserTag(userId=6, tagId=4)

#   tags = [
#     warrenTag, gabeTag, demoTag, coleTag1, coleTag2,
#   ]

#   db.session.add_all(tags)
#   db.session.commit()


# def undo_user_tags():
#   db.session.execute('TRUNCATE user_tags CASCADE')
#   db.session.commit()
