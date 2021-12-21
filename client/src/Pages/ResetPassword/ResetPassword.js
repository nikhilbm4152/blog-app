import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./ResetPassword.css";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [conformedPass, setConformedPass] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const location = useLocation();
  const path = location.pathname.split("/")[2];
  console.log(path);

  const resetPasswordForm = async (event) => {
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
      const res = await axios.put("/auth/resetpassword/" + path, {
        password,
      });
      setSuccess(res);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="ResetPassword">
      {success ? (
        <span className="ResetPasswordForm">
          Password Reset was SUCCESSFUL. Please Click hear to{" "}
          <Link to="/Login">LOGIN</Link>
        </span>
      ) : (
        <form className="ResetPasswordForm" onSubmit={resetPasswordForm}>
          <span className="ResetPasswordTitle">Reset Password</span>
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
          <button className="ResetPasswordButton" type="submit">
            Submit
          </button>
          {error && <span className="reg_error">{error}</span>}
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
