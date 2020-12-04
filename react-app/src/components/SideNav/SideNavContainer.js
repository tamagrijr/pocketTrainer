import React from 'react'
import SideNav from './SideNav'

export default function SideNavContainer({ setAuthenticated }) {
  return (
    <SideNav setAuthenticated={setAuthenticated} />
  )
}
