import React, { useRef, useEffect, useState } from "react";
import sustLogo from "../../assets/sustLogo.png";
import API from '../../api';

export default function ComplainBox() {
  const phoneNumbers = [
    "Ambulance: 01712-345678",
    "CNG: 01812-345678",
    "Plumber: 01912-345678",
    "Electrician: 01612-345678"
  ];
  const formRef = useRef();
  const [submittedComplaints, setSubmittedComplaints] = useState([]);

  async function fetchMyComplaints() {
    try {
      const token = localStorage.getItem('token');
      const res = await API.get('/complaint/mine', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubmittedComplaints(res.data || []);
    } catch (err) {
      console.error("Failed to fetch user's complaints:", err);
    }
  }

  useEffect(() => {
    fetchMyComplaints();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const subject = formRef.current.querySelector("input[name='subject']").value.trim();
    const description = formRef.current.querySelector("textarea").value.trim();

    if (!subject || subject.length > 100) return alert("Subject is required and must be under 100 characters.");
    if (!description) return alert("Please enter your complaint.");

    try {
      const token = localStorage.getItem('token');
      await API.post('/complaint', { subject, description }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      formRef.current.reset();
      alert("Your complaint has been submitted. Thank you!");
      fetchMyComplaints(); // Refresh list
    } catch (err) {
      console.error("Complaint submission failed:", err);
      alert("Failed to submit complaint. Please try again.");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 flex flex-col">
      {/* Top Scrolling Contact Bar */}
      <div className="w-full bg-emerald-700 py-2 overflow-hidden relative">
        <div className="absolute left-0 top-0 w-full h-full flex items-center">
          <marquee behavior="scroll" direction="left" scrollamount="7" className="text-white font-semibold text-base tracking-wide">
            {phoneNumbers.join("   •   ")}
          </marquee>
        </div>
      </div>

      {/* Logo */}
      <div className="absolute top-6 left-8 flex items-center space-x-3 z-10">
        <img src={sustLogo} alt="SUST Logo" className="w-14 h-14 drop-shadow-xl" />
        <span className="text-2xl font-extrabold text-emerald-700 font-serif tracking-wide">Dormify</span>
      </div>

      {/* Complaint Form */}
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

          <label className="w-full font-semibold mb-1 text-emerald-700">Complaint Subject</label>
          <input
            type="text"
            name="subject"
            maxLength={100}
            required
            placeholder="Short title for your issue (e.g., Water Leakage)"
            className="w-full px-4 py-3 border border-emerald-200 rounded-lg focus:ring-2 focus:ring-emerald-400 mb-6 text-lg"
          />

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

      {/* Display Submitted Complaints */}
      <div className="px-6 pb-12">
        <h3 className="text-xl font-semibold text-emerald-800 mb-4">Your Submitted Complaints</h3>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {submittedComplaints.map((c) => (
                <tr key={c._id}>
                  <td className="px-6 py-4 text-sm text-gray-900">{c.subject}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{c.description}</td>
                  <td className="px-6 py-4 text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      c.status === 'Resolved'
                        ? 'bg-green-100 text-green-800'
                        : c.status === 'In Progress'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {submittedComplaints.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center px-6 py-4 text-gray-500">
                    No complaints submitted yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
