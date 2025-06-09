import React, { useRef } from "react";
import sustLogo from "../../assets/sustLogo.png";

export default function ComplainBox() {
  const phoneNumbers = [
    "Ambulance: 01712-345678",
    "CNG: 01812-345678",
    "Plumber: 01912-345678",
    "Electrician: 01612-345678"
  ];
  const formRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    // Here you might send the complaint to your backend
    if (formRef.current) formRef.current.reset();
    alert("Your complaint has been submitted. Thank you!");
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 flex flex-col">
      {/* Top Bar with Scrolling Numbers */}
      <div className="w-full bg-emerald-700 py-2 overflow-hidden relative">
        <div className="absolute left-0 top-0 w-full h-full flex items-center">
          <marquee behavior="scroll" direction="left" scrollamount="7" className="text-white font-semibold text-base tracking-wide">
            {phoneNumbers.join("   •   ")}
          </marquee>
        </div>
      </div>

      {/* Logo and Dormify Name at Top-Left */}
      <div className="absolute top-6 left-8 flex items-center space-x-3 z-10">
        <img src={sustLogo} alt="SUST Logo" className="w-14 h-14 drop-shadow-xl" />
        <span className="text-2xl font-extrabold text-emerald-700 font-serif tracking-wide">Dormify</span>
      </div>

      {/* Centered Complain Box */}
      <div className="flex flex-1 items-center justify-center px-4 py-12">
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-95 rounded-3xl shadow-2xl p-12 w-full max-w-2xl flex flex-col items-center"
        >
          <h2 className="text-3xl font-bold text-emerald-700 mb-6 text-center">Complain Box</h2>
          <p className="text-gray-600 text-center mb-8 max-w-xl">
            If you are facing any problem in your hall or with any service, please let us know. Your feedback helps us improve your campus experience.
          </p>
          <label className="w-full font-semibold mb-1 text-emerald-700">Your Complaint</label>
          <textarea
            required
            rows={7}
            placeholder="Describe your issue in detail..."
            className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 mb-6 resize-vertical text-lg"
          />
          <button
            type="submit"
            className="w-full px-8 py-3 rounded-full bg-emerald-700 text-white font-semibold shadow-md text-lg transition hover:bg-emerald-800 active:scale-95"
          >
            Submit Complaint
          </button>
        </form>
      </div>
    </div>
  );
}
