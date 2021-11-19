import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TopBar from "./Components/topbar/TopBar";
import { Context } from "./Context/context";
import Categories from "./Pages/Categories/Categories";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProfileSetting from "./Pages/ProfileSetting/ProfileSetting";
import Register from "./Pages/Register/Register";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write.jsx";

function App() {
  const { user } = useContext(Context);
  return (
    <Router>
      <TopBar />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/register">{user ? <Home /> : <Register />}</Route>
        <Route path="/Login">{user ? <Home /> : <Login />}</Route>
        <Route path="/Write">{user ? <Write /> : <Register />}</Route>
        <Route path="/ProfileSetting">
          {user ? <ProfileSetting /> : <Register />}
        </Route>
        <Route path="/Categories">
          <Categories />
        </Route>
        <Route path="/Post/:Postid">
          <Single />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
