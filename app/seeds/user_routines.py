from app.models import db, UserRoutine

def seed_user_routines():
  warrenRoutine1 = UserRoutine(
    userId=2, routineId=1
  )
  warrenRoutine2 = UserRoutine(
    userId=2, routineId=2
  )
  demoRoutine = UserRoutine(
    userId=3, routineId=1
  )
  gabeRoutine = UserRoutine(
    userId=4, routineId=1
  )
  markRoutine = UserRoutine(
    userId=5, routineId=1
  )
  coleRoutine = UserRoutine(
    userId=6, routineId=1
  )
  ransonRoutine = UserRoutine(
    userId=7, routineId=1
  )
  mikeRoutine = UserRoutine(
    userId=8, routineId=1
  )
  ptOwn1 = UserRoutine(
    userId=1, routineId=1
  )
  ptOwn2 = UserRoutine(
    userId=1, routineId=2
  )
  ptOwn3 = UserRoutine(
    userId=1, routineId=3
  )
  warOwn1 = UserRoutine(
    userId=2, routineId=4
  )
  demoOwn1 = UserRoutine(
    userId=3, routineId=5
  )

  userRoutines = [
    warrenRoutine1, warrenRoutine2, demoRoutine, gabeRoutine,
    markRoutine, coleRoutine, ransonRoutine,
    mikeRoutine, ptOwn1, ptOwn2, ptOwn3, warOwn1, demoOwn1,
  ]

  db.session.add_all(userRoutines)
  db.session.commit()


def undo_user_routines():
  db.session.execute('TRUNCATE user_routines CASCADE')
  db.session.commit()
