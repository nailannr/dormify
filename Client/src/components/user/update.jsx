import React from "react";
import { useNavigate } from "react-router-dom";
import "./update.css";

export default function Update() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate successful update
    navigate("/user/home");
  }

  return (
    <div className="update-container">
      <h2>Update Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" />
        <label>Department</label>
        <input type="text" />
        <label>Contact</label>
        <input type="text" />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
