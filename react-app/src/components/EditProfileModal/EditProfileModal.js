import React from 'react'
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import { editCurrentProfile, setCurrentProfile } from '../../store/profile'

const useStyles = makeStyles((theme) => ({

}));

export default function EditProfileModal({open, handleClose, currentProfile, currentUserId}) {
  const dispatch = useDispatch();
  const classes = useStyles();
  console.log(currentProfile)
  const [email, setEmail] = React.useState(currentProfile.email || '');
  const [ava, setAva] = React.useState(currentProfile.avatar || '')
  const [bio, setBio] = React.useState(currentProfile.bio || '')
  const [username, setUsername] = React.useState(currentProfile.username || '')
  const [fb, setFb] = React.useState(currentProfile.facebook || '')
  const [ig, setIg] = React.useState(currentProfile.insta || '')
  const [yt, setYt] = React.useState(currentProfile.youTube || '')
  const profile = {email, ava, bio, username, fb, ig, yt}

  const emailChange = (event) => {
    setEmail(event.target.value)
  }
  const bioChange = (event) => {
    setBio(event.target.value)
  }
  const usernameChange = (event) => {
    setUsername(event.target.value)
  }
  const avaChange = (event) => {
    setAva(event.target.value)
  }
  const fbChange = (event) => {
    setFb(event.target.value)
  }
  const igChange = (event) => {
    setIg(event.target.value)
  }
  const ytChange = (event) => {
    setYt(event.target.value)
  }
  const handleSubmit = async () => {
    const updatedProfile = await editCurrentProfile(currentUserId, profile)
    await dispatch(setCurrentProfile(updatedProfile))
    handleClose()
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="edit-user-form" >
        <DialogTitle id="form-dialog-title" style={{textAlign: 'center'}}>Edit Profile</DialogTitle>
        <DialogContent>
        <TextField
            color='secondary'
            margin="dense"
            id="avatar"
            label="Avatar"
            value={ava}
            onChange={avaChange}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="username"
            label="Username"
            value={username}
            onChange={usernameChange}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="email"
            label="Email Address"
            value={email}
            onChange={emailChange}
            type="email"
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="bio"
            label="Bio"
            value={bio}
            onChange={bioChange}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="fb"
            label="Facebook"
            value={fb}
            onChange={fbChange}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="ig"
            label="Instagram"
            value={ig}
            onChange={igChange}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="yt"
            label="YouTube"
            value={yt}
            onChange={ytChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
