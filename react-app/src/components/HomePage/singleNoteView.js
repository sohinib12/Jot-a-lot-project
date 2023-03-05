import "./home.css";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import DeleteSingleNoteModal from "./deleteSingleNoteModal";
import { useModal } from "../../context/Modal";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import {
  deleteNoteThunk,
  updateNoteThunk,
  getNoteByIdThunk,
} from "../../store/note";
import modules from "../../quillSettings";

// import ToDoTemplate from "./toDoTemplate";

export default function SingleNoteView() {
  const note = useSelector((state) => state.notes.singleNote);
  const { setModalContent } = useModal();
  const [noteContent, setNoteContent] = useState("");
  const [noteTitle, setNoteTitle] = useState("");
  const { noteId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (noteId === null) {
      setNoteContent("");
      setNoteTitle("");
    }
    if (noteId) dispatch(getNoteByIdThunk(noteId)).then(() => {});
  }, [noteId]);

  useEffect(() => {
    setNoteContent(note.body);
    setNoteTitle(note.title);
  }, [note]);

  const handleEdit = (e) => {
    e.preventDefault();
    // save the edited note to the database
    const editedNote = {
      ...note,
      body: noteContent,
      title: noteTitle,
    };
    dispatch(updateNoteThunk(editedNote));
  };

  const deleteCallBack = () => {
    dispatch(deleteNoteThunk(note.id)).then(() => {
      history.push("/");
    });
  };

  const handleDelete = (e) => {
    e.preventDefault();
    setModalContent(
      <DeleteSingleNoteModal
        deleteCallBack={deleteCallBack}
      />
    );
  };

  return (
    <div className="single-note-container-root">
      <div className="single-note-body-actions">
        <button onClick={handleEdit}>Save</button>
        <button onClick={handleDelete}>Delete</button>
      </div>
      <div className="single-note-body-text">
        <input
          className="single-note-body-title"
          value={noteTitle}
          placeholder="Title"
          onChange={(e) => setNoteTitle(e.target.value)}
        ></input>
        <ReactQuill
          theme="snow"
          value={noteContent}
          onChange={setNoteContent}
          modules={modules}
        />
        {/* <textarea
          className="single-note-body-text-area"
          value={noteContent}
          placeholder="Take a note..."
          onChange={(e) => setNoteContent(e.target.value)}
        ></textarea> */}
      </div>
    </div>
    // <div className="single-note-main-container">
    //   <div className="single-note-body">
    //     {Object.keys(note).length > 0 && (
    //       <>
    //         <div className="single-note-body-actions">
    //           <button onClick={handleEdit}>Save</button>
    //           <button onClick={handleDelete}>Delete</button>
    //         </div>
    //         <div className="single-note-body-text">
    //           <input
    //             className="single-note-body-title"
    //             value={noteTitle}
    //             placeholder="Title"
    //             onChange={(e) => setNoteTitle(e.target.value)}
    //           ></input>
    //           <textarea
    //             className="single-note-body-text-area"
    //             value={noteContent}
    //             placeholder="Take a note..."
    //             onChange={(e) => setNoteContent(e.target.value)}
    //           ></textarea>
    //         </div>
    //       </>
    //     )}
    //   </div>
    // </div>
  );
}
