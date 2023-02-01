import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNotebookByIdThunk } from "../../store/noteBook";
import { useSelector } from "react-redux";
import "./Notebook.css";
import DeleteNotebook from "./deleteNotebook";
import { useModal } from "../../context/Modal";
import EditNotebook from "./editNotebook";
import { createNoteThunk, deleteNoteThunk } from "../../store/note";
import { useHistory } from "react-router-dom";

export default function NotebookTable({ notebooks = [], noteDelete }) {
  const { setModalContent } = useModal();
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState([]);
  const history = useHistory();

  const handleRowClick = (index, notebookId) => {
    const newActiveIndexes = [...activeIndex];
    if (newActiveIndexes.includes(index)) {
      newActiveIndexes.splice(newActiveIndexes.indexOf(index), 1);
      setActiveIndex(newActiveIndexes);
      return;
    }
    newActiveIndexes.push(index)
    setActiveIndex(newActiveIndexes);
    // setActiveIndex(index === activeIndex ? null : index);
    dispatch(getNotebookByIdThunk(notebookId));
  };

  const handleNewNote = (e, notebookId) => {
    e.preventDefault()
    dispatch(
      createNoteThunk({
        title: "untitled",
        body: "",
        notebook_id: notebookId,
      })
    ).then((data) => {
      history.push(`/notebook/${notebookId}`)
    });
  }

  const handleNoteDelete = (e, noteId) => {
    e.preventDefault()
    dispatch(deleteNoteThunk(noteId)).then(()=> {
      noteDelete(noteId)
    })
  }


  return (
    <div className="notebook-table">
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Created at</th>
            <th>Updated at</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(notebooks).map((notebook, index) => (
            <React.Fragment key={notebook.id}>
              <tr
                onClick={() => handleRowClick(index, notebook.id)}
                style={{ cursor: "pointer" }}
              >
                <td>
                  {activeIndex.includes(index) ? (
                    <i className="fa-solid fa-caret-down"></i>
                  ) : (
                    <i className="fa-solid fa-caret-right"></i>
                  )}
                </td>
                <td><i className="fa-solid fa-book"></i> {notebook.title}</td>
                <td>{notebook.created_at}</td>
                <td>{notebook.updated_at}</td>
                <td>
                  <button
                  onClick={(e)=> handleNewNote(e, notebook.id)
                  }
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                  <button
                  onClick={(e)=> {e.preventDefault();
                    setModalContent(<EditNotebook notebook={notebook} />)}}><i className="fa-solid fa-pen-to-square"></i></button>
                  <button
                  onClick={(e)=> {e.preventDefault();
                    setModalContent(<DeleteNotebook notebookId={notebook.id} />)}}
                  ><i className="fa-solid fa-trash"></i></button>
                </td>
              </tr>
              {activeIndex.includes(index) && (
                <tr>
                  <td colSpan={5}>
                    <table>
                      <tbody>
                        {notebook.notes?.map((note) => (
                          <tr key={note.id}>
                            <td>{note.title}</td>
                            <td>{note.created_at}</td>
                            <td>{note.updated_at}</td>
                            <td>
                              <button
                              onClick={(e) => handleNoteDelete(e, note.id)}
                              >delete</button>
                              </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
