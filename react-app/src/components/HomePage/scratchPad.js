import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { updateScratchpadThunk } from "../../store/scratchpad";

export default function ScratchPad () {
    const [scratchpad, setScratchpad] = useState("");
    const dispatch = useDispatch();
    const user = useSelector(state => state.session.user);

    useEffect(() => {
        setScratchpad(user.scratchpad || "")
    }, [user.scratchpad, setScratchpad])

    const handleSave = (e) => {
        e.preventDefault();
        dispatch(updateScratchpadThunk(scratchpad));
    }

    const handleClear = (e) => {
        e.preventDefault();
        setScratchpad("");
    }
    return (
        <div>
            <div>
            <h1>ScratchPad</h1>
            <div>
                <button onClick={handleSave}>save</button>
                <button onClick={handleClear}>clear</button>
            </div>
            </div>
            <div>
                <textarea
                    name="scratchpad"
                    id="scratchpad"
                    cols="30"
                    rows="10"
                    maxLength="700"
                    value={scratchpad}
                    onChange={(e) => setScratchpad(e.target.value)}
                    placeholder="Jot down your ideas here..."
                />
            </div>

        </div>
    );
}
