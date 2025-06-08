import React from "react";
import { useNavigate } from "react-router-dom";

export default function SeatCancellation() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/user/home");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-red-50 via-yellow-50 to-green-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-red-700 mb-4 text-center">Seat Cancellation</h2>
        <label className="block font-semibold">Registration Number</label>
        <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-red-400" />
        <button type="submit" className="w-full py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition">Cancel Seat</button>
      </form>
    </div>
  );
}
