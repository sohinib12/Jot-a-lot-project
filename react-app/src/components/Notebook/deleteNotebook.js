import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteNotebookThunk } from "../../store/noteBook";
import "./createNotebook.css";

export default function DeleteNotebook({ notebookId }) {
  const dispatch = useDispatch();
  const { closeModal } = useModal();
  const [errorValidations, setErrorValidations] = useState([]);

  const handleDeleteNotebook = (e) => {
    e.preventDefault();
    dispatch(deleteNotebookThunk(notebookId)).then((data) => {
      if (data) {
        setErrorValidations(data);
      } else {
        setErrorValidations([]);
        closeModal();
      }
    });
  };

  return (
    <div className="delete-notebook-main-container">
      <div className="create-notebook-header">
        <h3>Delete notebook?</h3>
        <button onClick={() => closeModal()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="create-notebook-info">
        Any notes in the notebook will be deleted permanently. This cannot be
        undone.
      </div>
      <div>
        <ul className="error-li">
          {errorValidations.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      </div>
      <div className="create-notebook-actions">
        <button onClick={() => closeModal()}>Cancel</button>
        <button onClick={(e) => handleDeleteNotebook(e)}>Delete</button>
      </div>
    </div>
  );
}
