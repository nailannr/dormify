import React from "react";
import { useNavigate } from "react-router-dom";
import "./ComplainBox.css";

export default function ComplainBox() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate successful complaint submission
    navigate("/user/home");
  }

  return (
    <div className="complain-container">
      <h2>Complain Box</h2>
      <form onSubmit={handleSubmit}>
        <label>Your Complaint</label>
        <textarea rows="5" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
