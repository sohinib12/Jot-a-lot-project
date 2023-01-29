const GET_ALL_NOTES = "notes/GET_ALL_NOTES";
const GET_NOTE_BY_ID = "notes/GET_NOTE_BY_ID";
const CREATE_NOTE = "notes/CREATE_NOTE";
const UPDATE_NOTE = "notes/UPDATE_NOTE";
const DELETE_NOTE = "notes/DELETE_NOTE";

export const getAllNotes = (notes) => ({
  type: GET_ALL_NOTES,
  payload: notes,
});

export const getNoteById = (note) => ({
  type: GET_NOTE_BY_ID,
  payload: note,
});

export const createNote = (note) => ({
  type: CREATE_NOTE,
  payload: note,
});

export const updateNote = (note) => ({
  type: UPDATE_NOTE,
  payload: note,
});

export const deleteNote = (noteId) => ({
  type: DELETE_NOTE,
  payload: noteId,
});

export const getAllNotesThunk = () => async (dispatch) => {
  const res = await fetch("/api/notes/");
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllNotes(data.notes));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const getNoteByIdThunk = (noteId) => async (dispatch) => {
  const res = await fetch(`/api/notes/${noteId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getNoteById(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const createNoteThunk = (note) => async (dispatch) => {
  const res = await fetch("/api/notes/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createNote(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const updateNoteThunk = (note) => async (dispatch) => {
  const res = await fetch(`/api/notes/${note.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(note),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateNote(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const deleteNoteThunk = (noteId) => async (dispatch) => {
  const res = await fetch(`/api/notes/${noteId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteNote(noteId));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
    return { errors: ["An error occurred. Please try again."] };
  }
};

const initialState = {
  allNotes: {},
  singleNote: {},
};

export default function noteReducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case GET_ALL_NOTES:
      newState = {};
      action.payload.forEach((note) => {
        newState[note.id] = note;
      });
      return {
        ...state,
        allNotes: newState,
      };

    case GET_NOTE_BY_ID:
      return {
        ...state,
        singleNote: action.payload,
      };

    case CREATE_NOTE:
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return {
        ...state,
        allNotes: newState,
      };

    case UPDATE_NOTE:
      newState = { ...state.allNotes };
      newState[action.payload.id] = action.payload;
      console.log(newState)
      return {
        ...state,
        allNotes: newState,
      };

    case DELETE_NOTE:
      newState = { ...state };
      delete newState[action.payload];
      return {
        ...state,
        allNotes: newState,
      };
    default:
      return state;
  }
}
