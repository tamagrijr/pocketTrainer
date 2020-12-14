import React from 'react'
import ExerciseCard from './ExerciseCard'

export default function ExerciseCardContainer({ exercise, editable, handleExerciseEdit }) {
  return (
    <ExerciseCard exercise={exercise} editable ={editable} handleExerciseEdit={handleExerciseEdit} />
  )
}
