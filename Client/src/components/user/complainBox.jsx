import React from "react";
import { useNavigate } from "react-router-dom";

export default function ComplainBox() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/user/home");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 via-blue-50 to-green-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-pink-700 mb-4 text-center">Complain Box</h2>
        <label className="block font-semibold">Your Complaint</label>
        <textarea rows="5" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-pink-400 resize-vertical" />
        <button type="submit" className="w-full py-2 bg-pink-600 text-white rounded-lg font-semibold hover:bg-pink-700 transition">Submit</button>
      </form>
    </div>
  );
}
