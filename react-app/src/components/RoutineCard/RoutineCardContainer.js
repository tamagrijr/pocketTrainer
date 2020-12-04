import React from 'react'
import RoutineCard from './RoutineCard'

export default function RoutineCardContainer({ routine, editable}) {
  return (
    <RoutineCard routine={routine} editable={editable} />
  )
}
