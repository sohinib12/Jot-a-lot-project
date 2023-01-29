import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllNotebooksThunk } from "../../store/notebook";
import "./Notebook.css";
import NotebookTable from "./table";
// import { useModal } from "./Modal";

export default function NoteBook() {
  const notebooks = useSelector((state) =>
    Object.values(state.notebooks.allNotebooks)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllNotebooksThunk());
  }, [dispatch]);

  const createNotebook = (e) => {
    e.preventDefault();
    // setModalContent(<AddNotebook />);
  };

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
        <NotebookTable notebooks={notebooks} />
      </div>
    </div>
  );
}
