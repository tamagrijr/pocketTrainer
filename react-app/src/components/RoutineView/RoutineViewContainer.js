import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RoutineView from './RoutineView'
import { fetchRoutineView, setRoutineView } from '../../store/routine'
import { fetchUserWorkouts, setUserWorkouts, fetchPtWorkouts, setApprovedWorkotus } from '../../store/workout';
import Grid from '@material-ui/core/Grid'

export default function RoutineViewContainer() {
  const dispatch = useDispatch();
  const { routineId } = useParams();
  const currentUserId = useSelector((state) => state.user.id);

  useEffect(() => {
    (async () => {
      const routineView = await fetchRoutineView(routineId)
      const userWorkouts = await fetchUserWorkouts(currentUserId)
      const approvedWorkouts = await fetchPtWorkouts()
      await dispatch(setRoutineView(routineView))
      await dispatch(setApprovedWorkotus(approvedWorkouts))
      await dispatch(setUserWorkouts(userWorkouts))
    })();
  }, []);

  const currentRoutine = useSelector((state) => state.routines.routine_view);

  const reDispatch = async () => {
    const routineView = await fetchRoutineView(routineId)
    const userWorkouts = await fetchUserWorkouts(currentUserId)
    const approvedWorkouts = await fetchPtWorkouts()
    await dispatch(setRoutineView(routineView))
    await dispatch(setApprovedWorkotus(approvedWorkouts))
    await dispatch(setUserWorkouts(userWorkouts))
  }

  if (!currentRoutine) return null
  return (
    <Grid container justify='center' direction='column'
      wrap='nowrap' alignContent='center' alignItems='center'
      spacing={1} style={{ marginTop: '2em', margin: '0 auto', maxWidth: '35em' }}>
      <RoutineView currentUserId={currentUserId} currentRoutine={currentRoutine} reDispatch={reDispatch} />
    </Grid>
  )
}
