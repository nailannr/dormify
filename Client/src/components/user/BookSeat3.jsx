import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import sustLogo from "../../assets/sustLogo.png";
import HallSlideshowBg from "./HallSlideShowBg";


import first1 from "../../assets/hall1jpg.jpg";
import first2 from "../../assets/hall2.jpg";
import first3 from "../../assets/hall3.jpg";

const departments = [
  "Architecture", "Chemical Engineering & Polymer Science", "Civil & Environmental Engineering", "Computer Science & Engineering", "Electrical & Electronic Engineering", "Food Engineering & Tea Technology", "Industrial & Production Engineering", "Mechanical Engineering", "Petroleum & Mining Engineering",
  "Genetic Engineering & Biotechnology", "Biochemistry & Molecular Biology", "Chemistry", "Geography & Environment", "Mathematics", "Physics", "Statistics", "Forestry & Environmental Science",
  "Bangla", "Economics", "English", "Political Studies", "Public Administration", "Social Work", "Sociology",
  "Business Administration"
];

export default function BookSeat3() {
  const navigate = useNavigate();
  const photoRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    navigate("/user/AvailableSeat");
  }

  const images = [first1, first2, first3];

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
  
      <HallSlideshowBg images={images} />

      
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-2xl space-y-6 border border-green-100"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={sustLogo} alt="SUST Logo" className="w-20 mb-2" />
          <h2 className="text-3xl font-bold text-green-700 mb-1">Apply For A Seat - Begum Fazilatunnessa Mujib Ladies Hall</h2>
          <p className="text-gray-500 text-sm">Please fill in all the information accurately.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Registration Number</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Department</label>
            <select required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400">
              <option value="">Select Department</option>
              {departments.map(dep => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Session</label>
            <input type="text" required placeholder="e.g. 2020-21" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Year</label>
            <select required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400">
              <option value="">Select</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Semester</label>
            <select required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400">
              <option value="">Select</option>
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Hall Name</label>
            <input type="text" required value="First Ladies Hall" readOnly className="w-full px-4 py-2 border rounded-lg bg-gray-100" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Phone Number</label>
            <input type="tel" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Email</label>
            <input type="email" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">CGPA</label>
            <input type="number" step="0.01" min="0" max="4" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Father's Profession</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Mother's Profession</label>
            <input type="text" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Father's Yearly Income (BDT)</label>
            <input type="number" min="0" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div>
            <label className="block font-semibold mb-1">Mother's Yearly Income (BDT)</label>
            <input type="number" min="0" required className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Address</label>
            <textarea required rows={2} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Upload Photo</label>
            <input type="file" accept="image/*" ref={photoRef} className="w-full px-4 py-2 border rounded-lg bg-gray-50" />
          </div>
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Notes (max 200 words)</label>
            <textarea required rows={4} maxLength={200*6} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400" />
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="mt-4 px-8 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:scale-105 hover:from-green-600 hover:to-blue-600 transition-all duration-200"
          >
            Apply for Seat
          </button>
        </div>
      </form>
    </div>
  );
}
