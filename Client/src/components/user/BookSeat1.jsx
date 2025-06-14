import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import sustLogo from "../../assets/sustLogo.png";
import HallSlideshowBg from "./HallSlideShowBg";

import first1 from "../../assets/hall1jpg.jpg";
import first2 from "../../assets/hall2.jpg";
import first3 from "../../assets/hall3.jpg";

import API from "../../api"

const departments = [
  "Architecture", "Chemical Engineering & Polymer Science", "Civil & Environmental Engineering", "Computer Science & Engineering", "Electrical & Electronic Engineering", "Food Engineering & Tea Technology", "Industrial & Production Engineering", "Mechanical Engineering", "Petroleum & Mining Engineering",
  "Genetic Engineering & Biotechnology", "Biochemistry & Molecular Biology", "Chemistry", "Geography & Environment", "Mathematics", "Physics", "Statistics", "Forestry & Environmental Science",
  "Bangla", "Economics", "English", "Political Studies", "Public Administration", "Social Work", "Sociology",
  "Business Administration"
];

export default function BookSeat1() {
  const navigate = useNavigate();
  const photoRef = useRef(null);
  const images = [first1, first2, first3];

  const [form, setForm] = useState({
    name: "",
    regNo: "",
    department: "",
    session: "",
    year: "",
    semester: "",
    phone: "",
    email: "",
    cgpa: "",
    fatherProfession: "",
    motherProfession: "",
    fatherIncome: "",
    motherIncome: "",
    address: "",
    note: "",
    dorm: "dorm1", // fixed for First Ladies Hall
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    

    for (const key in form) {
      formData.append(key, form[key]);
    }
    if (photoRef.current?.files[0]) {
      formData.append("photo", photoRef.current.files[0]);
    }

    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/application", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert(res.data.message);
      navigate("/user/home");
    } catch (err) {
      console.error(err);
      alert("Submission failed. Please try again.");
    }
  };

  

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Animated background */}
      <HallSlideshowBg images={images} />

      {/* Form content */}
      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-2xl space-y-6 border border-green-100"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={sustLogo} alt="SUST Logo" className="w-20 mb-2" />
          <h2 className="text-3xl font-bold text-green-700 mb-1">Apply for seat - First Ladies Hall</h2>
          <p className="text-gray-500 text-sm">Please fill in all the information accurately.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input name="name" value={form.name} onChange={handleChange} placeholder="Name" required />
          <input name="regNo" value={form.regNo} onChange={handleChange} placeholder="Registration Number" required />
          <select name="department" value={form.department} onChange={handleChange} required>
            <option value="">Select Department</option>
            {departments.map(dep => <option key={dep} value={dep}>{dep}</option>)}
          </select>
          <input name="session" value={form.session} onChange={handleChange} placeholder="e.g. 2020-21" required />
          <select name="year" value={form.year} onChange={handleChange} required>
            <option value="">Select Year</option>
            <option>1st Year</option><option>2nd Year</option><option>3rd Year</option><option>4th Year</option>
          </select>
          <select name="semester" value={form.semester} onChange={handleChange} required>
            <option value="">Select Semester</option>
            <option>1st Semester</option><option>2nd Semester</option>
          </select>
          <input type="text" value="First Ladies Hall" readOnly className="bg-gray-100" />
          <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone Number" required />
          <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
          <input name="cgpa" type="number" step="0.01" value={form.cgpa} onChange={handleChange} placeholder="CGPA" required />
          <input name="fatherProfession" value={form.fatherProfession} onChange={handleChange} placeholder="Father's Profession" required />
          <input name="motherProfession" value={form.motherProfession} onChange={handleChange} placeholder="Mother's Profession" required />
          <input name="fatherIncome" type="number" value={form.fatherIncome} onChange={handleChange} placeholder="Father's Yearly Income" required />
          <input name="motherIncome" type="number" value={form.motherIncome} onChange={handleChange} placeholder="Mother's Yearly Income" required />
          <textarea name="address" rows={2} value={form.address} onChange={handleChange} placeholder="Address" required />
          <input type="file" accept="image/*" ref={photoRef} />
          <textarea name="notes" rows={4} value={form.notes} onChange={handleChange} maxLength={1200} placeholder="Notes (max 200 words)" required />
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
