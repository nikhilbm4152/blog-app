import axios from "axios";
import React, { useState } from "react";
import "./Register.css";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  // const enteredUsername = (event) => {
  //   setUserName(event.target.value);
  // };
  // console.log(userName);

  const registrationForm = async (event) => {
    setError(false);
    event.preventDefault();
    try {
      const res = await axios.post("/auth/register", {
        username: userName,
        email,
        password,
      });
      console.log("res");
      res.data && window.location.replace("/login");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="register">
      <span className="registerTitle">Register</span>
      <form className="registerForm" onSubmit={registrationForm}>
        <label>UserName</label>
        <input
          type="text"
          placeholder="Enter Your UserName....."
          // onChange={enteredUsername}
          onChange={(e) => setUserName(e.target.value)}
        ></input>
        <label>Email</label>
        <input
          type="text"
          placeholder="Enter Your Email....."
          onChange={(e) => setEmail(e.target.value)}
        ></input>
        <label>Password</label>
        <input
          type="text"
          placeholder="Enter Your Password....."
          onChange={(e) => setPassword(e.target.value)}
        ></input>
        <button className="registerButton" type="submit">
          Register
        </button>
      </form>
      <button className="registerLoginButton">Legister</button>
      {error && <span className="reg_error">something went wrong!! </span>}
    </div>
  );
};

export default Register;
