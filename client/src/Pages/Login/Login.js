import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import "./Login.css";
import blogContext from "../../Context/Context-context";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loginStart, loginSuccess, loginFalure } = useContext(blogContext);

  console.log(email);
  const loginSubmitHandler = async (event) => {
    event.preventDefault();
    loginStart();
    try {
      const res = await axios.post("/auth/login", {
        email: email,
        password: password,
      });
      console.log(res);
      loginSuccess(res.data);
    } catch (error) {
      loginFalure();
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="login">
      <form className="loginForm" onSubmit={loginSubmitHandler}>
        <span className="loginTitle">LOGIN</span>
        <label>Email :</label>
        <input
          type="email"
          required
          placeholder="Enter Your Email....."
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password :</label>
        <input
          type="password"
          required
          placeholder="Enter Your Password....."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <span>
          Did You <Link to="/ForgotPassword">Forgot Password ?</Link>
        </span>
        <button className="loginButton" type="submit">
          Login
        </button>
        <span>
          New User <Link to="/register">REGISTER</Link>
        </span>
        {error && <div className="error_login">{error}</div>}
      </form>
      {/* <button className="loginRegisterButton">Register</button> */}
    </div>
  );
};

export default Login;
