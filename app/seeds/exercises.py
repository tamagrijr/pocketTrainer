from app.models import db, Exercise

def seed_exercises():
  beginRoutSess1Ex1 = Exercise(
    sessionId=1, workoutId=4, sets='3', reps='10', order=1,
    setType='Single', tempo='1-2-1', rest='30',
    time='10', additionalComments='Do your best',
  )
  beginRoutSess2Ex1 = Exercise(
    sessionId=2, workoutId=2, sets='3', reps='10', order=1,
    setType='Single', rest='60', additionalComments='You got this!',
  )
  beginRoutSess3Ex1 = Exercise(
    sessionId=3, workoutId=5, sets='3', reps='10', order=1,
    setType='Single', rest='90'
  )
  intRoutSess1Ex1 = Exercise(
    sessionId=4, workoutId=5, sets='3', reps='10', order=1,
    setType='Drop', rest='No'
  )
  intRoutSess1Ex2 = Exercise(
    sessionId=4, workoutId=5, sets='3', reps='6', order=2,
    setType='Single', rest='90', additionalComments='Push yourself to get those legs working',
  )
  intRoutSess2Ex1 = Exercise(
    sessionId=5, workoutId=2, sets='5', reps='10', order=1,
    setType='Single', rest='30'
  )
  intRoutSess3Ex1 = Exercise(
    sessionId=6, workoutId=3, sets='5', reps='20', order=1,
    setType='Single',
  )
  advRoutSess1Ex1 = Exercise(
    sessionId=7, workoutId=2, sets='5', reps='10', order=1,
  )
  advRoutSess2Ex1 = Exercise(
    sessionId=8, workoutId=2, sets='3', reps='15', order=1,
  )
  advRoutSess3Ex1 = Exercise(
    sessionId=9, workoutId=2, sets='1', reps='25', order=1
  )
  warrenRoutSess1Ex1 = Exercise(
    sessionId=10, workoutId=3, sets='10', reps='10', order=1
  )
  warrenRoutSess1Ex2 = Exercise(
    sessionId=10, workoutId=3, sets='10', reps='10', order=2
  )
  warrenRoutSess1Ex3 = Exercise(
    sessionId=10, workoutId=3, sets='10', reps='10', order=3
  )
  demoRoutSess1Ex1 = Exercise(
    sessionId=11, workoutId=5, sets='5', reps='10', order=1
  )

  exercises= [
    beginRoutSess1Ex1, beginRoutSess2Ex1, beginRoutSess3Ex1, intRoutSess1Ex1,
    intRoutSess1Ex2, intRoutSess2Ex1, intRoutSess3Ex1, advRoutSess1Ex1,
    advRoutSess2Ex1, advRoutSess3Ex1, warrenRoutSess1Ex1, warrenRoutSess1Ex2,
    warrenRoutSess1Ex3, demoRoutSess1Ex1,
  ]

  db.session.add_all(exercises)
  db.session.commit()


def undo_exercises():
  db.session.execute('TRUNCATE exercises CASCADE')
  db.session.commit()
