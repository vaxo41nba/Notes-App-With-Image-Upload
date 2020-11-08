import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import { login } from "../../redux/actions";
import { useDispatch } from "react-redux";

import "./Login.css";
import host from "../../host";

export default function Login() {
  let usernameFieldRef = useRef(null);
  let passFieldRef = useRef(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const authorisation = (e) => {
    e.preventDefault();
    let usernameField = usernameFieldRef.current.value;
    let passField = passFieldRef.current.value;

    if (!usernameField.trim() && !passField.trim()) {
      alert("Please, enter username and password.");
    } else if (!passField.trim()) {
      alert("Please, enter password.");
    } else if (!usernameField.trim()) {
      alert("Please, enter username.");
    } else {
      let userObject = {
        username: usernameField,
        password: passField,
      };

      axios
        .post(`${host}/login`, userObject)
        .then((res) => {
          if (res.data === "Incorrect password") {
            alert("Incorrect password");
          } else if (res.data === "No Users Found") {
            alert("No Users Found");
          } else {
            localStorage.setItem("token", res.data.token);
            history.push("/");
            dispatch(login());
          }
        })
        .catch((err) => {
          console.error(err);
          alert("Error logging in please try again.");
        });
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      authorisation(e);
    }
  };

  return (
    <div className="login_container">
      <h1>Login</h1>
      <div>
        <p>Username</p>
        <TextField
          className="regInputField"
          size="small"
          label="Enter your Username"
          variant="outlined"
          inputRef={usernameFieldRef}
          onKeyPress={handleKeyPress}
        />
        <p>Password</p>
        <TextField
          className="regInputField"
          size="small"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          inputRef={passFieldRef}
          onKeyPress={handleKeyPress}
        />
        <br />
        <br />
        <Button
          onClick={(e) => authorisation(e)}
          variant="contained"
          size="large"
          color="primary"
        >
          Login
        </Button>
      </div>
    </div>
  );
}
