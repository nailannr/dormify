import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sustLogo from "../../assets/sustLogo.png";

export default function Home() {
  const navigate = useNavigate();
  const [selectedHall, setSelectedHall] = useState("");

  const handleGo = () => {
    if (selectedHall === "first") navigate("/user/BookSeat1");
    else if (selectedHall === "second") navigate("/user/BookSeat2");
    else if (selectedHall === "third") navigate("/user/BookSeat3");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-purple-100 flex flex-col items-center">
      <img src={sustLogo} alt="SUST Logo" className="w-24 mt-10 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-6">SUST Hall Admission Portal</h1>
      <nav className="grid grid-cols-2 gap-4 w-full max-w-xl mb-10">
        <div className="col-span-2 flex items-center justify-center gap-2">
          <select
            className="w-64 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            value={selectedHall}
            onChange={e => setSelectedHall(e.target.value)}
          >
            <option value="">Book a Seat (Select Hall)</option>
            <option value="first">First Ladies Hall</option>
            <option value="second">Second Ladies Hall</option>
            <option value="third">Third Ladies Hall</option>
          </select>
          <button
            className={`px-4 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 transition ${!selectedHall && "opacity-50 cursor-not-allowed"}`}
            onClick={handleGo}
            disabled={!selectedHall}
          >
            Go
          </button>
        </div>
        <button onClick={() => navigate("/user/AvailableSeat")} className="bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700 transition">Available Seats</button>
        <button onClick={() => navigate("/user/hallNotice")} className="bg-purple-600 text-white py-3 rounded-lg shadow hover:bg-purple-700 transition">Hall Notice</button>
        <button onClick={() => navigate("/user/seatCancel")} className="bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700 transition">Seat Cancellation</button>
        <button onClick={() => navigate("/user/update")} className="bg-yellow-500 text-white py-3 rounded-lg shadow hover:bg-yellow-600 transition">Update</button>
        <button onClick={() => navigate("/user/complainBox")} className="bg-pink-600 text-white py-3 rounded-lg shadow hover:bg-pink-700 transition">Complain Box</button>
      </nav>
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg text-center">
        <h2 className="text-xl font-semibold mb-2">Welcome!</h2>
        <p>Select an option above to continue.</p>
      </div>
    </div>
  );
}
