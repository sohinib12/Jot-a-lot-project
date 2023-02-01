import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { signUp } from "../../store/session";
import bg from "../../images/login_bg.jpg";
import logo from "../../images/navbar_logo1.png";
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
      const data = await dispatch(signUp(username, email, password));
      if (data) {
        setErrors(data);
      } else {
        setErrors(["passwords don't match"]);
      }
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
      <form onSubmit={onSignUp}>
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
          <div>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={updateUsername}
              value={username}
            ></input>
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              name="email"
              onChange={updateEmail}
              value={email}
            ></input>
          </div>
          <div>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={updatePassword}
              value={password}
            ></input>
          </div>
          <div>
            <label>Confirm Password</label>
            <input
              type="password"
              name="repeat_password"
              onChange={updateRepeatPassword}
              value={repeatPassword}
              required={true}
            ></input>
          </div>
          <button type="submit">Sign Up</button>
        </div>

        <div className="error-form">
          {errors.map((error, ind) => (
            <div key={ind}>*{error}</div>
          ))}
        </div>
        <div>
          <p>Already have an account? </p>
          <Link to="/login">Log in here!</Link>
        </div>
      </form>
      <img src={bg} id="login-bg" alt="login background" />
    </div>
  );
};

export default SignUpForm;
