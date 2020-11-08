import React from "react";
import { useHistory } from "react-router-dom";

import TextField from "@material-ui/core/TextField";

import "./NoteEditViewDemo.css";

export default function Note_edit_view_Demo() {
  const history = useHistory();
  const notes = [
    {
      value:
        "I like facing new challenges that inspires me to become better on the way of my dream goals. Luckily, skills haven't let me down ever yet.",
      createdAt: "today",
      image:
        "https://images.unsplash.com/photo-1564951434112-64d74cc2a2d7?ixlib=rb-1.2.1&w=1000&q=80",
      id: "test1",
    },
    {
      value: "Second note to test the application, and how it works",
      createdAt: "yesterday",
      image: null,
      id: "test2",
    },
    {
      value: "Third note to test the application, and how it works",
      createdAt: "last week",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQqYzt_A9FX-06Itx3RZMOUYS5NLQaB3jZyuQ&usqp=CAU",
      id: "test3",
    },
    {
      value: "Fourth note to test the application, and how it works",
      createdAt: "last year",
      image: null,
      id: "test4",
    },
  ];

  let id = history.location.pathname.split("/").reverse()[0];

  let noteToedit = {};
  notes.forEach((n) => {
    if (n.id.toString() === id) {
      noteToedit = {
        note: n.value,
        image: n.image,
      };
    }
  });

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
        style={{ width: "100%" }}
      />
    </div>
  );
}
