import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import StarRateIcon from '@material-ui/icons/StarRate';

const useStyles = makeStyles({
  root: {
    maxWidth: '20em',
    margin: '.5em 0',
  },
  stared: {
    color: '#FFE031',
  },
});

export default function RoutineCard({ routine, page, stared, followed, reDispatch, currentUserId }) {
  const classes = useStyles();

  const handleLike = async (routineId) => {
    const response = await fetch(`/api/routines/user/${currentUserId}/routine/${routineId}/upvote`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const handleFollow = async () => {
    const response = await fetch(`/api/routines/user/${currentUserId}/routine/${routine.id}/follow`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const handleRemove = async () => {
    const response = await fetch(`/api/routines/user/${currentUserId}/routine/${routine.id}/remove`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const handleActivate = async () => {
    const response = await fetch(`/api/routines/user/${currentUserId}/routine/${routine.id}/set_active`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }
  const handleDeactivate = async () => {
    const response = await fetch(`/api/routines/user/${currentUserId}/routine/${routine.id}/set_inactive`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      reDispatch()
    }
  }

  return (
    <Card className={classes.root} raised>
      <CardActions>
        {page == 'MyRoutines' ?
          <><Button color='secondary' onClick={handleActivate} >Set Active</Button> <Button onClick={handleRemove} >Remove</Button></> :
          null
        }
        {page == 'ActiveRoutine' ?
          <Button onClick={handleDeactivate} >Set Inactive</Button> :
          null
        }
        {page == 'FollowedRoutines' ?
          <><Button color='secondary' onClick={handleActivate}>Set Active</Button><Button onClick={handleFollow}>Unfollow</Button></> :
          null
        }
        {page == 'Profile' ?
          followed == 'owner' ?
            <Button onClick={handleRemove} >Remove</Button>
            : followed ?
              <Button onClick={handleFollow}>Unfollow</Button>
              : <Button onClick={handleFollow} color='secondary'>Follow</Button>
          : null
        }
      </CardActions>

      <CardActionArea>
        <CardContent>
          <Grid container wrap='nowrap' justify='space-between' alignItems='center' alignContent='center'>
            <Grid item>
              <Typography gutterBottom variant="h5" component="h2">
                {routine.name}
              </Typography>
            </Grid>
          </Grid>
          <Typography variant="body2" color="textSecondary" component="p">
            {routine.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button onClick={() => handleLike(routine.id)}>{stared ? <StarRateIcon className={classes.stared} /> : <StarRateIcon />}{routine.upvotes.length}</Button>
        {routine.tags.map((tag, i) => {
          return (
            <Button key={`${routine.name} tag ${i}`} size="small" color="secondary">
              {tag.name}
            </Button>
          )
        })}
      </CardActions>
    </Card>
  )
}
