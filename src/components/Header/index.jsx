import React from "react";
import * as jwt from "jsonwebtoken";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";

import { logout } from "../../redux/actions";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.loggedIn);
  let token = localStorage.getItem("token");
  let decoded = "";
  let username = "";
  if (token) {
    decoded = jwt.decode(token, { complete: true });
    username = decoded.payload.username;
  }

  return (
    <div className="header_container">
      <Link to="/demo">
        <Button variant="contained" size="small" color="primary">
          Demo Page
        </Button>
      </Link>
      <div
        style={{
          display: loggedIn ? "flex" : "none",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "x-large",
        }}
      >
        <span>Hello, {username}!</span>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={() => {
            localStorage.clear();
            history.push("./login");
            dispatch(logout());
          }}
        >
          Sign Out
        </Button>
      </div>
      <Link to="/login">
        <Button
          style={{ display: loggedIn ? "none" : "initial" }}
          variant="contained"
          size="small"
          color="primary"
        >
          Login
        </Button>
      </Link>
      <Link to="/registration">
        <Button
          style={{ display: loggedIn ? "none" : "initial" }}
          variant="contained"
          size="small"
          color="primary"
        >
          Registration
        </Button>
      </Link>
    </div>
  );
};

export default Header;
