from app.models import db, Session

def seed_sessions():
  ptBeginSess1 = Session(
    routineId=1, name='Day 1',
    description='Work on Flexibility',
  )
  ptBeginSess2 = Session(
    routineId=1, name='Day 2',
    description='Rock out some push-ups',
  )
  ptBeginSess3 = Session(
    routineId=1, name='Day 3',
    description="Let's try some squats",
  )
  ptIntermediateSess1 = Session(
    routineId=2, name='Day 1',
    description="Leg Day"
  )
  ptIntermediateSess2 = Session(
    routineId=2, name='Day 2',
    description="Chest Day"
  )
  ptIntermediateSess3 = Session(
    routineId=2, name='Day 3',
    description="Ab Day"
  )
  ptAdvSess1 = Session(
    routineId=3, name='Day1',
    description='Chest Day'
  )
  ptAdvSess2 = Session(
    routineId=3, name='Day2',
    description='Chest Day 2'
  )
  ptAdvSess3 = Session(
    routineId=3, name='Day3',
    description='Chest Day 3'
  )
  warrenSession = Session(
    routineId=4, name='60 second abs',
    description='Get abs in just 60 secons',
  )
  demoSess = Session(
    routineId=5, name='Day 1',
    description='Squats',
  )

  sessions = [
    ptBeginSess1, ptBeginSess2, ptBeginSess3, ptIntermediateSess1,
    ptIntermediateSess2, ptIntermediateSess3, ptAdvSess1, ptAdvSess2,
    ptAdvSess3, warrenSession, demoSess,
  ]

  db.session.add_all(sessions)
  db.session.commit()


def undo_sessions():
  db.session.execute('TRUNCATE sessions CASCADE')
  db.session.commit()
