import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import Profile from './Profile'
import Grid from '@material-ui/core/Grid';


export default function ProfileContainer() {
  const currentUserId = useSelector((state) => state.user.id);
  const currentProfile = useSelector((state) => state.profile);

  return (
    <Grid container justify='center' direction='column'
    wrap='nowrap' alignContent='center' alignItems='center'
    spacing={4} style={{marginTop: '2em'}}>
      <Profile currentProfile={currentProfile} currentUserId={currentUserId} />
    </Grid>
  )
}
