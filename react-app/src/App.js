import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./services/auth";
import LandingContainer from './components/landing/LandingContainer'
import TopNavContainer from './components/TopNav/TopNavContainer'

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const user = await authenticate();
      if (!user.errors) {
        setAuthenticated(true);
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
        <LandingContainer
          authenticated={authenticated}
          setAuthenticated={setAuthenticated}
        />
      </Route>
      <ProtectedRoute path="/" authenticated={authenticated}>
        <TopNavContainer setAuthenticated={setAuthenticated} />
        <ProtectedRoute path='/profile' exact={true} authenticated={authenticated} >
          <h1 style={{ textAlign: 'center' }}>My Profile</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/routines' exact={true} authenticated={authenticated} >
          <h1 style={{ textAlign: 'center' }}>My Routines</h1>
        </ProtectedRoute>
        <ProtectedRoute path='/workouts' exact={true} authenticated={authenticated} >
          <h1 style={{ textAlign: 'center' }}>My Workouts</h1>
        </ProtectedRoute>
      </ProtectedRoute>
    </BrowserRouter>
  );
}

export default App;
