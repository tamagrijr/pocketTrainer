import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Grid from '@material-ui/core/Grid';
import { fetchUserRoutines, setUserRoutines } from '../../store/routine'
import MyRoutines from './MyRoutines'

export default function MyRoutinesContainer() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);
  const userRoutines = useSelector((state) => state.routines.user_routines)

  useEffect(() => {
    (async () => {
      const userRoutines = await fetchUserRoutines(currentUserId)
      await dispatch(setUserRoutines(userRoutines))
    })();
  }, []);

  const reDispatch = async () => {
    const userRoutines = await fetchUserRoutines(currentUserId)
    await dispatch(setUserRoutines(userRoutines))
  }

  return (
    <Grid container justify='center' direction='column'
      wrap='nowrap' alignContent='center' alignItems='center'
      spacing={4} style={{ marginTop: '2em' }}>
      <MyRoutines currentUserId={currentUserId} userRoutines={userRoutines} reDispatch={reDispatch} />
    </Grid>
  )
}
