import React from "react";
import { useNavigate } from "react-router-dom";

export default function HallNotice() {
  const navigate = useNavigate();
  const notices = [
    "Hall will be closed on 10th June for maintenance.",
    "New seat allocation results published.",
  ];
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-green-50">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-purple-700 mb-4 text-center">Hall Notices</h2>
        <ul className="list-disc pl-6 mb-6">
          {notices.map((notice, idx) => (
            <li key={idx} className="mb-2">{notice}</li>
          ))}
        </ul>
        <button className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700" onClick={() => navigate("/user/home")}>Back to Home</button>
      </div>
    </div>
  );
}
