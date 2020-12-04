import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  signupform: {
    "& > *": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      margin: theme.spacing(1),
      width: "50ch",
    },
  },
  inputs: {
    width: "100%",
  },
}));

const SignUpForm = ({authenticated, setAuthenticated, setLogin}) => {
  const classes = useStyles();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }else{
        setErrors(user.errors)
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form className={classes.signupform} onSubmit={onSignUp}>
        <Grid item>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </Grid>
        <Grid item>
          <TextField
            className={classes.inputs}
            inputProps={{ style: {textAlign: 'center'} }}
            name="username"
            type="text"
            value={username}
            onChange={updateUsername}
            id="username"
            label="Username"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.inputs}
            inputProps={{ style: {textAlign: 'center'} }}
            name="email"
            type="email"
            value={email}
            onChange={updateEmail}
            id="email"
            label="Email"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.inputs}
            inputProps={{ style: {textAlign: 'center'} }}
            name="password"
            type="password"
            value={password}
            onChange={updatePassword}
            id="password"
            label="Password"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <TextField
            className={classes.inputs}
            inputProps={{ style: {textAlign: 'center'} }}
            name="repeat_password"
            type="password"
            value={repeatPassword}
            onChange={updateRepeatPassword}
            label="Confirm Password"
            variant="filled"
          />
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="secondary"
            size="large"
            type="submit"
            className={classes.button}
            startIcon={<SupervisedUserCircleIcon />}
          >
            Submit
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            onClick={() => setLogin(true)}
            startIcon={<ArrowBackIcon />}
          >
            Go Back
          </Button>
        </Grid>
      </form>
  );
};

export default SignUpForm;
