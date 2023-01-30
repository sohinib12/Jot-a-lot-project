import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNoteThunk } from "../../store/note";

export default function NotesList({
  notes = [],
  handleNoteClick,
  addNewNote,
  selectedNotedId,
  noteBookName,
  notebookId,
}) {
  const dispatch = useDispatch();

  const handleNewNote = (e) => {
    e.preventDefault();
    dispatch(
      createNoteThunk({
        title: "untitled",
        body: "",
        notebook_id: notebookId,
      })
    ).then((data) => {
      addNewNote(data.id);
    });
  };

  notes = notes.sort((a,b) => {
    return new Date(b.created_at) - new Date(a.created_at)
  })

  return (
    <div>
      <div className="notes-list-header">
        <h2>{noteBookName}</h2>
        <div className="notes-list-actions">
          <button onClick={handleNewNote}>+</button>
        </div>
      </div>
      {notes.map((note) => {
        return (
          <div
            className="notes-list-note"
            key={note.id}
            onClick={(e) => handleNoteClick(e, note)}
            style={
              selectedNotedId === note.id ? { backgroundColor: "#454343" } : {} // this is the conditional styling
            }
          >
            <div className="note-title">{note.title}</div>
            <div
              className="notes-list-date"
              style={{ fontSize: "0.65em", color: "#a4a6aa" }}
            >
              {new Date(note.created_at).toLocaleString([], {
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
  );
}
