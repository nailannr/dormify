import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import sustLogo from "../../assets/sustLogo.png";

export default function Home() {
  const navigate = useNavigate();
  const [selectedHall, setSelectedHall] = useState("");

  const handleGo = () => {
    if (selectedHall === "dorm1") navigate("/user/BookSeat1");
    else if (selectedHall === "dorm2") navigate("/user/BookSeat2");
    else if (selectedHall === "dorm3") navigate("/user/BookSeat3");
  };

  const handleLogout = () => {
    const confirmed = window.confirm("Are you sure you want to log out?");
    if (confirmed) {
      localStorage.removeItem("token");
      navigate("/user/login");
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 flex flex-col md:flex-row">
      {/* ✅ Header Bar */}
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 flex justify-between items-center px-6 py-3">
        <div className="text-lg font-semibold text-emerald-700">Dormify - Student Portal</div>
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      {/* Left: Logo, Dormify, Dashboard */}
      <main className="mt-20 md:w-1/2 w-full flex flex-col items-center justify-center px-4 py-12">
        <div className="flex flex-col items-center w-full max-w-xl">
          <img
            src={sustLogo}
            alt="SUST Logo"
            className="w-28 mb-2 drop-shadow-xl"
          />
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-8 tracking-wide font-serif">
            Dormify
          </h2>
          <div className="w-full bg-white rounded-2xl shadow-2xl p-8">
            <div className="space-y-6">
              <div className="flex gap-2">
                <select
                  className="flex-1 px-4 py-3 rounded-full border border-emerald-300 focus:ring-2 focus:ring-emerald-500 text-base"
                  value={selectedHall}
                  onChange={e => setSelectedHall(e.target.value)}
                >
                  <option value="">Book a Seat (Select Hall)</option>
                  <option value="dorm1">First Ladies Hall</option>
                  <option value="dorm2">Second Ladies Hall</option>
                  <option value="dorm3">Third Ladies Hall</option>
                </select>
                <button
                  className={`px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md transition hover:bg-emerald-800 active:scale-95 ${!selectedHall && "opacity-50 cursor-not-allowed"}`}
                  onClick={handleGo}
                  disabled={!selectedHall}
                >
                  Go
                </button>
              </div>
              <button
                className="w-full px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md transition hover:bg-emerald-800 active:scale-95"
                onClick={() => navigate("/user/ApplicationStatus")}
              >
                Application Status
              </button>
              <button
                className="w-full px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md transition hover:bg-emerald-800 active:scale-95"
                onClick={() => navigate("/user/hallNotice")}
              >
                Hall Notice
              </button>
              <button
                className="w-full px-6 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md transition hover:bg-emerald-800 active:scale-95"
                onClick={() => navigate("/user/complainBox")}
              >
                Complain Box
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Right: Welcome message */}
      <aside className="md:w-1/2 w-full flex items-center justify-center px-6 py-12 mt-20 md:mt-0">
        <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-10 max-w-md w-full flex flex-col items-center">
          <h2 className="text-3xl font-extrabold text-emerald-700 mb-4 font-serif tracking-wide">
            Welcome to Dormify!
          </h2>
          <p className="text-lg text-gray-700 text-center leading-relaxed">
            This is the official SUST Hall Admission Portal. <br /><br />
            <span className="font-semibold text-emerald-700">
              Book your seat, check your application status, stay updated with hall notices, and let your voice be heard through the complain box—all in one place.
            </span>
          </p>
        </div>
      </aside>
    </div>
  );
}
