import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import bg from "./login_bg.jpg";
import logo from "./navbar_logo1.png";
import "./auth.css";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, password)).then(
        (data) => {
          console.log(data);
          if (data) {
            setErrors(data);
          } else {
            setErrors([]);
            history.push("/home");
          }
        }
      );
    } else {
      setErrors(["Passwords do not match"]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div>
      <div className="login-form">
        <form className="login-container-form" onSubmit={onSignUp}>
          <Link to="/">
            <div className="login-logo">
              <img src={logo} id="logo" alt="Jot-a-lot logo" />
              <span id="login-txt">Jot-a-lot</span>
              <div>
                <p>Your ideas, captured and organized</p>
              </div>
            </div>
          </Link>
          <div>
            <div className="form-field">
              <label>Username</label>
              <input
                type="text"
                name="username"
                onChange={updateUsername}
                value={username}
              ></input>
            </div>
            <div className="form-field">
              <label>Email</label>
              <input
                type="text"
                name="email"
                onChange={updateEmail}
                value={email}
              ></input>
            </div>
            <div className="form-field">
              <label>Password</label>
              <input
                type="password"
                name="password"
                onChange={updatePassword}
                value={password}
              ></input>
            </div>
            <div className="form-field">
              <label>Confirm Password</label>
              <input
                type="password"
                name="repeat_password"
                onChange={updateRepeatPassword}
                value={repeatPassword}
              ></input>
            </div>
          </div>

          <div className="error-form">
            {errors.map((error, ind) => (
              <div key={ind}>*{error}</div>
            ))}
          </div>
          <div className="login-btn">
            <button type="submit">Sign Up</button>
          </div>
          <div className="login-bottom">
            <p>Already have an account? </p>
            <Link to="/login">Log in here!</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
