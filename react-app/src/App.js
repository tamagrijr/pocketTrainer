import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from './store/user'
import { fetchCurrentProfile, setCurrentProfile } from './store/profile'
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import LandingContainer from './components/landing/LandingContainer'
import TopNavContainer from './components/TopNav/TopNavContainer'
import ProfileContainer from './components/Profile/ProfileContainer'
import MyWorkoutsContainer from './components/MyWorkouts/MyWorkoutsContainer'
import MyRoutinesContainer from './components/MyRoutines/MyRoutinesContainer'
import RoutineViewContainer from './components/RoutineView/RoutineViewContainer'

function App() {
  const dispatch = useDispatch();
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const currentUserId = useSelector((state) => state.user.id);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
        dispatch(setCurrentUser(user.id))
      }
      setLoaded(true);
    })();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>

      <Route path="/login" exact={true}>
        <LandingContainer authenticated={authenticated} setAuthenticated={setAuthenticated} />
      </Route>



      <ProtectedRoute path="/" authenticated={authenticated}>

        <TopNavContainer setAuthenticated={setAuthenticated} />
        <ProtectedRoute path='/' exact={true}><Redirect to='/routines'></Redirect></ProtectedRoute>
        <div className='negativeTopSpace'></div>

        <ProtectedRoute path='/profile' exact={true} authenticated={authenticated} >
          <ProfileContainer id={currentUserId} />
        </ProtectedRoute>

        <ProtectedRoute path='/profile/:userId' exact={true} authenticated={authenticated} >
          <ProfileContainer />
        </ProtectedRoute>

        <ProtectedRoute path='/routines' exact={true} authenticated={authenticated} >
          <MyRoutinesContainer />
        </ProtectedRoute>

        <ProtectedRoute path='/routine/:routineId' exact={true} authenticated={authenticated} >
          <RoutineViewContainer />
        </ProtectedRoute>

        <ProtectedRoute path='/routines/create' exact={true} authenticated={authenticated} >
          <h1>CREATE ROUTINE</h1>
        </ProtectedRoute>

        <ProtectedRoute path='/workouts' exact={true} authenticated={authenticated} >
          <MyWorkoutsContainer />
        </ProtectedRoute>

      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
