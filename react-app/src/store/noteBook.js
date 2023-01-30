const GET_ALL_NOTEBOOKS = "notebooks/getAllNotebooks";
const GET_NOTEBOOK_BY_ID = "notebooks/getNotebookById";
const CREATE_NOTEBOOK = "notebooks/createNotebook";
const UPDATE_NOTEBOOK = "notebooks/updateNotebook";
const DELETE_NOTEBOOK = "notebooks/deleteNotebook";
const DELETE_NOTE_FROM_NOTEBOOK = "notes/deleteNoteFromNotebook";
const UPDATE_NOTE_FROM_NOTEBOOK = "notes/updateNoteFromNotebook";

export const getAllNotebooks = (notebooks) => ({
  type: GET_ALL_NOTEBOOKS,
  payload: notebooks,
});

export const getNotebookById = (notebook) => ({
  type: GET_NOTEBOOK_BY_ID,
  payload: notebook,
});

export const createNotebook = (notebook) => ({
  type: CREATE_NOTEBOOK,
  payload: notebook,
});

export const updateNotebook = (notebook) => ({
  type: UPDATE_NOTEBOOK,
  payload: notebook,
});

export const deleteNotebook = (notebookId) => ({
  type: DELETE_NOTEBOOK,
  payload: notebookId,
});

export const updateNoteFromNotebook = (notebookId, note) => ({
  type: UPDATE_NOTE_FROM_NOTEBOOK,
  payload: { notebookId, note },
});

export const deleteNoteFromNotebook = (notebookId, noteId) => ({
  type: DELETE_NOTE_FROM_NOTEBOOK,
  payload: { notebookId, noteId },
});

export const getAllNotebooksThunk = () => async (dispatch) => {
  const res = await fetch("/api/notebooks/");
  if (res.ok) {
    const data = await res.json();
    dispatch(getAllNotebooks(data.notebooks));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const getNotebookByIdThunk = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}`);
  if (res.ok) {
    const data = await res.json();
    dispatch(getNotebookById(data.Notebook));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const createNotebookThunk = (notebookName) => async (dispatch) => {
  const res = await fetch("/api/notebooks/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: notebookName }),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(createNotebook(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const updateNotebookThunk = (notebook) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebook.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notebook),
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(updateNotebook(data));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
  const res = await fetch(`/api/notebooks/${notebookId}`, {
    method: "DELETE",
  });
  if (res.ok) {
    const data = await res.json();
    dispatch(deleteNotebook(notebookId));
    return data;
  } else if (res.status < 500) {
    const data = await res.json();
    if (data.errors) {
      return data.errors;
    }
  }
  return { errors: ["An error occurred. Please try again."] };
};

export const deleteNoteFromNotebookThunk =
  (notebookId, noteId) => async (dispatch) => {
    const res = await fetch(`/api/notes/${noteId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(deleteNoteFromNotebook(notebookId, noteId));
      return data;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
      return { errors: ["An error occurred. Please try again."] };
    }
  };

export const updateNoteFromNotebookThunk =
  (notebookId, note) => async (dispatch) => {
    const res = await fetch(`/api/notes/${note.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
    if (res.ok) {
      const data = await res.json();
      dispatch(updateNoteFromNotebook(notebookId, data));
      return data;
    } else if (res.status < 500) {
      const data = await res.json();
      if (data.errors) {
        return data.errors;
      }
    }
    return { errors: ["An error occurred. Please try again."] };
  };

const initialState = {
  allNotebooks: {},
};

export default function noteBookReducer(state = initialState, action) {
  let newState;
  let notebookId;
  let noteId;

  switch (action.type) {
    case GET_ALL_NOTEBOOKS:
      newState = {};
      action.payload.forEach((notebook) => {
        newState[notebook.id] = notebook;
      });
      return {
        ...state,
        allNotebooks: newState,
      };
    case GET_NOTEBOOK_BY_ID:
      newState = { ...state.allNotebooks };
      newState[action.payload.id] = action.payload;
      return {
        ...state,
        allNotebooks: newState,
      };

    case CREATE_NOTEBOOK:
      newState = { ...state.allNotebooks };
      newState[action.payload.id] = action.payload;
      return {
        ...state,
        allNotebooks: newState,
      };

    case UPDATE_NOTEBOOK:
      newState = { ...state.allNotebooks };
      newState[action.payload.id] = action.payload;
      return {
        ...state,
        allNotebooks: newState,
      };

    case DELETE_NOTEBOOK:
      newState = { ...state.allNotebooks };
      delete newState[action.payload];
      return {
        ...state,
        allNotebooks: newState,
      };
    case DELETE_NOTE_FROM_NOTEBOOK:
      newState = { ...state.allNotebooks };
      newState[action.payload.notebookId].notes = newState[
        action.payload.notebookId
      ].notes.filter((note) => note.id !== action.payload.noteId);
      return {
        ...state,
        allNotebooks: newState,
      };
    case UPDATE_NOTE_FROM_NOTEBOOK:
      newState = { ...state.allNotebooks };
      notebookId = action.payload.notebookId;
      noteId = action.payload.note.id;
      newState[action.payload.notebookId].notes = newState[
        notebookId
      ].notes.filter((note) => note.id !== noteId);
      newState[action.payload.notebookId].notes.push(action.payload.note);
      console.log(newState);
      return {
        ...state,
        allNotebooks: newState,
      };

    default:
      return state;
  }
}
