import React, { Redirect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import SideNav from './SideNav'
import {fetchCurrentProfile, setCurrentProfile} from '../../store/profile'

export default function SideNavContainer({ setAuthenticated }) {
  const dispatch = useDispatch();
  const currentUserId = useSelector((state) => state.user.id);

  const handleProfile = async () => {
    const currentProfile = await fetchCurrentProfile(currentUserId);
    dispatch(setCurrentProfile(currentProfile));
    window.location.href='/profile'
  }
  return (
    <SideNav setAuthenticated={setAuthenticated}
      handleProfile={handleProfile}
    />
  )
}
