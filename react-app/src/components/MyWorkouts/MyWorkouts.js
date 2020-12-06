import React from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: '#243B5E !important',
    margin: '.5em 0',
  }
}));

export default function MyWorkouts({userWorkouts}) {
  const classes = useStyles();

  if(!userWorkouts) return null
  return (
    <>
      <Grid item>
        <Typography variant='h4'>
          My Workouts
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      { userWorkouts.map(workout => {
        return(
          <Grid item key={workout.id}>
            <Typography>{workout.name}</Typography>
          </Grid>
        )
      })}
      <Grid item>
        <Button>
          <Typography>Create Workout</Typography>
          <AddCircleIcon color='secondary' style={{marginLeft: '1em'}} />
        </Button>
      </Grid>
    </>
  )
}
