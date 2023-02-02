import React from "react";
import { Link } from "react-router-dom";
import "./404page.css";

export default function UnderDevelopment() {
  return (
    <div className="main-background-404">
      <div id="background-404"></div>
      <div className="top-404">
        <h1>Page Not Found</h1>
        <h3>404</h3>
      </div>
      <div className="container-404">
        <div className="ghost-copy-404">
          <div className="one-404"></div>
          <div className="two-404"></div>
          <div className="three-404"></div>
          <div className="four-404"></div>
        </div>
        <div className="ghost-404">
          <div className="face-404">
            <div className="eye-404"></div>
            <div className="eye-right-404"></div>
            <div className="mouth-404"></div>
          </div>
        </div>
        <div className="shadow-404"></div>
      </div>
      <div className="bottom-404">
        <p>Boo, looks like a ghost is styling this page!</p>
        <div className="link-button-404">
          <Link to="/" className="btn-404">
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
