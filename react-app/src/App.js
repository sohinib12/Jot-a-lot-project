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
      <SideBar />
      <Switch>
        <Route path="/" exact={true}>
          <Home />
        <Route path="/login">
          <LoginForm />
        </Route>
        </Route>
        <Route path="/sign-up">
          <SignUpForm />
        </Route>
        {/* <Route path="/">
          <SplashLanding />
        </Route> */}
        <Route path="/login">
          <LoginForm />
        </Route>
        <ProtectedRoute path="/notes">
          <Notes />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
