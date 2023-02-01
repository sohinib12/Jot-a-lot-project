import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory, Link } from "react-router-dom";
import { login } from "../../store/session";
import bg from '../../images/login_bg.jpg';
import logo from "../../images/navbar_logo1.png";
import "./auth.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password)).then((data) => {
      if (data) {
        setErrors(data);
      } else {
        setErrors([]);
        history.push("/home");
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
    return <Redirect to="/home" />;
  }

  return (
    <div className="login-container">
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
      <div className="login-box">
        <label htmlFor="email" className="credentials">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div>
        <label htmlFor="password" className="credentials">Password</label>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button type="submit" className="login-btn">Login</button>
      </div>
      <div className="error-form" >
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
    <img src={bg} id="login-bg" alt="login background" />
    </div>

  );
};

export default LoginForm;
