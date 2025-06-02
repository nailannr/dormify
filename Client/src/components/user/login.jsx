import React from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate successful login
    navigate("/user/home");
  }

  return (
    <div className="auth-container">
      <img src="/sust-logo.png" alt="SUST Logo" className="logo" />
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" required />
        <input type="password" placeholder="Password" required />
        <button type="submit">Log In</button>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/user/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
