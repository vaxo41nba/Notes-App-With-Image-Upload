import React from "react";

import "./Demo.css";
import Note from "../../components/Note";

export default function Demo() {
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

  return (
    <div className="notes-container">
      <div className="notes">
        {notes.map((n) => (
          <Note key={n.id} note={n.value} image={n.image} id={n.id} />
        ))}
      </div>
    </div>
  );
}
