import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [conformedPass, setConformedPass] = useState("");
  const [error, setError] = useState("");

  const registrationForm = async (event) => {
    event.preventDefault();

    if (password !== conformedPass) {
      setPassword("");
      setConformedPass("");
      setTimeout(() => {
        setError("");
      }, 6000);
      return setError("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/register", {
        username: userName,
        email,
        password,
      });
      console.log("res");
      res.data && window.location.replace("/login");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="register">
      <form className="registerForm" onSubmit={registrationForm}>
        <span className="registerTitle">Register</span>
        <label>UserName :</label>
        <input
          type="text"
          placeholder="Enter Your UserName....."
          required
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label>Email :</label>
        <input
          type="text"
          placeholder="Enter Your Email....."
          required
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password :</label>
        <input
          type="text"
          placeholder="Enter Your Password....."
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <label>Conform Password :</label>
        <input
          type="text"
          placeholder="Enter Your Password....."
          required
          value={conformedPass}
          onChange={(e) => setConformedPass(e.target.value)}
        ></input>
        <button className="registerButton" type="submit">
          Register
        </button>
        <span>
          Existing User Please click to <Link to="/login">LOGIN</Link>
        </span>
        {error && <span className="reg_error">{error}</span>}
      </form>
    </div>
  );
};

export default Register;
