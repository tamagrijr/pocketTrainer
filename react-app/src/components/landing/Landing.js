import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid';
import LoginForm from '../auth/LoginForm'
import SignUpForm from '../auth/SignUpForm'
import pocketLogo from '../../images/Pocket.png'
import './landing.css'


export default function Landing({ authenticated, setAuthenticated }) {

  const [login, setLogin] = useState(true);

  return (
    <>
      <Grid item>
        <img className='PTLogo' src={pocketLogo} alt='Pocket Trainer' />
      </Grid>
      {login ?
        <Grid item>
          <LoginForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setLogin={setLogin}
          />
        </Grid> :
        <Grid item>
          <SignUpForm
            authenticated={authenticated}
            setAuthenticated={setAuthenticated}
            setLogin={setLogin}
          />
        </Grid>
      }
    </>
  )
}
