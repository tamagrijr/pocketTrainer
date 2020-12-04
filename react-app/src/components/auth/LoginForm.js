import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import SupervisedUserCircleIcon from "@material-ui/icons/SupervisedUserCircle";

const useStyles = makeStyles((theme) => ({
  loginform: {
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

const LoginForm = ({ authenticated, setAuthenticated, setLogin }) => {
  const classes = useStyles();

  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("demo@aa.io");
  const [password, setPassword] = useState("password");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/" />;
  }

  return (
    <form className={classes.loginform} onSubmit={onLogin}>
        <Grid item>
          {errors.map((error) => (
            <div>{error}</div>
          ))}
        </Grid>
        <Grid item>
          <TextField
            className={classes.inputs}
            name="email"
            type="text"
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
          <Button
            type="submit"
            variant="contained"
            color="secondary"
            size="large"
            className={classes.button}
            startIcon={<VerifiedUserIcon />}
          >
            Log In
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className={classes.button}
            startIcon={<SupervisedUserCircleIcon />}
            onClick={()=> setLogin(false)}
          >
            Register
          </Button>
        </Grid>
      </form>
  );
};

export default LoginForm;
