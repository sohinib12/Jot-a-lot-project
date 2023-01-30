import "./Notes.css";
import NotesList from "./notesList";
import NoteBody from "./noteBody";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotesThunk } from "../../store/note";
import { getNoteByIdThunk } from "../../store/note";
import { useParams } from "react-router-dom";
import { getNotebookByIdThunk } from "../../store/noteBook";

export default function Notes() {
  // this is the state that will be used to store the id of the note that is clicked on
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const [selectedNotebookId, setSelectedNotebookId] = useState(null);
  // const notes = useSelector((state) => Object.values(state.notes.allNotes));
  const notebooks = useSelector((state) =>
    Object.values(state.notebooks.allNotebooks)
  );
  const dispatch = useDispatch();
  const { notebookId } = useParams();

  useEffect(() => {
    if (notebookId === "default") {
      setSelectedNotebookId(1);
      dispatch(getNotebookByIdThunk(1));
    } else {
      setSelectedNotebookId(notebookId);
      dispatch(getNotebookByIdThunk(notebookId));
    }
  }, [dispatch, notebookId]);

  const handleNoteClick = (e, note) => {
    e.preventDefault();
    setSelectedNoteId(note.id);
  };

  const handleNoteDelete = () => {
    setSelectedNoteId(notes[0].id);
  };

  const addNewNote = (id) => {
    // dispatch(getAllNotesThunk()).then(() => {
    //   setSelectedNoteId(id);
    // });

    dispatch(getNotebookByIdThunk(selectedNotebookId)).then(() => {
      setSelectedNoteId(id);
    });
  };

  console.log("notebooks", notebooks);
  const notebook = notebooks?.filter(
    (notebook) => parseInt(notebook.id) === parseInt(selectedNotebookId)
  )[0];

  const notes = notebook?.notes || [];
  const notebookName = notebook?.title || "";

  return (
    <div className="notes-container">
      <div className="notes-list-container">
        {/* sending properties to child */}
        <NotesList
          notes={notes}
          handleNoteClick={handleNoteClick}
          addNewNote={addNewNote}
          selectedNotedId={selectedNoteId}
          noteBookName={notebookName}
          notebookId={selectedNotebookId}
        />
      </div>
      <div className="notes-body-container">
        <NoteBody
          notebookId={selectedNotebookId}
          noteId={selectedNoteId}
          handleNoteDelete={handleNoteDelete}
        />
      </div>
    </div>
  );
}
