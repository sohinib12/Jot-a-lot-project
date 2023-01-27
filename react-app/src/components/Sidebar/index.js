import {  NavLink } from "react-router-dom";
import "./sidebar.css";
import { useDispatch } from "react-redux";
import { createNoteThunk } from "../../store/note";
import LogoutButton from "../auth/LogoutButton";

export default function Sidebar() {
  const dispatch = useDispatch();

  const createNote = (e) => {
    e.preventDefault();
    // add nullable false to the database
    dispatch(createNoteThunk({
      title: "untitled",
      body: "",
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
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
