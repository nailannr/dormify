import React from "react";
import { useNavigate } from "react-router-dom";
import "./seatCancel.css";

export default function SeatCancellation() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate successful cancellation
    navigate("/user/home");
  }

  return (
    <div className="cancel-container">
      <h2>Seat Cancellation</h2>
      <form onSubmit={handleSubmit}>
        <label>Registration Number</label>
        <input type="text" required />
        <button type="submit">Cancel Seat</button>
      </form>
    </div>
  );
}
