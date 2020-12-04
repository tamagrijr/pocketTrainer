import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../../services/auth'
import { GiWeightLiftingUp, GiHeartBeats, GiBiceps } from "react-icons/gi";
import './SideNav.css'


const useStyles = makeStyles({
  list: {
    width: 250,
    color: 'rgb(66,175,255)'
  },
  fullList: {
    width: 'auto',
  },
});

export default function SideNav({ setAuthenticated, handleProfile }) {
  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  const toggleDrawer = (anchor, open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <ListItem button onClick={() => window.location.href='/routines'}>
          <ListItemIcon> <GiHeartBeats /> </ListItemIcon>
          <ListItemText primary={'My Routines'} />
        </ListItem>
        <ListItem button onClick={() => window.location.href='/workouts'}>
          <ListItemIcon> <GiWeightLiftingUp /> </ListItemIcon>
          <ListItemText primary={'My Workouts'} />
        </ListItem>
        <ListItem button onClick={handleProfile}>
          <ListItemIcon> <GiBiceps /> </ListItemIcon>
          <ListItemText primary={'My Profile'} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={onLogout}>
          <ListItemIcon><ExitToAppIcon /></ListItemIcon>
          <ListItemText primary={'Logout'} />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <IconButton
        edge="start"
        className={classes.menuButton}
        color="inherit"
        aria-label="open drawer"
        onClick={toggleDrawer('left', true)}
      >
        <MenuIcon />
      </IconButton>
      <SwipeableDrawer
        anchor={'left'}
        className={classes.drawer}
        open={state['left']}
        onClose={toggleDrawer('left', false)}
        onOpen={toggleDrawer('left', true)}
      >
        {list('left')}
      </SwipeableDrawer>
    </>
  );
}
