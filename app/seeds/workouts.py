from app.models import db, Workout

def seed_workouts():
  sprints = Workout(
    userId=1, categoryId=1,
    name='sprints',
    description='Run as fast as you possibly can',
    approved=True, public=True
  )
  pushUps = Workout(
    userId=1, categoryId=3,
    name='pushups',
    description='Assume a plank position and use your chest to press your bodyweight',
    approved=True, public=True,
    exampleLink='https://www.youtube.com/watch?v=Hu_PjHjsWVk&ab_channel=CleanHealthFitnessInstitute'
  )
  crunches = Workout(
    userId=1, categoryId=7,
    name='crunches',
    description='Positioned on your back use your abdominal muscles to tighten into a ball',
    approved=True, public=True
  )
  toeTouch = Workout(
    userId=1, categoryId=2,
    name='toe touches',
    description='Standing straight without bending your knees, reach as far as you can towards your toes',
    approved=True, public=True
  )
  hackSquat = Workout(
    userId=1, categoryId=4,
    name='hack squat',
    description='Holding the bar behind your back, perform a squat motion keeping your back straight',
    exampleLink='https://www.youtube.com/watch?v=ysUhlbHuMJo&ab_channel=CleanHealthFitnessInstitute',
    approved=True, public=True
  )

  workouts = [
    sprints, pushUps, crunches, toeTouch, hackSquat,
  ]

  db.session.add_all(workouts)
  db.session.commit()


def undo_workouts():
  db.session.execute('TRUNCATE workouts CASCADE;')
  db.session.commit()
