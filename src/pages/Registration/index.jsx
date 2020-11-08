import React, { useRef } from "react";
import axios from "axios";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

import "./Registration.css";
import host from "../../host";

const Registration = () => {
  let usernameFieldRef = useRef(null);
  let firstPassField = useRef(null);
  let secondPassField = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    if (firstPassField.current.value !== secondPassField.current.value) {
      alert("Passwords don't match");
    } else if (firstPassField.current.value.length < 6) {
      alert("Password: Minimum 6 symbols");
    } else if (!usernameFieldRef.current.value.trim()) {
      alert("Please, enter your username");
    } else {
      let userObject = {
        username: usernameFieldRef.current.value,
        password: firstPassField.current.value,
      };
      axios
        .post(`${host}/addUser`, userObject)
        .then((res) => {
          if (res.data.name === "SequelizeUniqueConstraintError") {
            alert("Username Taken");
          } else {
            usernameFieldRef.current.value = "";
            firstPassField.current.value = "";
            secondPassField.current.value = "";
            alert("Successfully registered");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit(e);
    }
  };

  return (
    <div className="registration_container">
      <h1>Registration</h1>
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
          inputRef={firstPassField}
          onKeyPress={handleKeyPress}
        />
        <p>Repeat Password</p>
        <TextField
          className="regInputField"
          size="small"
          label="Repeat Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          inputRef={secondPassField}
          onKeyPress={handleKeyPress}
        />
        <br />
        <br />
        <Button
          onClick={(e) => submit(e)}
          variant="contained"
          size="large"
          color="primary"
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default Registration;
