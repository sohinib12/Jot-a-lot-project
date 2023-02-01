import React from "react";
import { Link } from "react-router-dom";
import { login } from "../../store/session";
import Evernote_splash_page from "../images/Evernote_splash_page.png";
import logo_512x512 from "../images/logo_512x512.png";
// import NavBar from "../NavBar";
import "./splash.css";

export default function SplashLanding() {
  return (
    <div className="splash-container">
      <div className="splash-nav">
        <div className="nav-header">
          <div>
            {" "}
            <img src={logo_512x512} id="logo" alt="logo" />
          </div>
          <div className="splash-name">
            <h2>Jot-a-lot</h2>
          </div>
        </div>
        <div className="splash-login">
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
      <div className="splash-top">
        <h1>Tame your work, organize your life</h1>
        <h2>
          Remember everything and accomplish anything with the best notes app
          for tackling projects.
          <br />
          Keep your notes, tasks, and schedule all in one place.
        </h2>
        <Link to="/sign-up">
          <button className="splash-sign-up">Sign up for free</button>
        </Link>
        <Link to="/login">
          <p>Already have an account? Log in</p>
        </Link>
      </div>
      <div className="splash-body">
        <div className="evernote-img">
          <img src={Evernote_splash_page} id="splash-img" alt="Splash Image" />{" "}
        </div>
        <div className="splash-text">
          <div className="splash-txt-1">
            <h3>WORK ANYWHERE</h3>
            <h5>Access your notes from anywhere, on any device</h5>
          </div>
          <div className="splash-txt-2">
            <h3>REMEMBER EVERYTHING</h3>
            <h5>
              Keep track of your ideas, to-dos, and inspiration in one place
            </h5>
          </div>
          <div className="splash-txt-3">
            <h3>TURN TO-DO INTO DONE</h3>
            <h5>Stay on top of your to-dos with reminders and due dates</h5>
          </div>
          <div className="splash-txt-4">
            <h3>FIND THINGS FAST</h3>
            <h5>Search for notes, notebooks, and tags to find what you need</h5>
          </div>
        </div>
      </div>

      <footer className="splash-footer">
        <div className="leftside-footer">Evernote clone by Sohini Bonthala</div>
        <div className="rightside-footer">
          <a
            className="link-footer"
            href="https://www.linkedin.com/in/sohini-bonthala-9373b2111/"
          >
            <i
              className="fa-brands fa-linkedin fa-xl"
              href="https://github.com/sohinib12"
            />
          </a>
          <a className="link-footer">
            <i className="fa-brands fa-github fa-xl" />
          </a>
        </div>
      </footer>
    </div>
  );
}
