import React from 'react'

export default function RoutineView({ currentUserId, currentRoutine, reDispatch }) {

  return (
    <div>
      {currentRoutine.name}
    </div>
  )
}
