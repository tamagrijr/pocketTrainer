from app.models import RoutineTag, db

def seed_routine_tags():
  ptRoutine1Tag = RoutineTag(
    routineId=1, tagId=1,
  )
  ptRoutine2Tag = RoutineTag(
    routineId=2, tagId=2,
  )
  ptRoutine3Tag = RoutineTag(
    routineId=3, tagId=3,
  )
  warrenRoutineTag1 = RoutineTag(
    routineId=4, tagId=3,
  )
  warrenRoutineTag2 = RoutineTag(
    routineId=4, tagId=4,
  )

  routineTags = [
    ptRoutine1Tag, ptRoutine2Tag, ptRoutine3Tag,
    warrenRoutineTag1, warrenRoutineTag2,
  ]

  db.session.add_all(routineTags)
  db.session.commit()


def undo_routine_tags():
  db.session.execute('TRUNCATE routine_tags CASCADE')
  db.session.commit()
