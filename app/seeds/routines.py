from app.models import db, Routine

def seed_routines():
  ptRoutineBeginner = Routine(
    userId=1, name='Pocket Trainer Beginner Routine',
    description='This routine is PT approved for those just starting out their workout journey',
    public=True
  )
  ptRoutineIntermediate = Routine(
    userId=1, name='Pocket Trainer Intermediate Routine',
    description='This routine is PT approved for those who feel more comfortable with their ability to exercise',
    public=True
  )
  ptRoutineAdvanced = Routine(
    userId=1, name='Pocket Trainer Advanced Routine',
    description='This routine is not for the fait of heart, only those who are fully  confident in their ahtletic ability should attempt this',
    public=True
  )
  warrenRoutine = Routine(
    userId=2, name="Warren's Routine",
    description='This routine is for the lazy gym goer',
    public=False
  )
  demoRoutine = Routine(
    userId=3, name='Demo Routine',
    description='This routine belongs to the Demo User',
    public=False
  )

  routines= [
    ptRoutineBeginner, ptRoutineIntermediate, ptRoutineAdvanced,
    warrenRoutine, demoRoutine,
  ]

  db.session.add_all(routines)
  db.session.commit()


def undo_routines():
  db.session.execute('TRUNCATE routines CASCADE;')
  db.session.commit()
