import React from 'react'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RoutineModal from '../RoutineModal/RoutineModal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import SessionModal from '../SessionModal/SessionModal';
import ExerciseModal from '../ExerciseModal/ExerciseModal';
import Avatar from "@material-ui/core/Avatar";
import ExerciseCardContiner from '../ExerciseCard/ExerciseCardContainer'

const useStyles = makeStyles((theme) => ({
  routineImage: {
    maxWidth: '25em',
    maxHeight: '20em',
  },
  divider: {
    backgroundColor: '#243B5E !important',
    margin: '.5em 0',
  },
  subDivider: {
    backgroundColor: '#FFE031 !important',
    // margin: '.5em 0',
  },
  routineName: {
    textAlign: 'center',
  },
  editableRoutineName: {
    textAlign: 'center',
    '&:hover': {
      color: '#FFE031',
      cursor: 'pointer'
    },
  },
  sessionName: {
    textAlign: 'center',
  },
  editableSessionName: {
    textAlign: 'center',
    '&:hover': {
      color: '#FFE031',
      cursor: 'pointer'
    },
  },
  caption: {
    color: '#FFE031',
  },
  sessionButton: {
    '&:hover': {
      color: '#FFE031'
    },
  },
  exerciseButton: {
    '&:hover': {
      color: '#FFE031'
    },
  },
  avatar: {
    backgroundColor: '#FFE031',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  userName: {
    '&:hover': {
      color: '#FFE031'
    },
    cursor: 'pointer',
  },
}));

export default function RoutineView({ currentUserId, currentRoutine, reDispatch }) {
  const classes = useStyles();
  const history = useHistory();

  const [open, setOpen] = React.useState(false);
  const [sessionOpen, setSessionOpen] = React.useState(false);
  const [exerciseOpen, setExerciseOpen] = React.useState(false);
  const [method, setMethod] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [sessionId, setSessionId] = React.useState('');
  const [workoutId, setWorkoutId] = React.useState('');
  const [setType, setSetType] = React.useState('');
  const [sets, setSets] = React.useState('');
  const [reps, setReps] = React.useState('');
  const [comments, setComments] = React.useState('');
  const [length, setLength] = React.useState(0);
  const [selectedWorkout, setSelectedWorkout] = React.useState('');
  const [exerciseId, setExerciseId] = React.useState('');


  const editable = currentUserId === currentRoutine.userId

  const handleClose = () => { setOpen(false); setSessionOpen(false); setExerciseOpen(false); }
  const handleSessionEdit = (id, name, description) => {
    setMethod('PUT');
    setName(name);
    setDescription(description);
    setSessionId(id);
    setSessionOpen(true);
  }
  const handleLength = (session) => {
    setLength(session.exercises.length)
  }
  const following = () => {
    let following = false;
    currentRoutine.user.followers.forEach(follower => {
      if (follower.id === currentUserId) following = true;
    })
    return following
  }
  const followingRoutine = () => {
    let following = false;
    currentRoutine.userRoutines.forEach(routine => {
      if (routine.userId == currentUserId) following = true;
    })
    return following
  }
  const handleFollow = async () => {
    const response = await fetch(`/api/users/follower/${currentUserId}/following/${currentRoutine.user.id}/follow`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const handleUnfollow = async () => {
    const response = await fetch(`/api/users/follower/${currentUserId}/following/${currentRoutine.user.id}/unfollow`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const handleRoutineFollow = async () => {
    const response = await fetch(`/api/routines/user/${currentUserId}/routine/${currentRoutine.id}/follow`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const redirect = (id) => {
    let path = `/profile/${id}`;
    history.push(path)
    handleClose()
  }
  const handleExerciseEdit = (session, exercise) => {
    setMethod('PUT'); setSessionId(session.id); handleLength(session);
    setSetType(exercise.setType); setSets(exercise.sets); setReps(exercise.reps); setSelectedWorkout(exercise.workoutId);
    setComments(exercise.additionalComments); setWorkoutId(exercise.workoutId); setExerciseId(exercise.id); setExerciseOpen(true);
  }

  return (
    <>
      <RoutineModal props={{ open, handleClose, currentUserId, reDispatch, method: 'PUT', routineId: currentRoutine.id, name: currentRoutine.name, description: currentRoutine.description, public: currentRoutine.public, photo: currentRoutine.photo_url }} />
      <SessionModal props={{
        open: sessionOpen, handleClose, reDispatch, method: method,
        routineId: currentRoutine.id, name, setName, description, setDescription, sessionId, length: currentRoutine.sessions.length
      }} />
      <ExerciseModal props={{
        open: exerciseOpen, handleClose, reDispatch, method, sessionId, length, workoutId, setWorkoutId, exerciseId,
        setType, setSetType, sets, setSets, reps, setReps, comments, setComments, selectedWorkout, setSelectedWorkout,
      }} />

      <Grid item>
        <Grid container wrap='nowrap' spacing={2} alignItems='center' justify='center' alignContent='center'>
          <Grid item>
            <Avatar aria-label="avatar" className={classes.avatar} src={currentRoutine.user.avatar ? currentRoutine.user.avatar : ""}>
              {currentRoutine.user.avatar ? "" : currentRoutine.user.username.slice(0, 1)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant='h4' className={classes.userName} onClick={() => redirect(currentRoutine.userId)}>
              {currentRoutine.user.username}
            </Typography>
          </Grid>
          <Grid item>
            {currentRoutine.user.id === currentUserId ?
              <></> :
              following() ?
                <Button size='small' color='primary' onClick={handleUnfollow} style={{ padding: '1px !important' }}>Unfollow</Button> :
                <Button size='small' color='secondary' onClick={handleFollow}>Follow</Button>
            }
          </Grid>
        </Grid>
        <Divider className={classes.divider} />
      </Grid>



      <Grid item >
        {currentRoutine.photo_url ? <img src={currentRoutine.photo_url} alt='Routine Photo' className={classes.routineImage} /> : null}
      </Grid>

      <Grid item >
        <Typography variant='h4' className={editable ? classes.editableRoutineName : classes.routineName} onClick={editable ? () => {reDispatch(); setOpen(true);} : () => { }}>{currentRoutine.name}</Typography>
      </Grid>
      <Grid item>
        {currentRoutine.user.id === currentUserId ?
          <></> :
          followingRoutine() ?
            <Button size='small' color='primary' onClick={handleRoutineFollow} style={{ padding: '0 !important' }}>Unfollow</Button> :
            <Button size='small' color='secondary' onClick={handleRoutineFollow} style={{ padding: '0 !important' }}>Follow</Button>
        }
      </Grid>
      <Grid item style={{ width: '100%' }}>
        <Divider className={classes.divider} />
        <Typography variant='caption' className={classes.caption}>{currentRoutine.description}</Typography>
      </Grid>



      {currentRoutine.sessions.map((session) => {
        if (session.removed) {
          return null
        }
        else {
          return (
            <React.Fragment key={session.id}>
              <Grid item style={{ width: '80%' }}>
                < Typography variant='h5'
                  className={editable ? classes.editableSessionName : classes.sessionName}
                  onClick={editable ? () => handleSessionEdit(session.id, session.name, session.description) : () => { }}>
                  {session.name}
                </Typography>
                <Divider className={classes.subDivider} />
                <Typography variant='caption' className={classes.caption}>{session.description}</Typography>
              </Grid>
                {session.exercises.map(exercise => {
                  if (exercise.removed) {
                    return null
                  } else {
                    return (
                      <Grid item key={exercise.id}>
                        <ExerciseCardContiner exercise={exercise} editable={editable} handleExerciseEdit={() => handleExerciseEdit(session, exercise)} />
                      </Grid>
                    )
                  }
                })}

              {editable ?
                <Grid item>
                  <Button className={classes.exerciseButton}
                    onClick={() => {
                      setMethod('POST'); setSessionId(session.id); handleLength(session); setExerciseOpen(true);
                      setSetType(''); setSets(''); setReps(''); setComments('');
                    }}>
                    <Typography variant='caption'>Add Exercise</Typography>
                    <AddCircleIcon color='secondary' style={{ marginLeft: '1em', width: '17px' }} />
                  </Button>
                </Grid> :
                null
              }
            </React.Fragment>
          )
        }
      })}

      {editable ?
        <Grid item>
          <Button className={classes.sessionButton} onClick={() => { setMethod('POST'); setName(''); setDescription(''); setSessionOpen(true) }}>
            <Typography>Add Session</Typography>
            <AddCircleIcon color='secondary' style={{ marginLeft: '1em' }} />
          </Button>
        </Grid> :
        null
      }

    </>
  )
}
