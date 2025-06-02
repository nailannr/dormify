import React from "react";
import { useNavigate } from "react-router-dom";
import "./bookseat.css";

export default function BookSeat() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // Simulate successful seat booking
    navigate("/user/AvailableSeat");
  }

  return (
    <div className="form-container">
      <h2>Book A Seat</h2>
      <form onSubmit={handleSubmit}>
        <label>Name</label>
        <input type="text" required />
        <label>Registration Number</label>
        <input type="text" required />
        <label>Department</label>
        <input type="text" required />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
}
