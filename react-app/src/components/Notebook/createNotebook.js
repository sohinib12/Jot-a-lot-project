import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createNotebookThunk } from "../../store/noteBook";
import "./createNotebook.css";

export default function CreateNotebook() {
  const [notebookName, setNotebookName] = React.useState("");
  const [errorValidations, setErrorValidations] = React.useState([]);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

    const handleCreateNotebook = (e) => {
        e.preventDefault();
        dispatch(createNotebookThunk(notebookName)).then((data)=> {
          if (data) {
            setErrorValidations(data);
          } else {
            setErrorValidations([]);
            closeModal();
          }
        })
    }

  return (
    <div className="create-notebook-main-container">
      <div className="create-notebook-header">
        <h3>Create new notebook</h3>
        <button onClick={() => closeModal()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div className="create-notebook-info">
        Notebooks are useful for grouping notes around a common topic.
      </div>
      <div>
      <ul className="error-li">
            {errorValidations.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
      </div>
      <div className="create-notebook-textarea">
        <div>Name</div>
        <input
          name="notebookName"
          placeholder="Notebook Name"
          type="text"
          value={notebookName}
          onChange={(e) => setNotebookName(e.target.value)}
        ></input>
      </div>
      <div className="create-notebook-actions">
        <button onClick={() => closeModal()}>Cancel</button>
        <button onClick={(e) => handleCreateNotebook(e)}>Create</button>
      </div>
    </div>
  );
}
