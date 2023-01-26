import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllNotesThunk } from "../../store/note";
import { getNoteByIdThunk } from "../../store/note";

export default function NotesList() {
  const notes = useSelector((state) => Object.values(state.notes.allNotes));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  const handleNoteClick = (e, note) => {
    e.preventDefault();
    dispatch(getNoteByIdThunk(note.id)).then(() => {});
  };

  return (
    <div>
      {notes.map((note) => {
        return (
          <div
            className="notes-list-note"
            key={note.id}
            onClick={(e) => handleNoteClick(e, note)}
          >
            {note.title}
          </div>
        );
      })}
    </div>
  );
}
