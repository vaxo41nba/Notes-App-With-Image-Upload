import React from "react";
import "./Note.css";

import { useHistory } from "react-router-dom";

export default function Note({ note, createdAt, image, id }) {
  const history = useHistory();
  return (
    <div
      className="note-container"
      style={{
        backgroundImage: image
          ? `url(${image})`
          : `url(${require("../../note.jpg")})`,
      }}
      onClick={() => {
        if (!id.toString().includes("test")) {
          history.push(`/view-edit-note/${id}`);
        } else {
          history.push(`/view-edit-note-demo/${id}`);
        }
      }}
    >
      <span className="note-body">
        {note ? note.split(" ").slice(0, 4).join(" ") : null}
        {note.split(/\n| /).length > 4 ? "..." : null}
      </span>
      <span>Created: {createdAt ? createdAt.split("T")[0] : null}</span>
    </div>
  );
}
