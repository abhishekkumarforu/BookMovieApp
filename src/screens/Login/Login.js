import React, { useState } from "react";
import { TextField, Grid, Button } from "@material-ui/core";

function Login({ closeModal, baseUrl, userHasAuthenticated }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    let valid = true;
    let err = {};
    if (!username) {
      err.username = "required";
      valid = false;
    }
    if (!password) {
      err.password = "required";
      valid = false;
    }
    setErrors(err);
    return valid;
  };

  const userLogin = (e) => {
    e.preventDefault();
    if (validate()) {
      let authorization = `Basic ${btoa(username + ":" + password)}`;
      fetch(baseUrl + "auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: authorization,
        },
      }).then((response) => {
        const accessToken = response.headers.get("access-token");
        sessionStorage.setItem("access-token", accessToken);
        userHasAuthenticated(true)
        closeModal()
      });
    }
  };

  return (
    <form noValidate autoComplete="off">
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item xs={12}>
          <TextField
            id="login_username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="standard"
            label="Username"
            error={errors.username}
            helperText={errors.username}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 20 }}>
          <TextField
            id="login_password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="standard"
            label="Password"
            type="password"
            error={errors.password}
            helperText={errors.password}
          />
        </Grid>
        <Grid item xs={12} style={{ marginTop: 40 }}>
          <Button onClick={userLogin} variant="contained" color="primary">
            Login
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}

export default Login;
