import React from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RoutineModal from '../RoutineModal/RoutineModal';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button';
import SessionModal from '../SessionModal/SessionModal'

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
}));

export default function RoutineView({ currentUserId, currentRoutine, reDispatch }) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [sessionOpen, setSessionOpen] = React.useState(false);
  const [sessionMethod, setSessionMethod] = React.useState('');
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [sessionId, setSessionId] = React.useState('');

  const editable = currentUserId === currentRoutine.userId
  const handleClose = () => { setOpen(false); setSessionOpen(false); }
  const handleSessionEdit = (id, name, description) => {
    setSessionMethod('PUT');
    setName(name);
    setDescription(description);
    setSessionId(id);
    setSessionOpen(true);
  }

  return (
    <>
      <RoutineModal props={{ open, handleClose, currentUserId, reDispatch, method: 'PUT', routineId: currentRoutine.id, name: currentRoutine.name, description: currentRoutine.description, public: currentRoutine.public, photo: currentRoutine.photo_url }} />
      <SessionModal props={{
        open: sessionOpen, handleClose, reDispatch, method: sessionMethod,
        routineId: currentRoutine.id, name, setName, description, setDescription, sessionId, length: currentRoutine.sessions.length
      }} />
      <Grid item style={{ width: '100%' }} >
        {currentRoutine.photo_url ? <img src={currentRoutine.photo_url} alt='Routine Photo' className={classes.routineImage} /> : null}
      </Grid>

      <Grid item style={{ width: '100%' }} >
        <Typography variant='h4' className={editable ? classes.editableRoutineName : classes.routineName} onClick={editable ? () => setOpen(true) : () => { }}>{currentRoutine.name}</Typography>
        <Divider className={classes.divider} />
        <Typography variant='caption' className={classes.caption}>{currentRoutine.description}</Typography>
      </Grid>



      {currentRoutine.sessions.map((session) => {
        console.log(session.removed)
        if (session.removed) {
          return <></>
        }
        else {
          return (
            <Grid item key={session.id} style={{ width: '90%' }}>
              < Typography variant='h5'
                className={editable ? classes.editableSessionName : classes.sessionName}
                onClick={editable ? () => handleSessionEdit(session.id, session.name, session.description) : () => { }}>
                {session.name}
              </Typography>
              <Divider className={classes.subDivider} />
              <Typography variant='caption' className={classes.caption}>{session.description}</Typography>
              {session.exercises.map(exercise => {
                return (
                  <Typography variant='h5' className={classes.sessionName}>{exercise.workout.name}</Typography>
                )
              })}
            </Grid>
          )
        }
      })}

      {editable ?
        <Grid item>
          <Button className={classes.sessionButton} onClick={() => { setSessionMethod('POST'); setName(''); setDescription(''); setSessionOpen(true) }}>
            <Typography>Add Session</Typography>
            <AddCircleIcon color='secondary' style={{ marginLeft: '1em' }} />
          </Button>
        </Grid> :
        null
      }

    </>
  )
}
