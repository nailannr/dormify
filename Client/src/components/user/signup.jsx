import React from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";

export default function Signup() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate successful signup
    navigate("/user/home");
  }

  return (
    <div className="auth-container">
      <img src="/sust-logo.png" alt="SUST Logo" className="logo" />
      <h2>Sign Up</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <input type="password" placeholder="Confirm Password" required />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/user/login")}>Log In</span>
        </p>
      </form>
    </div>
  );
}
