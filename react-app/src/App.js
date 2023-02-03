import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import { authenticate } from "./store/session";
import Notes from "./components/Notes";
import Home from "./components/HomePage/index";
import SideBar from "./components/Sidebar";
import SplashLanding from "./components/SplashLanding";
import SingleNoteView from "./components/HomePage/singleNoteView";
import NoteBook from "./components/Notebook";
import UnderDevelopment from "./components/404Page/index.js";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      {/* <NavBar /> */}
      <Switch>
        <Route path="/login" exact={true}>
          <SplashLanding />
        </Route>
        <Route path="/login-page">
          <LoginForm />
        </Route>
        <ProtectedRoute path="/" exact={true}>
          <div id="main-components-container">
            <SideBar />
            <Home />
          </div>
        </ProtectedRoute>
        <Route path="/sign-up">
          <SignUpForm />
        </Route>
        {/* <ProtectedRoute path="/notebook">
          <NoteBook />
        </ProtectedRoute> */}
        <ProtectedRoute path="/notes/:noteId">
          <div id="main-components-container">
            <SideBar />
            <SingleNoteView />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/notebook/:notebookId">
          <div id="main-components-container">
            <SideBar />
            <Notes />
          </div>
        </ProtectedRoute>
        <ProtectedRoute path="/notebooks">
          <div id="main-components-container">
            <SideBar />
            <NoteBook />
          </div>
        </ProtectedRoute>
        <Route path="*">
          <UnderDevelopment />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
