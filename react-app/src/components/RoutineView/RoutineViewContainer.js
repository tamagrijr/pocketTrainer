import React, { useEffect } from 'react'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import RoutineView from './RoutineView'
import { fetchRoutineView, setRoutineView } from '../../store/routine'

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
    <RoutineView currentUserId={currentUserId} currentRoutine={currentRoutine} reDispatch={reDispatch} />
  )
}
