import React from 'react'

export default function RoutineCard({routine, editable}) {
  return (
    <div>
      {`Name: ${routine.name}`}
      {`Description: ${routine.description}`}
      {`Editable: ${editable}`}
    </div>
  )
}
