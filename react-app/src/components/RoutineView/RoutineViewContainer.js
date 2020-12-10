import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RoutineView from './RoutineView'
import { fetchRoutineView, setRoutineView } from '../../store/routine'
import Grid from '@material-ui/core/Grid'

export default function RoutineViewContainer() {
  const dispatch = useDispatch();
  const { routineId } = useParams();

  useEffect(() => {
    (async () => {
      const routineView = await fetchRoutineView(routineId)
      await dispatch(setRoutineView(routineView))
    })();
  }, []);

  const currentUserId = useSelector((state) => state.user.id);
  const currentRoutine = useSelector((state) => state.routines.routine_view);

  const reDispatch = async () => {
    const routineView = await fetchRoutineView(routineId)
    await dispatch(setRoutineView(routineView))
  }

  if (!currentRoutine) return null
  return (
    <Grid container justify='center' direction='column'
      wrap='nowrap' alignContent='center' alignItems='center'
      spacing={4} style={{ marginTop: '2em' }}>
      <RoutineView currentUserId={currentUserId} currentRoutine={currentRoutine} reDispatch={reDispatch} />
    </Grid>
  )
}
