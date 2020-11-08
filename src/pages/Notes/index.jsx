import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as jwt from "jsonwebtoken";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import IconButton from "@material-ui/core/IconButton";

import Note from "../../components/Note";
import { getNotes } from "../../redux/actions";

import "./Notes.css";
import host from "../../host";

export default function Notes() {
  const dispatch = useDispatch();

  const history = useHistory();

  let state = useSelector((state) => state);
  const { notes } = state;

  const get = () => {
    let token = localStorage.getItem("token");
    let decoded = jwt.decode(token, { complete: true });
    let username = decoded.payload.username;

    axios
      .get(`${host}/${username}`)
      .then((response) => {
        dispatch(getNotes(response.data));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      history.push("/login");
    } else {
      get();
    }
  }, []);

  return (
    <div className="notes-container">
      <div className="notes">
        {notes.map((n) => (
          <Note
            key={n.id}
            note={n.value}
            image={n.image}
            createdAt={n.createdAt}
            image={n.image}
            id={n.id}
          />
        ))}
      </div>
      <div id="icon-signOut">
        <Link to="/addnote">
          <IconButton size="small">
            <AddCircleIcon style={{ fontSize: 100 }} />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
