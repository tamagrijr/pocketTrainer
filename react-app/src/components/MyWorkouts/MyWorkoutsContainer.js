import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { fetchUserWorkouts, setUserWorkouts, fetchWorkoutCategories, setWorkoutCategories } from '../../store/workout'

import MyWorkouts from './MyWorkouts'
import Grid from '@material-ui/core/Grid';

export default function MyWorkoutsContainer() {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);
  const userWorkouts = useSelector((state) => state.workouts.userWorkouts)
  const workoutCategories = useSelector((state) => state.workouts.categories)

  useEffect(() => {
    (async () => {
      const userWorkouts = await fetchUserWorkouts(currentUserId)
      await dispatch(setUserWorkouts(userWorkouts))
      const workoutCategories = await fetchWorkoutCategories()
      await dispatch(setWorkoutCategories(workoutCategories))
    })();
  }, []);
  const reDispatch = async () => {
    const userWorkouts = await fetchUserWorkouts(currentUserId)
    await dispatch(setUserWorkouts(userWorkouts))
    const workoutCategories = await fetchWorkoutCategories()
    await dispatch(setWorkoutCategories(workoutCategories))
  }

  return (
    <Grid container justify='center' direction='column'
      wrap='nowrap' alignContent='center' alignItems='center'
      spacing={4} style={{ marginTop: '2em' }}>
      <MyWorkouts userWorkouts={userWorkouts} currentUserId={currentUserId} workoutCategories={workoutCategories} reDispatch={reDispatch} />
    </Grid>
  )
}
