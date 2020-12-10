import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  routineImage: {
    maxWidth: '25em',
    maxHeight: '20em',
  },
  divider: {
    backgroundColor: '#243B5E !important',
    // margin: '.5em 0',
  },
  subDivider: {
    backgroundColor: '#FFE031 !important',
    // margin: '.5em 0',
  },
  routineName: {
    textAlign: 'center',
  },
  sessionName: {
    textAlign: 'center',
  },
}));

export default function RoutineView({ currentUserId, currentRoutine, reDispatch }) {
  const classes = useStyles();

  return (
    <>
      <Grid item>
        <Typography variant='h4' className={classes.routineName}>{currentRoutine.name}</Typography>
        <Divider className={classes.divider} />
      </Grid>

      <Grid item>
        {currentRoutine.photo_url ? <img src={currentRoutine.photo_url} alt='Routine Photo' className={classes.routineImage} /> : null}
      </Grid>


      {currentRoutine.sessions.map(session => {
        return (
          <>
            <Grid item>
              <Typography variant='h5' className={classes.sessionName}>{session.name}</Typography>
              <Divider className={classes.subDivider} />
            </Grid>
            {session.exercises.map(exercise => {
              return (
                <Typography variant='h5' className={classes.sessionName}>{exercise.workout.name}</Typography>
              )
            })}
          </>
        )
      })}

    </>
  )
}
