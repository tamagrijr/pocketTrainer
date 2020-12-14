import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button'
import WorkoutModal from '../WorkoutModal/WorkoutModal'

const useStyles = makeStyles((theme) => ({
  divider: {
    backgroundColor: '#243B5E !important',
    margin: '.5em 0',
  },
  subDivider: {
    backgroundColor: '#FFE031 !important',
    margin: '.5em 0',
  },
}));

export default function MyWorkouts({ userWorkouts, currentUserId, workoutCategories, reDispatch }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [workoutId, setWorkoutId] = React.useState('');
  const [categoryId, setCategoryId] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [exampleLink, setExampleLink] = React.useState('');
  const [privacy, setPrivacy] = React.useState('');
  const [method, setMethod] = React.useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const createWorkout = () => {
    setMethod('POST');
    setWorkoutId('')
    setCategoryId('')
    setName('')
    setDescription('')
    setExampleLink('')
    setPrivacy(false)
    handleOpen();
  }
  const updateWorkout = (workout) => {
    setMethod('PUT');
    setWorkoutId(workout.id)
    setCategoryId(workout.category.id)
    setName(workout.name)
    setDescription(workout.description)
    setExampleLink(workout.exampleLink)
    setPrivacy(workout.public)
    handleOpen();
  }
  const handleSubmit = async () => {
    if (method == 'POST') {
      const response = await fetch(`api/workouts/user/${currentUserId}/create`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "name": name, "description": description, "exampleLink": exampleLink, "public": privacy, "categoryId": categoryId }),
      });
      if (response.ok) {
        reDispatch()
        handleClose()
      }
    } else if (method == 'PUT') {
      const response = await fetch(`api/workouts/user/${currentUserId}/workout/${workoutId}/update`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "name": name, "description": description, "exampleLink": exampleLink, "public": privacy, "categoryId": categoryId }),
      });
      if (response.ok) {
        reDispatch()
        handleClose()
      }
    } else {
      alert('Failed to submit, please try again')
    }
  }
  const handleDelete = async () => {
    const response = await fetch(`api/workouts/user/${currentUserId}/workout/${workoutId}/delete`, {
      method: 'PUT',
        headers: { "Content-Type": "application/json" },
    });
    if(response.ok) {
      reDispatch()
      handleClose()
    }
  }
  const modalProps = {
    method, categoryId, name, description, exampleLink, privacy, open, workoutId, handleClose, workoutCategories,
    setMethod, setCategoryId, setName, setDescription, setExampleLink, setPrivacy, setWorkoutId, handleSubmit, handleDelete
  }

  if (!userWorkouts) return null
  return (
    <>
      <WorkoutModal props={modalProps} />
      <Grid item>
        <Typography variant='h4'>
          My Workouts
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      { userWorkouts.map(workout => {
        return (
          <Grid item key={workout.id}>
            <Grid container wrap='nowrap' spacing={3}>
              <Grid item>
                <Button onClick={() => updateWorkout(workout)}><Typography>{workout.name}</Typography></Button>
              </Grid>
              <Grid item>
                <Button disabled><Typography color='secondary'>{workout.category.name}</Typography></Button>
              </Grid>
            </Grid>
            <Divider className={classes.subDivider} />
            <Typography>{workout.description}</Typography>

            {workout.exampleLink
            ? <a href={workout.exampleLink} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: '#FFE301', textAlign: 'center'}}><Typography>Example Link</Typography></a>
            : null}

          </Grid>
        )
      })}
      <Grid item>
        <Button onClick={createWorkout}>
          <Typography>Create Workout</Typography>
          <AddCircleIcon color='secondary' style={{ marginLeft: '1em' }} />
        </Button>
      </Grid>
    </>
  )
}
