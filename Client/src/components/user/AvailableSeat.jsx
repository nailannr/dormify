import React from "react";
import { useNavigate } from "react-router-dom";
import "./AvailableSeat.css";

export default function AvailableSeats() {
  const navigate = useNavigate();
  const seats = [
    { reg: "20201234", dept: "CSE", room: "101" },
    { reg: "20204567", dept: "EEE", room: "102" },
  ];

  function handlePayment() {
    navigate("/user/makePayment");
  }

  return (
    <div className="table-container">
      <h2>Available Seats</h2>
      <table>
        <thead>
          <tr>
            <th>Reg. Number</th>
            <th>Department</th>
            <th>Room Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {seats.map((seat, idx) => (
            <tr key={idx}>
              <td>{seat.reg}</td>
              <td>{seat.dept}</td>
              <td>{seat.room}</td>
              <td>
                <button className="pay-btn" onClick={handlePayment}>
                  Make Payment
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
