import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

const useStyles = makeStyles({
  root: {
    maxWidth: '20em',
    margin: '.5em 0',
  },
  stared: {
    color: '#FFE031',
  },
  active:{
    cursor: 'pointer',
    '&:hover': {
      color: '#FFE031'
    },
  },
  inactive: {

  },
});

export default function ExerciseCard({ exercise, editable, handleExerciseEdit }) {
  const classes = useStyles();
  console.log('PROPS', exercise)
  console.log('editable', editable)
  console.log('func', handleExerciseEdit)
  return (
    <Card className={classes.root} raised>
      <CardContent className={editable ? classes.active : classes.inactive} onClick={editable ? handleExerciseEdit : () => {}} >
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
      </CardContent>
    </Card>
  )
}
