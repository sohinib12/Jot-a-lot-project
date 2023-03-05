import React from "react";
import { useModal } from "../../context/Modal";
import "../Notes/Notes.css";

export default function DeleteSingleNoteModal({
  deleteCallBack,
}) {
  const { closeModal } = useModal();
  const handleDeleteNote = (e) => {
    e.preventDefault();
    deleteCallBack();
      closeModal();
  };

  return (
    <div className="delete-note-main-container">
      <div className="delete-note-header">
        <h3>Are you sure you want to delete note?</h3>
        <button onClick={() => closeModal()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="delete-note-info">
        Notes will be deleted permanently. This cannot be undone.
      </div>
      <div className="delete-note-actions">
        <button onClick={() => closeModal()}>Cancel</button>
        <button onClick={(e) => handleDeleteNote(e)}>Delete</button>
      </div>
    </div>
  );
}
