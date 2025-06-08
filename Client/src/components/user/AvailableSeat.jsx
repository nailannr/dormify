import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 via-green-50 to-purple-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">Available Seats</h2>
        <table className="min-w-full border">
          <thead>
            <tr className="bg-blue-100">
              <th className="py-2 px-4 border">Reg. Number</th>
              <th className="py-2 px-4 border">Department</th>
              <th className="py-2 px-4 border">Room Number</th>
              <th className="py-2 px-4 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {seats.map((seat, idx) => (
              <tr key={idx} className="hover:bg-blue-50">
                <td className="py-2 px-4 border">{seat.reg}</td>
                <td className="py-2 px-4 border">{seat.dept}</td>
                <td className="py-2 px-4 border">{seat.room}</td>
                <td className="py-2 px-4 border">
                  <button className="bg-green-600 text-white px-4 py-1 rounded hover:bg-green-700" onClick={handlePayment}>
                    Make Payment
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
