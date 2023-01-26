import "./Notes.css";
import NotesList from "./notesList";
import NoteBody from "./noteBody";

export default function Notes() {
  return (
    <div className="notes-container">
      <div className="notes-list-container">
        <NotesList />
      </div>
      <div className="notes-body-container">
        <NoteBody />
      </div>
    </div>
  );
}
