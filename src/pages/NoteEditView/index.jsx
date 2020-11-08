import React, { useEffect, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import * as jwt from "jsonwebtoken";

import TextField from "@material-ui/core/TextField";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

import { deleteNote, editNote, getNotes } from "../../redux/actions";
import "./NoteEditView.css";
import host from "../../host";

export default function NoteEditView() {
  const noteBody = useRef(null);
  const notes = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const history = useHistory();
  let id = history.location.pathname.split("/").reverse()[0];

  let noteToedit = {};
  notes.forEach((n) => {
    if (n.id.toString() === id) {
      noteToedit = {
        note: n.value,
        createdAt: n.createdAt,
        image: n.image,
        id: n.id,
      };
    }
  });

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

  const handleDelete = () => {
    dispatch(deleteNote(id));
    axios
      .delete(`${host}/delete/${id}`)
      .then((doc) => {
        if (!doc) {
          console.log("Error");
        }
        console.log("Successfully deleted");
        history.push("/");
      })
      .catch((error) => {
        console.log(error + " Unable to delete");
      });
  };

  const handleEdit = () => {
    dispatch(editNote(noteBody.current.value, null, id));
    axios
      .put(`${host}/edit/${id}`, {
        value: noteBody.current.value,
      })
      .then(() => {
        console.log(`Item edited successfully`);
        history.push("/");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div className="Note_edit_view_container">
      <p className="page-title">View & Edit Your Note</p>
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={5}
        rowsMax={10}
        variant="outlined"
        required={true}
        defaultValue={noteToedit.note}
        inputRef={noteBody}
        style={{ width: "100%" }}
      />
      <div className="icons">
        <IconButton size="small" onClick={handleEdit}>
          <CheckCircleIcon style={{ fontSize: 100 }} />
        </IconButton>
        <Link to="/">
          <IconButton size="small" onClick={() => history.push(`/`)}>
            <CancelIcon style={{ fontSize: 100 }} />
          </IconButton>
        </Link>
        <IconButton size="small" onClick={handleDelete}>
          <DeleteIcon style={{ fontSize: 100 }} />
        </IconButton>
      </div>
    </div>
  );
}
