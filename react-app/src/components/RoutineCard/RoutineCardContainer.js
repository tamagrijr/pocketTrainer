import React from 'react'
import RoutineCard from './RoutineCard'

export default function RoutineCardContainer({ routine, editable, currentUserId }) {
  const stared = () => {
    let star = false;
    routine.upvotes.forEach(upvote => {
      if (upvote.userId === currentUserId) {
        star = true
      }
    })
    return star;
  }

  return (
    <RoutineCard routine={routine} editable={editable} stared={stared()} />
  )
}
