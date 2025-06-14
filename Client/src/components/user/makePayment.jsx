import React from "react";
import { useNavigate } from "react-router-dom";

export default function MakePayment() {
  const navigate = useNavigate();
  function handlePayment() {
    navigate("/user/home");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-green-50 to-blue-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md text-center">
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Make Payment</h2>
        <div className="mb-6 text-left">
          <p><b>Name:</b> John Doe</p>
          <p><b>Reg num:</b> 20201234</p>
          <p><b>Dept:</b> CSE</p>
          <p><b>Room Number:</b> 101</p>
          <p><b>Session:</b> 2020-21</p>
        </div>
        <div className="space-x-4">
          <button className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600" onClick={handlePayment}>bKash</button>
          <button className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600" onClick={handlePayment}>Nagad</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handlePayment}>Rocket</button>
        </div>
      </div>
    </div>
  );
}
