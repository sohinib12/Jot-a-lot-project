const UPDATE_SCRATCHPAD = "scratchpad/UPDATE_SCRATCHPAD";

export const updateScratchpad = (newScratchpad) => ({
    type: UPDATE_SCRATCHPAD,
    payload: newScratchpad,
});

export const updateScratchpadThunk = (scratchpad, userId) => async (dispatch) => {
    const res = await fetch(`/api/scratchpad/${userId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(scratchpad),
    });
    if (res.ok) {
        const data = await res.json();
        dispatch(updateScratchpad(data));
        return data;
    } else if (res.status < 500) {
        const data = await res.json();
        if (data.errors) {
            return data.errors;
        }

    }
}

export default function scratchpadReducer(state = {}, action) {
    let newState = {};
    switch (action.type) {
        case UPDATE_SCRATCHPAD:
            newState = { ...state };
            newState[action.payload.id] = action.payload;
            return newState;
            default:
            return state
}
}
