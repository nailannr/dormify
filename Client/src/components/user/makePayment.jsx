import React from "react";
import sustLogo from "../../assets/sustLogo.png";
import bkashLogo from "../../assets/bkashlogo.png"; // Use the official bKash logo

export default function MakePayment() {
  // Example student info (replace with your real data/props)
  const student = {
    name: "Jannatul Ferdous",
    reg: "20201234",
    dept: "Computer Science & Engineering",
    session: "2020-21",
    hall: "First Ladies Hall",
    room: "101"
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 px-2">
      <div className="w-full max-w-lg bg-white bg-opacity-95 rounded-3xl shadow-2xl p-10 flex flex-col items-center">
        {/* Logo & Site Name */}
        <img src={sustLogo} alt="SUST Logo" className="w-20 mb-2 drop-shadow-xl" />
        <h2 className="text-2xl font-extrabold text-emerald-700 mb-6 tracking-wide font-serif">Dormify</h2>

        {/* Student Info */}
        <div className="w-full bg-emerald-50 border-l-8 border-emerald-500 rounded-xl p-6 mb-8 shadow flex flex-col gap-2">
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-gray-700">Name:</span>
            <span className="text-gray-800">{student.name}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-gray-700">Registration No:</span>
            <span className="text-gray-800">{student.reg}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-gray-700">Department:</span>
            <span className="text-gray-800">{student.dept}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-gray-700">Session:</span>
            <span className="text-gray-800">{student.session}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-gray-700">Hall Name:</span>
            <span className="text-gray-800">{student.hall}</span>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <span className="font-semibold text-gray-700">Room Number:</span>
            <span className="text-gray-800">{student.room}</span>
          </div>
        </div>

        {/* Payment Message */}
        <div className="bg-emerald-100 rounded-lg p-4 mb-8 w-full text-center text-emerald-800 font-medium shadow">
          Please proceed to make your hall seat payment securely using bKash. Your seat will be confirmed once the payment is successful. <br />
          <span className="text-sm text-gray-500">If you face any issue, contact the hall office immediately.</span>
        </div>

        {/* bKash Payment Button */}
        <button
          className="flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#E2136E] text-white text-lg font-bold shadow-lg hover:bg-[#c80b5d] transition-all duration-200 active:scale-95"
          style={{ minWidth: 220 }}
        >
          <img src={bkashLogo} alt="bKash" className="w-8 h-8" />
          Pay with bKash
        </button>
      </div>
    </div>
  );
}
