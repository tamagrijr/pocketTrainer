import React from 'react'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'

export default function WorkoutModal({ props }) {
  const handleChange = () => {
    props.privacy ? props.setPrivacy(false) : props.setPrivacy(true)
  }

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
          <Grid container wrap='nowrap' jusitfy='center' alignItems='center' alignContent='center'>
            <Grid item>
              <Typography>Public?</Typography>
            </Grid>
            <Grid item>
              <Checkbox checked={props.privacy} onChange={handleChange} />
            </Grid>
          </Grid>
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
