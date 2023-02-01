import "./Notes.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getNoteByIdThunk } from "../../store/note";
import { useState, useEffect } from "react";
import DeleteNoteModal from "./deleteNoteModal";
import { useModal } from "../../context/Modal";
import { updateNoteFromNotebookThunk } from "../../store/noteBook";
// import ToDoTemplate from "./toDoTemplate";

export default function NoteBody({ noteId, handleNoteDelete, notebookId }) {
  const { setModalContent } = useModal();
  const note = useSelector((state) => state.notes.singleNote);
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (noteId === null) {
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
    dispatch(updateNoteFromNotebookThunk(notebookId, editedNote)).then(
      (data) => {
        console.log("data: ", data);
        if (data) {
          setErrors(data);
        } else {
          console.log("no errors");
          setErrors([]);
        }
      }
    );
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setModalContent(
      <DeleteNoteModal
        notebookId={notebookId}
        noteId={note.id}
        onDeleteCallback={handleNoteDelete}
      />
    );
  };

  return (
    <div className="notes-body">
      {Object.keys(note).length > 0 && (
        <>
          <div className="notes-body-actions">
            <div className="error-form">
              {errors || [].map((error, ind) => <div key={ind}>*{error}</div>)}
            </div>
            <button onClick={handleEdit}>Save</button>
            <button onClick={(e) => handleDelete(e)}>Delete</button>
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
          {/* <ToDoTemplate /> */}
        </>
      )}
    </div>
  );
}
