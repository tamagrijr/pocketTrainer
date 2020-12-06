import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: '#FFE031',
  },
});

export default function FollowersModal({ open, handleClose, followers, title }) {
  const classes = useStyles();

  return (
    <Dialog onClose={handleClose} maxWidth='xs' fullWidth={true} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="follower title">{title}</DialogTitle>
      <List>
        {followers.map((follower) => (
          <Link key={follower.id} to={`/profile/${follower.id}`} style={{textDecoration: 'none', color: 'white'}} >
            <ListItem button key={follower.id} onClick={handleClose}>
              <ListItemAvatar>
                <Avatar aria-label="avatar" className={classes.avatar} src={follower.avatar ? follower.avatar : ""}>
                  {follower.avatar ? "" : follower.username.slice(0, 1)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={follower.username} />
            </ListItem>
          </Link>
        ))}
      </List>
    </Dialog>
  )
}
