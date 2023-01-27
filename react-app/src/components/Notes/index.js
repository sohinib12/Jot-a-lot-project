import "./Notes.css";
import NotesList from "./notesList";
import NoteBody from "./noteBody";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotesThunk } from "../../store/note";
import { getNoteByIdThunk } from "../../store/note";

export default function Notes() {
  // this is the state that will be used to store the id of the note that is clicked on
  const [selectedNoteId, setSelectedNoteId] = useState(null);
  const notes = useSelector((state) => Object.values(state.notes.allNotes));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  const handleNoteClick = (e, note) => {
    e.preventDefault();
    console.log("note clicked", note.id);
    setSelectedNoteId(note.id);
  };

  const handleNoteDelete = () => {
    dispatch(getAllNotesThunk()).then(() => {
      setSelectedNoteId(notes[0].id);
    });
  };

  const addNewNote = (id) => {
    dispatch(getAllNotesThunk()).then(() => {
      setSelectedNoteId(id);
    });
  };

  return (
    <div className="notes-container">
      <div className="notes-list-container">
        {/* sending properties to child */}
        <NotesList
          notes={notes}
          handleNoteClick={handleNoteClick}
          addNewNote={addNewNote}
          selectedNotedId={selectedNoteId}
        />
      </div>
      <div className="notes-body-container">
        <NoteBody noteId={selectedNoteId} handleNoteDelete={handleNoteDelete} />
      </div>
    </div>
  );
}
