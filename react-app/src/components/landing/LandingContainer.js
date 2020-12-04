import React from 'react'
import Landing from './Landing'
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  landingGrid: {
    height: "100%",
  },
});

export default function LandingContainer({ authenticated, setAuthenticated }) {
  const classes = useStyles();
  return (
    <Grid container direction='column' alignItems='center' justify='space-around' className={classes.landingGrid}>
      <Landing
        authenticated={authenticated}
        setAuthenticated={setAuthenticated}
      />
    </Grid>
  )
}
