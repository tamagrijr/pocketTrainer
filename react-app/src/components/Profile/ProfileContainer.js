import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Profile from './Profile'
import Grid from '@material-ui/core/Grid';
import { fetchCurrentProfile, setCurrentProfile } from '../../store/profile'


export default function ProfileContainer({ id }) {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const currentProfileId = userId || id;

  useEffect(() => {
    (async () => {
      const currentProfile = await fetchCurrentProfile(currentProfileId)
      await dispatch(setCurrentProfile(currentProfile))
    })();
  }, []);

  const currentUserId = useSelector((state) => state.user.id);
  const currentProfile = useSelector((state) => state.profile);
  const dispatchProfile = async () => {
    const currentProfile = await fetchCurrentProfile(currentProfileId)
    await dispatch(setCurrentProfile(currentProfile))
  }

  if (!currentProfile.username) return null
  return (
    <Grid container justify='center' direction='column'
      wrap='nowrap' alignContent='center' alignItems='center'
      spacing={4} style={{ marginTop: '2em' }}>
      <Profile currentProfile={currentProfile} currentUserId={currentUserId} dispatchProfile={dispatchProfile} />
    </Grid>
  )
}
