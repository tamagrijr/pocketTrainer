import React, { useEffect } from 'react'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from "@material-ui/core/Avatar";
import { FiFacebook, FiYoutube, FiInstagram } from "react-icons/fi";
import Divider from '@material-ui/core/Divider';
import RoutineCardContainer from '../RoutineCard/RoutineCardContainer'
import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';
import EditProfileModal from '../EditProfileModal/EditProfileModal'
import Button from '@material-ui/core/Button'
import FollowersModal from '../FollowersModal/FollowersModal'
import './Profile.css'

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
    margin: '.5em 0',
  }
}));


export default function Profile({ currentProfile, currentUserId, dispatchProfile }) {
  const classes = useStyles();
  const [editProfile, setEditProfile] = React.useState(false);
  const [followerList, setFollowerList] = React.useState(false);
  const [followingList, setFollowingList] = React.useState(false);

  const handleEditOpen = () => setEditProfile(true);
  const handleFollowerOpen = () => setFollowerList(true);
  const handleFollowingOpen = () => setFollowingList(true);
  const handleEditClose = () => setEditProfile(false);
  const handleFollowerClose = () => setFollowerList(false);
  const handleFollowingClose = () => setFollowingList(false);

  useEffect(() => {
    (async () => {
      dispatchProfile()
    })();
  }, [handleFollowingClose, handleFollowerClose]);

  const following = () => {
    let following = false;
    currentProfile.followers.forEach(follower => {
      if (follower.id === currentUserId) following = true;
    })
    return following
  }

  const handleFollow = async () => {
    const response = await fetch(`/api/users/follower/${currentUserId}/following/${currentProfile.id}/follow`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatchProfile()
    }
  }
  const handleUnfollow = async () => {
    const response = await fetch(`/api/users/follower/${currentUserId}/following/${currentProfile.id}/unfollow`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      dispatchProfile()
    }
  }

  return (
    <>
      <FollowersModal open={followerList} handleClose={handleFollowerClose} followers={currentProfile.followers} title={'Followers'} />
      <FollowersModal open={followingList} handleClose={handleFollowingClose} followers={currentProfile.following} title={'Following'} />
      <EditProfileModal open={editProfile} handleClose={handleEditClose} currentProfile={currentProfile} currentUserId={currentUserId} />

      <Grid item>
        <Grid container wrap='nowrap' spacing={3} alignItems='center' justify='center' alignContent='center'>
          <Grid item>
            <Avatar aria-label="avatar" className={classes.avatar} src={currentProfile.avatar ? currentProfile.avatar : ""}>
              {currentProfile.avatar ? "" : currentProfile.username.slice(0, 1)}
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant='h4'>
              {currentProfile.username}
            </Typography>
          </Grid>
          {currentProfile.id === currentUserId ?
            <Grid item>
              <IconButton onClick={handleEditOpen}><EditIcon /></IconButton>
            </Grid> :
            <></>
          }
        </Grid>
      </Grid>

      <Grid item>
        { currentProfile.id === currentUserId ?
          <></> :
          following() ?
          <Button size='small' color='primary' onClick={handleUnfollow}>Unfollow</Button> :
          <Button size='small' color='secondary' onClick={handleFollow}>Follow</Button>

        }
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
          <Grid item className={classes.followerContainer} onClick={handleFollowerOpen}>
            <Typography variant='subtitle1' align='center'>
              {currentProfile.followers.length}
            </Typography>
            <Typography variant='caption' style={{ textDecoration: 'underline' }}>
              Followers
            </Typography>
          </Grid>
          <Grid item className={classes.followerContainer} onClick={handleFollowingOpen}>
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
        <Typography variant='h4' style={{ textAlign: 'center' }}>Routines</Typography>
        <Divider className={classes.divider} />
        {currentProfile.id === currentUserId ?
          currentProfile.routines.map(routine => {
            return (
              <RoutineCardContainer key={routine.id} routine={routine} editable={true} currentUserId={currentUserId} />
            )
          }) :
          currentProfile.routines.map(routine => {
            if (routine.public) {
              return (
                <RoutineCardContainer key={routine.id} routine={routine} editable={false} currentUserId={currentUserId} />
              )
            }
          })

        }
      </Grid>

    </>
  )
}
