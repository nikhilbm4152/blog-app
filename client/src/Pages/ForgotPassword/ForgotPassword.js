import axios from "axios";
import React, { useRef, useState } from "react";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [isSend, setIsSend] = useState(false);
  const [error, setError] = useState("");

  const forgotPassSubmit = async (event) => {
    event.preventDefault();

    try {
      const res = await axios.post("auth/forgotpassword", {
        email: emailRef.current.value,
      });
      res && setIsSend(true);
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 6000);
    }
  };

  return (
    <div className="forgot_Password">
      <form className="forgot_Password_form" onSubmit={forgotPassSubmit}>
        <span className="Forgot_Title">FORGOT PASSWORD</span>
        <p>
          Please enter the email address you register your account with. We will
          send you reset password confirmation to this email
        </p>
        <label>Email :</label>
        <input
          type="email"
          placeholder="Enter Your Email...."
          ref={emailRef}
          required
        />
        <button className="forgot_button">Send</button>
        {isSend && <span className="is_send"> EMAIL IS SENT</span>}
        {error && <div className="error_login">{error}</div>}
      </form>
    </div>
  );
};

export default ForgotPassword;
