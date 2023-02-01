import "./home.css";
import NotesList from "../Notes/notesList";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotesThunk, getNoteByIdThunk } from "../../store/note";
import { useHistory } from "react-router-dom";

export default function Home() {
  const user = useSelector((state) => state.session.user);

  let notes = useSelector((state) => Object.values(state.notes.allNotes));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getAllNotesThunk());
  }, [dispatch]);

  const handleNoteClick = (e, note) => {
    e.preventDefault();
    dispatch(getNoteByIdThunk(note.id)).then(() => {
      console.log("note clicked", note.id);
      history.push(`/notes/${note.id}`);
    });
  };
  // sort notes by date updated (most recent first)
  notes = notes?.sort((a, b) => {
    return new Date(b.updated_at) - new Date(a.updated_at);
  });

  // display date in a readable format
  const days = [ "SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY",
    "FRIDAY", "SATURDAY",
  ];
  const months = [ "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER","DECEMBER",
  ];
  const date = new Date();
  const day = days[date.getUTCDay()];
  const month = months[date.getUTCMonth()];
  const dateString = `${day}, ${date.getUTCDate()} ${month}, ${date.getUTCFullYear()}`;
  // console.log(dateString);

  return (
    <div className="home-container">
      <div className="home-welcome-title">
        {" "}
        Ready to jot down your thoughts, {user.username}?
        <div className="home-welcome-date">{dateString}</div>
      </div>
      <div className="home-parent">
        <div className="home-notes-list">
          <div className="home-notes-list-heading">RECENT NOTES</div>
          <div className="home-notes-list-items-container">
            {notes.map((note) => {
              return (
                <div
                  className="home-notes-list-item"
                  key={note.id}
                  onClick={(e) => handleNoteClick(e, note)}
                >
                  <div className="note-title">{note.title}</div>
                  <div
                    className="notes-list-date"
                    style={{ fontSize: "0.65em", color: "#a4a6aa" }}
                  >
                    {new Date(note.updated_at).toLocaleString([], {
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="home-scratchpad">scratch pad</div>
      </div>
    </div>
  );
}
