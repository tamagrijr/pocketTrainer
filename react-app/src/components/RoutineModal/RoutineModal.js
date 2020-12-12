import React, { useState } from 'react'
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

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function WorkoutModal({ props }) {
  const classes = useStyles();
  const history = useHistory();
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [photo, setPhoto] = React.useState('');
  const [privacy, setPrivacy] = React.useState(false);

  const handleChange = () => {
    privacy ? setPrivacy(false) : setPrivacy(true)
  }
  const handleSubmit= async () => {
    const response = await fetch(`/api/routines/user/${props.currentUserId}/create`, {
      method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "name": name, "description": description, "public": privacy, "photo_url": photo }),
    });
    if(response.ok){
      const routine = await response.json()
      let path = `/routine/${routine.id}`;
      history.push(path);
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="edit-workout-form" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          Create Your New Routine
        </DialogTitle>
        <DialogContent>
          <TextField
            color='secondary'
            margin="dense"
            id="name"
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            error={!name}
          />
          <TextField
            color='secondary'
            margin="dense"
            id="Descrtiption"
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            error={!description}
          />
          <TextField
            color='secondary'
            margin="dense"
            id="exampleLink"
            label="Example Link"
            value={photo}
            onChange={(e) => setPhoto(e.target.value)}
            fullWidth
          />
          <Grid container wrap='nowrap' jusitfy='center' alignItems='center' alignContent='center'>
            <Grid item>
              <Typography>Public?</Typography>
            </Grid>
            <Grid item>
              <Checkbox checked={privacy} onChange={handleChange} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!name || !description} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
