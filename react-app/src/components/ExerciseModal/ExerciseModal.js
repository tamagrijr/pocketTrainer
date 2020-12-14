import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  root: {
    minWidth: 250,
    // height: 200,
    margin: '.2em 1em',
    color: '#FFE031',
    backgroundColor: '#42AFFF !important'
  },
  selected: {
    minWidth: 250,
    margin: '.2em 1em',
    color: '#42AFFF',
    backgroundColor: '#FFE031 !important'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

export default function ExerciseModal({ props }) {
  const classes = useStyles();
  const workouts = useSelector((state) => state.workouts);
  const [category, setCategory] = React.useState('approvedWorkouts')


  const handleSubmit = async () => {
    if (props.method == 'PUT') {
      const putResponse = await fetch(`/api/routines/session/${props.sessionId}/exercise/${props.exerciseId}/edit`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workoutId: props.workoutId, setType: props.setType, sets: props.sets, reps: props.reps, additionalComments: props.comments }),
      });
      if (putResponse.ok) {
        props.reDispatch()
        props.handleClose()
      }
    } else if (props.method == 'POST') {
      const postResponse = await fetch(`/api/routines/session/${props.sessionId}/exercise/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ workoutId: props.workoutId, order: props.length + 1, setType: props.setType, sets: props.sets, reps: props.reps, additionalComments: props.comments }),
      });
      if (postResponse.ok) {
        props.reDispatch()
        props.handleClose()
      }
    }
    return
  }

  const remove = async () => {
    const response = await fetch(`/api/routines/exercise/${props.exerciseId}/remove`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      props.reDispatch()
      props.handleClose()
    }
  }
  if (!workouts.approvedWorkouts) return null
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="edit-workout-form" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          {props.method == 'POST' ? 'Add your exercise' : 'Edit your exercise'}
        </DialogTitle>
        <DialogContent>
          {/* "ADD STUFF HERE TO PICK THE WORKOUT" */}
          <FormControl className={classes.formControl}>
            <InputLabel id="category-select">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <MenuItem value={"approvedWorkouts"}>PT Approved Workouts</MenuItem>
              <MenuItem value={"userWorkouts"}>My Workouts</MenuItem>
            </Select>
          </FormControl>
          <Grid container wrap='nowrap' style={{ overflow: 'auto' }}>
            {workouts[category].map(workout => {
              return (
                <Grid item key={workout.id} >
                  <Card className={workout.id == props.selectedWorkout ? classes.selected : classes.root}>
                    <CardActionArea onClick={() => { props.setWorkoutId(workout.id); props.setSelectedWorkout(workout.id) }}>
                      <CardContent>
                        <Typography variant="h5" component="h2">
                          {workout.name}
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">
                          {workout.description}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              )
            })}
          </Grid>
          <TextField
            color='secondary'
            margin="dense"
            id="SetType"
            label="Set Type"
            value={props.setType}
            onChange={(e) => props.setSetType(e.target.value)}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="Sets"
            label="Sets"
            value={props.sets}
            onChange={(e) => props.setSets(e.target.value)}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="Reps"
            label="Reps"
            value={props.reps}
            onChange={(e) => props.setReps(e.target.value)}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="comments"
            label="Additional Comments"
            value={props.comments}
            onChange={(e) => props.setComments(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          {props.method == 'PUT' ?
            <Button onClick={remove}>Remove</Button> :
            null
          }
          <Button onClick={props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!props.workoutId} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
