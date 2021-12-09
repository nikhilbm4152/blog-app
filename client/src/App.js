import React, { useContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import TopBar from "./Components/topbar/TopBar";
// import { Context } from "./Context/context";
import blogContext from "./Context/Context-context";
import Categories from "./Pages/Categories/Categories";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import ProfileSetting from "./Pages/ProfileSetting/ProfileSetting";
import Register from "./Pages/Register/Register";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Single from "./Pages/Single/Single";
import Write from "./Pages/Write/Write.jsx";

function App() {
  const { user } = useContext(blogContext);
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
        <Route path="/ForgotPassword">
          <ForgotPassword />
        </Route>
        <Route path="/resetpassword/:resetToken">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
