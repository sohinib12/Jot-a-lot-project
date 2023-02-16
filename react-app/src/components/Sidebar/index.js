import { NavLink } from "react-router-dom";
import "./sidebar.css";
import LogoutButton from "../auth/LogoutButton";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-container">
        <div>Jot-a-lot</div>
        <div>
          <NavLink className="sidebar-navlink" to="/">
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
        </div>
        <div>
          <NavLink className="sidebar-navlink" to="/notebook/default">
            <i className="fa-solid fa-note-sticky"></i> Notes
          </NavLink>
        </div>
        <div>
          <NavLink className="sidebar-navlink" to="/notebooks">
            <i className="fa-solid fa-folder"></i> Notebooks
          </NavLink>
        </div>
      </div>
      <div className="sidebar-actions">
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
