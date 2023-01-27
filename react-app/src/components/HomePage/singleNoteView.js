
import "../Notes/Notes.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {deleteNoteThunk, updateNoteThunk, getNoteByIdThunk} from "../../store/note";
import { useState, useEffect } from "react";
// import ToDoTemplate from "./toDoTemplate";

export default function SingleNoteView() {
  const note = useSelector((state) => state.notes.singleNote);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
    const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (noteId === null) {
      console.log('clear the body')
      setNoteContent("");
      setNoteTitle("");
    }
    if (noteId) dispatch(getNoteByIdThunk(noteId)).then(() => {});
  }, [noteId]);

  useEffect(() => {
    setNoteContent(note.body);
    setNoteTitle(note.title);
  }, [note]);

  const handleEdit = (e) => {
    e.preventDefault();
    // save the edited note to the database
    const editedNote = {
      ...note,
      body: noteContent,
      title: noteTitle,
    };
    dispatch(updateNoteThunk(editedNote));
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch(deleteNoteThunk(note.id)).then(() => {
      console.log("deleted");
      // history.push("/notes");
    });
  };

  return (
    <div className="notes-body">
      {Object.keys(note).length > 0 && (
        <>
          <div className="notes-body-actions">
            <button onClick={handleEdit}>Save</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <div className="notes-body-text">
            <input
              className="notes-body-title"
              value={noteTitle}
              placeholder="Title"
              onChange={(e) => setNoteTitle(e.target.value)}
            ></input>
            <textarea
              className="body-text-area"
              value={noteContent}
              placeholder="Take a note..."
              onChange={(e) => setNoteContent(e.target.value)}
            ></textarea>
          </div>
        </>
      )}
    </div>
  );
}
