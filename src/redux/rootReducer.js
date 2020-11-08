const initialState = {
  notes: [],
  loggedIn: localStorage.getItem("token") ? true : false,
};

export default (state = initialState, action) => {
  const { notes } = state;
  const { note, createdAt, image, id } = action;
  switch (action.type) {
    case "GET_NOTES":
      return {
        ...state,
        notes: action.notes,
      };

    case "ADD_NOTE":
      return { ...state, notes: [...notes, { note, createdAt, image, id }] };

    case "EDIT_NOTE":
      const noteToedit = notes.find((note) => note.id.toString() === id);
      noteToedit.note = note;
      return state;

    case "DELETE_NOTE":
      return {
        ...state,
        notes: notes.filter((note) => note.id.toString() !== id),
      };

    case "LOG_IN":
      return {
        ...state,
        loggedIn: true,
      };

    case "LOG_OUT":
      return {
        ...state,
        loggedIn: false,
      };

    default:
      return state;
  }
};
