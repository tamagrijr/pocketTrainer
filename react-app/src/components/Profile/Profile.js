import React from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import './Profile.css'
import { FiFacebook, FiYoutube, FiInstagram } from "react-icons/fi";
import Divider from '@material-ui/core/Divider';
import RoutineCardContainer from '../RoutineCard/RoutineCardContainer'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import EditProfileModal from '../EditProfileModal/EditProfileModal'

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  follow: {
    margin: theme.spacing(1),
    width: '20ch',
    cursor: 'pointer',
  },
  avatar: {
    backgroundColor: '#FFE031',
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  followerContainer: {
    color: '#FFE031',
    margin: '0 1em',
    borderRadius: '1em',
    cursor: 'pointer',
    '&:hover': {
      color: 'rgb(66,175,255)',
      backgroundColor: '#FFE031',
    }
  },
  socials: {
    padding: '1em',
    borderRadius: '1em',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    '&:hover': {
      backgroundColor: '#FFE031'
    },
    '& > *': {
      width: theme.spacing(3),
      height: theme.spacing(2),
      color: '#FFE031',
    },
    '&:hover > *': {
      color: 'rgb(66,175,255)',
    },
  },
  bioContainer: {
    color: '#FFE031',
    width: '20em'
  },
  routineContainer: {
    width: '20em',
  },
  divider: {
    backgroundColor: '#243B5E !important',
  }
}));

export default function Profile({ currentProfile, currentUserId }) {
  const classes = useStyles();
  const [editProfile, setEditProfile] = React.useState(false);

  const handleClickOpen = () => {
    setEditProfile(true);
  };

  const handleClose = () => {
    setEditProfile(false);
  };

  return (
    <>
      <EditProfileModal open={editProfile} handleClose={handleClose} currentProfile={currentProfile}/>
      <Grid item>
        <Grid container wrap='nowrap' spacing={3} alignItems='center'>
          <Grid item>
            <Avatar aria-label="avatar" className={classes.avatar} src={currentProfile.avatar ? currentProfile.avatar : ""}>
              {currentProfile.avatar ? "" : currentProfile.username.slice(0, 1)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant='h3'>
              {currentProfile.username}
            </Typography>
          </Grid>
          { currentProfile.id === currentUserId ?
            <Grid item>
              <IconButton onClick={handleClickOpen}><EditIcon /></IconButton>
            </Grid> :
            <></>
          }
        </Grid>
      </Grid>

      <Grid item>
        <Grid container wrap='nowrap' alignItems='center' alignContent='center' spacing={3}>
          {currentProfile.facebook ?
            <a href={currentProfile.facebook} target="_blank" rel="noopener noreferrer">
              <Grid item className={classes.socials}><FiFacebook /></Grid>
            </a> :
            <></>}
          {currentProfile.insta ?
            <a href={currentProfile.insta} target="_blank" rel="noopener noreferrer">
              <Grid item className={classes.socials}><FiInstagram /></Grid>
            </a> :
            <></>}
          {currentProfile.youTube ?
            <a href={currentProfile.youTube} target="_blank" rel="noopener noreferrer">
              <Grid item className={classes.socials}><FiYoutube /></Grid>
            </a> :
            <></>}
        </Grid>
      </Grid>

      <Grid item>
        <Grid container wrap='nowrap' spacing={3}>
          <Grid item className={classes.followerContainer} onClick={() => alert('follower test')}>
            <Typography variant='subtitle1' align='center'>
              {currentProfile.followers.length}
            </Typography>
            <Typography variant='caption' style={{ textDecoration: 'underline' }}>
              Followers
            </Typography>
          </Grid>
          <Grid item className={classes.followerContainer} onClick={() => alert('following test')}>
            <Typography variant='subtitle1' align='center'>
              {currentProfile.following.length}
            </Typography>
            <Typography variant='caption' style={{ textDecoration: 'underline' }}>
              Following
              </Typography>
          </Grid>
        </Grid>
      </Grid>

      <Grid item className={classes.bioContainer}>
        <Typography variant='caption'>Bio</Typography>
        <Divider className={classes.divider} />
        <Typography variant='h6'>{currentProfile.bio}</Typography>
      </Grid>

      <Grid item className={classes.routineContainer}>
        <Typography variant='h3' style={{textAlign: 'center'}}>Routines</Typography>
        <Divider className={classes.divider} />
        { currentProfile.id === currentUserId ?
          currentProfile.routines.map(routine => {
            return(
              <RoutineCardContainer key={routine.id} routine={routine} editable={true} />
            )
          }) :
          currentProfile.routines.map(routine => {
            if(routine.public){
              return(
                <RoutineCardContainer key={routine.id} routine={routine} editable={false} />
              )
            }
          })

        }
      </Grid>

    </>
  )
}
