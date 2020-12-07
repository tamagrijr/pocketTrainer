import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

export default function WorkoutModal({props}) {
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="edit-workout-form" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>{props.method == 'POST' ? 'Create Workout' : `Update ${props.name}`}</DialogTitle>
        <DialogContent>
          <TextField
            color='secondary'
            margin="dense"
            id="name"
            label="Name"
            value={props.name}
            onChange={props.setName}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="Descrtiption"
            label="Description"
            value={props.description}
            onChange={props.setDescription}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="exampleLink"
            label="Example Link"
            value={props.exampleLink}
            onChange={props.setExampleLink}
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="secondary">
            Cancel
          </Button>
          <Button onClick={props.handleSubmit} color="secondary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
