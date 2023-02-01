import { NavLink } from "react-router-dom";
import "./sidebar.css";
import LogoutButton from "../auth/LogoutButton";

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <div className="sidebar-container">
        <div>Jot-a-lot</div>
        <div>
          <NavLink to="/home">
            <i className="fa-solid fa-house"></i> Home
          </NavLink>
        </div>
        <div>
          <NavLink to="/notebook/default">
            <i className="fa-solid fa-note-sticky"></i> Notes
          </NavLink>
        </div>
        <div>
          <NavLink to="/notebooks">
            <i className="fa-solid fa-book"></i> Notebooks
          </NavLink>
        </div>
      </div>
      <div style={{ marginBottom: "16px" }}>
        <div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
