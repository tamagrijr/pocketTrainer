import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles({
  root: {
    maxWidth: '20em',
    margin: '.5em 0',
  },
  stared: {
    color: '#FFE031',
  },
  active: {
    cursor: 'pointer',
    '&:hover': {
      color: '#FFE031'
    },
  },
  inactive: {

  },
  subDivider: {
    backgroundColor: '#FFE031 !important',
    // margin: '.5em 0',
  },
});

export default function ExerciseCard({ exercise, editable, handleExerciseEdit }) {
  const classes = useStyles();
  return (
    <Card className={classes.root} raised>
      <CardContent className={editable ? classes.active : classes.inactive} onClick={editable ? handleExerciseEdit : () => { }} >
        <Grid container wrap='nowrap' justify='space-between' alignItems='center' alignContent='center'>
          <Grid item>
            <Typography gutterBottom variant="h5" component="h2">
              {exercise.workout.name}
            </Typography>
          </Grid>
        </Grid>

        <Typography variant="body2" color="textSecondary" component="p">
          {exercise.workout.description}
        </Typography>

        <Grid container wrap="nowrap" spacing={3} style={{paddingTop: '1em'}}>
          {exercise.setType ? <Grid item><Typography color="secondary" variant='subtitle2'>{`TYPE: ${exercise.setType}`}</Typography></Grid> : null}
          {exercise.sets ? <Grid item><Typography color="secondary" variant='subtitle2'>{`SETS: ${exercise.sets}`}</Typography></Grid> : null}
          {exercise.reps ? <Grid item><Typography color="secondary" variant='subtitle2'>{`REPS: ${exercise.reps}`}</Typography></Grid> : null}
        </Grid>

      </CardContent>
      <CardActions>
        <Grid container wrap='nowrap' direction='column'>
          {exercise.additionalComments ? <Grid item><Typography color='textSecondary' variant='caption'>additional Comments</Typography></Grid> : null}
          {exercise.additionalComments ? <Grid item><Divider className={classes.subDivider} /></Grid> : null }
          {exercise.additionalComments ? <Grid item><Typography color='textSecondary' variant='subtitle2'>{exercise.additionalComments}</Typography></Grid> : null }
        </Grid>
      </CardActions>
    </Card>
  )
}
