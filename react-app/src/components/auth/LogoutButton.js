import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";
import LogoutModal from "./logoutModal";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const {setModalContent} = useModal();

  const handleLogout = async (e) => {
    await dispatch(logout());
    history.push("/");
  }

  const onLogout = async (e) => {
    setModalContent(
      <LogoutModal
      onLogout={handleLogout}
      />
    )
  };

  return (
    <button className="logout-btn" onClick={onLogout}>
      <i className="fa-solid fa-right-from-bracket"></i>
    </button>
  );
};

export default LogoutButton;
