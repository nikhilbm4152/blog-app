import React, { useContext, useRef } from "react";
import { Context } from "../../Context/context";
import axios from "axios";
import "./Login.css";

const Login = () => {
  const passwordRef = useRef();
  const userRef = useRef();
  const { dispatch, isFetching } = useContext(Context);

  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", {
        email: userRef.current.value,
        password: passwordRef.current.value,
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
    } catch (error) {
      dispatch({ type: "LOGIN_FAILURE" });
    }
  };

  return (
    <div className="login">
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={loginSubmitHandler}>
        <label>Username</label>
        <input
          type="text"
          placeholder="Enter Your Username....."
          ref={userRef}
        ></input>
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter Your Password....."
          ref={passwordRef}
        ></input>
        <button className="loginButton" type="submit" disabled={isFetching}>
          Login
        </button>
      </form>
      <button className="loginRegisterButton">Register</button>
    </div>
  );
};

export default Login;
