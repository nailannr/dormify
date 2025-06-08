import React from "react";
import { useNavigate } from "react-router-dom";

export default function ApplicationStatus() {
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    navigate("/user/home");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-yellow-50 via-green-50 to-blue-50">
      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-yellow-700 mb-4 text-center">Application Status</h2>
        <label className="block font-semibold">Name</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400" />
        <label className="block font-semibold">Department</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400" />
        <label className="block font-semibold">Contact</label>
        <input type="text" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-yellow-400" />
        <button type="submit" className="w-full py-2 bg-yellow-500 text-white rounded-lg font-semibold hover:bg-yellow-600 transition">Update</button>
      </form>
    </div>
  );
}
