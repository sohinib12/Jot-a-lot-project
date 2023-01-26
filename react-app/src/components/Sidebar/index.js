import {  NavLink } from "react-router-dom";
import "./sidebar.css";
import { useDispatch } from "react-redux";
import { createNoteThunk } from "../../store/note";

export default function Sidebar() {
  const dispatch = useDispatch();

  const createNote = (e) => {
    e.preventDefault();
    dispatch(createNoteThunk({
      title: "untitled",
      body: "untitled",
      notebook_id: 1}))
  }

  return (
    <div className="sidebar-container">
      <div>sidebar</div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/notes">Notes</NavLink>
      </div>
      <button onClick={createNote}> + New Note</button>
      <div>
        <NavLink to="/notebooks">Notebooks</NavLink>
      </div>
    </div>
  );
}
