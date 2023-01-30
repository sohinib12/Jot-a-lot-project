import {  NavLink } from "react-router-dom";
import "./sidebar.css";
import LogoutButton from "../auth/LogoutButton";

export default function Sidebar() {



  return (
    <div className="sidebar-container">
      <div>sidebar</div>
      <div>
        <NavLink to="/home">Home</NavLink>
      </div>
      <div>
        <NavLink to="/notebook/default">Notes</NavLink>
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
