import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { login } from "../../store/session";
import bg from "./login_bg.jpg";
import logo from "./navbar_logo1.png";
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  console.log("i am here");
  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then((data) => {
      if (data) {
        setErrors(data);
      } else {
        setErrors([]);
        history.push("/");
      }
    });
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const demoLogin = () => {
    setEmail("pickle@aa.io");
    setPassword("password");
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <div className="login-form">
        <form className="login-container-form" onSubmit={onLogin}>
          <Link to="/">
            <div className="login-logo">
              <img src={logo} id="logo" alt="Jot-a-lot logo" />
              <span id="login-logo-title">Jot-a-lot</span>
              <div>
                <p>Your ideas, captured and organized</p>
              </div>
            </div>
          </Link>
          <div className="form-field">
            <label htmlFor="email" className="credentials">
              Email
            </label>
            <input
              name="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={updateEmail}
            />
          </div>
          <div className="form-field">
            <label htmlFor="password" className="credentials">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </div>
          <div className="error-form">
            {errors.map((error, ind) => (
              <div key={ind}>{error}</div>
            ))}
          </div>
          <div className="login-bottom">
            <p>Don't have an account ?</p>
            <Link to="/sign-up">Create account</Link>
            <p>or</p>
            <button type="submit" onClick={demoLogin} className="demo-btn">
              Demo User
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
