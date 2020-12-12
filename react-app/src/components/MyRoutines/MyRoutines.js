import React from 'react';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import RoutineCardContainer from '../RoutineCard/RoutineCardContainer'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Button from '@material-ui/core/Button'
import RoutineModal from '../RoutineModal/RoutineModal'

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

export default function MyRoutines({ currentUserId, userRoutines, reDispatch }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => setOpen(false);

  if (!userRoutines) return null;
  return (
    <>
      <RoutineModal props={{open, handleClose, currentUserId}} />
      {/* <Grid item>
        <Typography variant='h4'>
          Active Routine
        </Typography>
        <Divider className={classes.divider} />
      </Grid>
      <Grid item>
        {userRoutines.map(routine => {
          return routine.active ?
            <RoutineCardContainer key={routine.id} routine={routine.routine} page={'ActiveRoutine'} reDispatch={reDispatch} currentUserId={currentUserId} /> :
            null
        })}
      </Grid> */}

      <Grid item>
        <Typography variant='h5'>
          My Routines
        </Typography>
        <Divider className={classes.subDivider} />
      </Grid>
      <Grid item>
        {userRoutines.map(routine => {
          return routine.routine.userId == currentUserId && routine.active == false ?
            <RoutineCardContainer key={routine.id} routine={routine.routine} page={'MyRoutines'} reDispatch={reDispatch} currentUserId={currentUserId} /> :
            null
        })}
      </Grid>
      <Grid item>
        {/* <Link to={`/routines/create`} style={{ textDecoration: 'none', color: 'white' }} > */}
          <Button onClick={() => setOpen(true)}>
            <Typography>Create Routine</Typography>
            <AddCircleIcon color='secondary' style={{ marginLeft: '1em' }} />
          </Button>
        {/* </Link> */}
      </Grid>

      <Grid item>
        <Typography variant='h5'>
          Followed Routines
        </Typography>
        <Divider className={classes.subDivider} />
      </Grid>
      <Grid item>
        {userRoutines.map(routine => {
          return routine.routine.userId != currentUserId && routine.active == false ?
            <RoutineCardContainer key={routine.id} routine={routine.routine} page={'FollowedRoutines'} reDispatch={reDispatch} currentUserId={currentUserId} /> :
            null
        })}
      </Grid>
    </>
  )
}
