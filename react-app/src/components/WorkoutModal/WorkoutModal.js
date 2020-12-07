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
  const handleChange = () => {
    props.privacy ? props.setPrivacy(false) : props.setPrivacy(true)
  }
  const handleSelect = (e) => {
    props.setCategoryId(e.target.value)
  }

  if(!props.workoutCategories) return null
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="edit-workout-form" >
        <DialogTitle id="form-dialog-title" style={{ textAlign: 'center' }}>{props.method == 'POST' ? 'Create Workout' : `Update ${props.name}`}</DialogTitle>
        <DialogContent>
          <FormControl className={classes.formControl}>
            <InputLabel id="category-select">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={props.categoryId}
              onChange={handleSelect}
            >
              {props.workoutCategories.map(category => {
                return <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
              })}
            </Select>
          </FormControl>
          <TextField
            color='secondary'
            margin="dense"
            id="name"
            label="Name"
            value={props.name}
            onChange={(e)=>props.setName(e.target.value)}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="Descrtiption"
            label="Description"
            value={props.description}
            onChange={(e)=>props.setDescription(e.target.value)}
            fullWidth
          />
          <TextField
            color='secondary'
            margin="dense"
            id="exampleLink"
            label="Example Link"
            value={props.exampleLink}
            onChange={(e)=>props.setExampleLink(e.target.value)}
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
          { props.method == 'PUT' ?
            <Button onClick={props.handleDelete}>Delete</Button> :
            <></>
          }
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
