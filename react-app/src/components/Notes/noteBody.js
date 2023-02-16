import "./Notes.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { getNoteByIdThunk } from "../../store/note";
import { useState, useEffect } from "react";
import DeleteNoteModal from "./deleteNoteModal";
import { useModal } from "../../context/Modal";
import { updateNoteFromNotebookThunk } from "../../store/noteBook";
import modules from "../../quillSettings";
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
    return () => {
      setNoteContent("");
      setNoteTitle("");
      setErrors([]);
    };
  }, [noteId]);

  useEffect(() => {
    if (noteId === null) {
      return;
    }
    if (noteId === note.id) {
      setNoteContent(note.body);
      setNoteTitle(note.title);
    }

    return () => {
      setNoteContent("");
      setNoteTitle("");
      setErrors([]);
    };
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
        if (data) {
          setErrors(data);
        } else {
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
  console.log(noteId);
  return (
    <div className="notes-body">
      {noteId && Object.keys(note).length > 0 && (
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
              disabled={noteId === null}
            ></input>

            <ReactQuill
              theme="snow"
              value={noteContent}
              onChange={setNoteContent}
              modules={modules}
            />

            {/* <textarea
              className="body-text-area"
              value={noteContent}
              placeholder="Take a note..."
              onChange={(e) => setNoteContent(e.target.value)}
              disabled={noteId === null}
            ></textarea> */}
          </div>
          {/* <ToDoTemplate /> */}
        </>
      )}
    </div>
  );
}
