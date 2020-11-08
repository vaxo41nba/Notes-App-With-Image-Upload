import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import * as jwt from "jsonwebtoken";

import { addNote, getNotes } from "../../redux/actions";

import TextField from "@material-ui/core/TextField";
import { DropzoneArea } from "material-ui-dropzone";
import AvatarEditor from "react-avatar-editor";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
import IconButton from "@material-ui/core/IconButton";

import "./AddNote.css";
import host from "../../host";

export default function AddNote() {
  const CLOUDINARY_UPLOAD_PRESET = "meslh0nm";
  const CLOUDINARY_UPLOAD_URL = "https://api.cloudinary.com/v1_1/vaxo41/upload";

  const [uploadedFile, setUploadedFile] = useState(null);
  const [rotate, setRotate] = useState(0);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0.5, y: 0.5 });

  const noteBody = useRef(null);
  const avatarEditor = useRef(null);

  const dispatch = useDispatch();

  const history = useHistory();

  const handleAdd = () => {
    let { value } = noteBody.current;
    let token = localStorage.getItem("token");
    let decoded = jwt.decode(token, { complete: true });
    let username = decoded.payload.username;

    if (value.trim()) {
      let formData = new FormData();
      formData.append(
        "file",
        uploadedFile ? uploadedFile : `https://i.ibb.co/R4PHJsj/note.jpg`
      );
      formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

      axios
        .post(CLOUDINARY_UPLOAD_URL, formData)
        .then((res) => {
          axios
            .post(`${host}/add`, {
              value,
              image: res.data.url,
              username,
            })
            .then((response) => {
              const { value, id, image } = response.data;
              dispatch(addNote(value, image, id));
              axios.get(`${host}/${username}`).then((response) => {
                dispatch(getNotes(response.data));
                history.push("/");
              });
            })
            .catch((err) => {
              console.log(err + " unable to save to database");
            });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      alert("Please, enter something");
    }
  };

  const handleRotate = (e) => {
    e.preventDefault();
    setRotate(parseInt(e.target.value));
  };

  const handleScale = (e) => {
    e.preventDefault();
    setScale(parseFloat(e.target.value));
  };

  const handlePosition = (e) => {
    setPosition(e);
  };

  const handleUpload = () => {
    const canvas = avatarEditor.current.getImage().toDataURL();

    fetch(canvas)
      .then((res) => res.blob())
      .then((blob) => {
        setUploadedFile(new File([blob], "imageName"));
        setScale(1);
        setRotate(0);
        alert("Done successfully");
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <div className="add-note-container">
      <TextField
        id="outlined-multiline-static"
        multiline
        rows={5}
        rowsMax={10}
        variant="outlined"
        required={true}
        style={{ width: "100%" }}
        inputRef={noteBody}
      />
      <div style={{ display: uploadedFile ? "none" : "inherit" }}>
        <DropzoneArea
          filesLimit={1}
          acceptedFiles={["image/*"]}
          showPreviewsInDropzone={false}
          onDrop={(file) => setUploadedFile(file[0])}
        />
      </div>
      <div
        style={{
          display: uploadedFile ? "flex" : "none",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "2em",
        }}
      >
        <AvatarEditor
          ref={avatarEditor}
          image={uploadedFile}
          width={400}
          height={400}
          scale={scale}
          rotate={rotate}
          position={position}
          onPositionChange={handlePosition}
        />
        Rotate:
        <input
          type="range"
          min="0"
          max="360"
          value={rotate}
          onChange={handleRotate}
        />
        Zoom:
        <input
          name="scale"
          type="range"
          onChange={handleScale}
          min="1"
          max="3"
          step="0.01"
          defaultValue="1"
        />
        <button onClick={handleUpload}>Finish editing and attach image</button>
        <button onClick={() => setUploadedFile(null)}>Cancel Upload</button>
      </div>
      <div className="icons">
        <IconButton size="small" onClick={handleAdd}>
          <CheckCircleIcon style={{ fontSize: 100 }} />
        </IconButton>
        <Link to="/">
          <IconButton size="small">
            <CancelIcon style={{ fontSize: 100 }} />
          </IconButton>
        </Link>
      </div>
    </div>
  );
}
