import React from "react";
import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import "../Notes/Notes.css"

export default function LogoutModal({onLogout}) {
    const dispatch = useDispatch();
    const history = useHistory();
    const { closeModal } = useModal();
    const handleLogout = async(e) => {
    e.preventDefault();
        onLogout()
      closeModal();
  };

  return (
    <div className="delete-note-main-container">
      <div className="delete-note-header">
        <h3>Are you sure you want to logout?</h3>
        <button onClick={() => closeModal()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="delete-note-info">
        Everything unsaved will be lost.
      </div>
      <div className="delete-note-actions">
        <button onClick={() => closeModal()}>Cancel</button>
        <button onClick={(e) => handleLogout(e)}>Logout</button>
      </div>
    </div>
  );
}
