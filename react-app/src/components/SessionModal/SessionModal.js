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

export default function SessionModal({ props }) {
  const classes = useStyles();

  const handleSubmit = async () => {
    if (props.method == 'PUT') {
      const putResponse = await fetch(`/api/routines/routine/${props.routineId}/session/${props.sessionId}/edit`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: props.name, description: props.description }),
      });
      if (putResponse.ok) {
        props.reDispatch()
        props.handleClose()
      }
    } else if (props.method == 'POST') {
      const postResponse = await fetch(`/api/routines/routine/${props.routineId}/add_session`, {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: props.name, description: props.description, order: props.length + 1 }),
      });
      if (postResponse.ok) {
        props.reDispatch()
        props.handleClose()
      }
    }
    return
  }

  const remove = async () => {
    const response = await fetch(`/api/routines/session/${props.sessionId}/remove`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      props.reDispatch()
      props.handleClose()
    }
  }

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="edit-workout-form" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>
          {props.method == 'POST' ? 'Create your session' : 'Edit your session'}
        </DialogTitle>
        <DialogContent>
          <TextField
            color='secondary'
            margin="dense"
            id="name"
            label="Name"
            value={props.name}
            onChange={(e) => props.setName(e.target.value)}
            fullWidth
            error={!props.name}
          />
          <TextField
            color='secondary'
            margin="dense"
            id="Descrtiption"
            label="Description"
            value={props.description}
            onChange={(e) => props.setDescription(e.target.value)}
            fullWidth
            error={!props.description}
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
          <Button onClick={handleSubmit} disabled={!props.name || !props.description} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
