import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import { useHistory } from "react-router-dom";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const state = useSelector((state) => state);
  const user = useSelector((state) => state.session.user);

  const onLogout = async (e) => {
    await dispatch(logout());
    return history.push("/");
  };

  return <button onClick={onLogout}>Logout {user.username}</button>;
};

export default LogoutButton;
