import {  NavLink } from "react-router-dom";
import "./sidebar.css";
import LogoutButton from "../auth/LogoutButton";

export default function Sidebar() {



  return (
    <div className="sidebar-container">
      <div>sidebar</div>
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to="/notes">Notes</NavLink>
      </div>

      <div>
        <NavLink to="/notebooks">Notebooks</NavLink>
      </div>
      <div>
        <LogoutButton />
      </div>
    </div>
  );
}
