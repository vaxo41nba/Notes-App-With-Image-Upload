export const getNotes = (notes) => {
  return {
    type: "GET_NOTES",
    notes,
  };
};

export const addNote = (note, image, id) => {
  return {
    type: "ADD_NOTE",
    note,
    image,
    id,
  };
};

export const editNote = (note, image, id) => {
  return {
    type: "EDIT_NOTE",
    note,
    image,
    id,
  };
};

export const deleteNote = (id) => {
  return {
    type: "DELETE_NOTE",
    id,
  };
};

export const login = () => {
  return {
    type: "LOG_IN",
  };
};

export const logout = () => {
  return {
    type: "LOG_OUT",
  };
};
