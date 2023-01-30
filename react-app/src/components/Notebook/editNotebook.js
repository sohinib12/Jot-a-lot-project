import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { updateNotebookThunk } from "../../store/noteBook";
import "./createNotebook.css";


export default function EditNotebook({notebook}) {
  const [notebookName, setNotebookName] = React.useState("");
  const dispatch = useDispatch();
  const { closeModal } = useModal();

    useEffect (() => {
        setNotebookName(notebook.title)
    },[notebook])

    const handleUpdateNotebook = (e) => {
        e.preventDefault();
        dispatch(updateNotebookThunk({ id: notebook.id, title: notebookName })).then(()=> {
            closeModal();
        })
    }

  return (
    <div className="create-notebook-main-container">
      <div className="create-notebook-header">
        <h3>Edit your notebook</h3>
        <button onClick={() => closeModal()}>
          <i className="fa-solid fa-xmark"></i>
        </button>
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
        <button onClick={(e) => handleUpdateNotebook(e)}>Update</button>
      </div>
    </div>
  );
}
