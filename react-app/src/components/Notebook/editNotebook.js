import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateNotebookThunk } from "../../store/noteBook";
import "./createNotebook.css";

export default function EditNotebook({ notebook }) {
  const [notebookName, setNotebookName] = React.useState("");
  const [errorValidations, setErrorValidations] = useState([]);
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  useEffect(() => {
    setNotebookName(notebook.title);
  }, [notebook]);

  const handleUpdateNotebook = (e) => {
    e.preventDefault();
    dispatch(
      updateNotebookThunk({ id: notebook.id, title: notebookName })
    ).then((data) => {
      if (data) {
        setErrorValidations(data);
      } else {
        setErrorValidations([]);
        closeModal();
      }
    });
  };

  return (
    <div className="update-notebook-main-container">
      <div className="create-notebook-header">
        <h3>Edit your notebook</h3>
        <button onClick={() => closeModal()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
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
        <button className="evernote-btn" onClick={() => closeModal()}>
          Cancel
        </button>
        <button
          className="evernote-btn"
          onClick={(e) => handleUpdateNotebook(e)}
        >
          Update
        </button>
      </div>
    </div>
  );
}
