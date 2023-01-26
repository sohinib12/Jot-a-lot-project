import "./Notes.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { deleteNoteThunk, updateNoteThunk } from "../../store/note";
import { useState ,useEffect } from "react";


export default function NoteBody() {
  const note = useSelector((state) => state.notes.singleNote);
  const [noteContent, setNoteContent] = useState("");
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect (() => {
        setNoteContent(note.body)
    }, [note])

    const handleEdit = (e) => {
        e.preventDefault();
        // save the edited note to the database
        const editedNote = {
            ...note,
            body: noteContent
        }
        dispatch(updateNoteThunk(editedNote))
    }

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteNoteThunk(note.id)).then(() => {
            console.log("deleted")
             history.push("/home");
        })
    }


  return (
    <div className="notes-body">
      <div className="notes-body-actions">
        <button onClick={handleEdit}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="notes-body-text">
        <textarea className="body-text-area"
        value={noteContent}
        onChange={(e) => setNoteContent(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
}
