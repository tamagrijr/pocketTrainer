import React from 'react'
import TopNav from './TopNav'

export default function TopNavContainer({ setAuthenticated }) {
  return (
    <TopNav setAuthenticated={setAuthenticated} />
  )
}
