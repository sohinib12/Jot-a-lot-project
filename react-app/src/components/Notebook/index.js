import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotebooksThunk } from "../../store/noteBook";
import "./Notebook.css";
import NotebookTable from "./table";
import { useModal} from "../../context/Modal";
import CreateNotebook from "./createNotebook";

export default function NoteBook() {
  const {setModalContent} = useModal();
  const notebooks = useSelector((state) =>state.notebooks.allNotebooks);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNotebooksThunk());
  }, [dispatch]);

  const createNotebook = (e) => {
    e.preventDefault();
    setModalContent(<CreateNotebook />);
  };

  const noteDelete = (noteId) => {
    dispatch(getAllNotebooksThunk())
  }

  return (
    <div className="notebook-container">
      <div className="notebook-header-title">
        <h2>NoteBooks</h2>
      </div>
      <div className="notebook-number">
        <div>{notebooks.length} Notebooks</div>
        <div>
          <button onClick={(e) => createNotebook(e)}>Create Notebook </button>
        </div>
      </div>
      <hr style={{ width: "100%" }} />
      <div className="notebook-table">
        <NotebookTable notebooks={notebooks} noteDelete={noteDelete}/>
      </div>
    </div>
  );
}
