import React from 'react'
import RoutineCard from './RoutineCard'

export default function RoutineCardContainer({ routine, page, currentUserId, reDispatch }) {
  const stared = () => {
    let star = false;
    routine.upvotes.forEach(upvote => {
      if (upvote.userId === currentUserId) {
        star = true
      }
    })
    return star;
  }
  const followed = () => {
    let follow = false;
    routine.userRoutines.forEach(userRoutine => {
      if (userRoutine.userId == currentUserId){
        follow = true
      }
    })
    if(routine.userId == currentUserId) follow = 'owner'
    return follow
  }

  return (
    <RoutineCard routine={routine} page={page} stared={stared()} followed={followed()} reDispatch={reDispatch} currentUserId={currentUserId} />
  )
}
