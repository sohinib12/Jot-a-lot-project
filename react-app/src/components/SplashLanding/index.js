import React from 'react';
import { Link } from 'react-router-dom';
import evernote_body from "./evernote_body.png";
import './splash.css';


export default function SplashLanding () {
    return (
        <div className="splash-body">
            <h1>Tame your work, organize your life</h1>
            <h2>
                Remember everything and accomplish anything with the best notes app for tackling projects.
                <br />
                Keep your notes, tasks, and schedule all in one place.
            </h2>

            <Link to="/sign-up"><button className="splash-sign-up">Sign up for free</button></Link>
            <Link to="/login"><p>Already have an account? Log in</p></Link>

            <div className="splash-work-anywhere">
                <img src={evernote_body} id=" evernote-body" alt="evernote-body" />
                <div id="right-of-display">
                    <h3>WORK ANYWHERE</h3>
                    <p>
                        Keep important info handy—your notes sync automatically to all your devices.
                    </p>
                    <h3>REMEMBER EVERYTHING</h3>
                    <p>
                        Make notes more useful by adding text, images, audio, scans, PDFs, and documents.
                    </p>
                    <h3>TURN TO-DO INTO DONE</h3>
                    <p>
                        Bring your notes, tasks, and schedules together to get things done more easily.
                    </p>
                    <h3>FIND THINGS FAST</h3>
                    <p>
                        Get what you need, when you need it with powerful, flexible search capabilities.
                    </p>
                </div>
            </div>
        </div>
    )
}
