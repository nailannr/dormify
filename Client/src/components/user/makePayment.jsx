import React from "react";
import { useNavigate } from "react-router-dom";
import "./makePayment.css";

export default function MakePayment() {
  const navigate = useNavigate();

  function handlePayment() {
    // Simulate payment success
    navigate("/user/home");
  }

  return (
    <div className="payment-container">
      <h2>Make Payment</h2>
      <div className="payment-details">
        <p><b>Name:</b> John Doe</p>
        <p><b>Reg num:</b> 20201234</p>
        <p><b>Dept:</b> CSE</p>
        <p><b>Room Number:</b> 101</p>
        <p><b>Session:</b> 2020-21</p>
      </div>
      <div className="payment-methods">
        <p>Make payment with:</p>
        <button className="method" onClick={handlePayment}>bKash</button>
        <button className="method" onClick={handlePayment}>Nagad</button>
        <button className="method" onClick={handlePayment}>Rocket</button>
      </div>
    </div>
  );
}
