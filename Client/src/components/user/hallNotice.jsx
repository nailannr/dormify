import React from "react";
import { useNavigate } from "react-router-dom";
import "./hallNotice.css";

export default function HallNotice() {
  const navigate = useNavigate();
  const notices = [
    "Hall will be closed on 10th June for maintenance.",
    "New seat allocation results published.",
  ];

  return (
    <div className="notice-container">
      <h2>Hall Notices</h2>
      <ul>
        {notices.map((notice, idx) => (
          <li key={idx}>{notice}</li>
        ))}
      </ul>
      <button style={{marginTop: "20px"}} onClick={() => navigate("/user/home")}>Back to Home</button>
    </div>
  );
}
