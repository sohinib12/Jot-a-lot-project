const GET_ALL_NOTEBOOKS = "notebooks/getAllNotebooks";
const GET_NOTEBOOK_BY_ID = "notebooks/getNotebookById";
const CREATE_NOTEBOOK = "notebooks/createNotebook";
const UPDATE_NOTEBOOK = "notebooks/updateNotebook";
const DELETE_NOTEBOOK = "notebooks/deleteNotebook";

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
}

export const getNotebookByIdThunk = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(getNotebookById(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    }
    return { errors: ["An error occurred. Please try again."] };
}

export const createNotebookThunk = (notebook) => async (dispatch) => {
    const res = await fetch("/api/notebooks/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notebook),
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
}

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
}

export const deleteNotebookThunk = (notebookId) => async (dispatch) => {
    const res = await fetch(`/api/notebooks/${notebookId}`, {
        method: "DELETE",
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(deleteNotebook(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }
    }
    return { errors: ["An error occurred. Please try again."] };
}

const initialState = {
    allNotebooks: {},
    currentNotebook: {},
}

export default function noteBookReducer (state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_ALL_NOTEBOOKS:
            newState = {}
            action.payload.forEach(notebook => {
                newState[notebook.id] = notebook;
            });
            return {
                ...state,
                allNotebooks: newState,
            };
        case GET_NOTEBOOK_BY_ID:
            return {
                ...state,
                currentNotebook: action.payload,
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

        default:
            return state;
    }
}
