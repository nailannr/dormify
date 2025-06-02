import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <nav className="user-nav">
        <button onClick={() => navigate("/user/bookseat")}>Book a Seat</button>
        <button onClick={() => navigate("/user/AvailableSeat")}>Available Seats</button>
        <button onClick={() => navigate("/user/hallNotice")}>Hall Notice</button>
        <button onClick={() => navigate("/user/seatCancel")}>Seat Cancellation</button>
        <button onClick={() => navigate("/user/update")}>Update</button>
        <button onClick={() => navigate("/user/complainBox")}>Complain Box</button>
      </nav>
      <div className="welcome">
        <h2>Welcome to SUST Hall Admission Portal</h2>
        <p>Select an option from the menu above.</p>
      </div>
    </div>
  );
}
