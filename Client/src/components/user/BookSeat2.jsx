import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import sustLogo from "../../assets/sustLogo.png";
import HallSlideshowBg from "./HallSlideShowBg";

import first1 from "../../assets/hall1jpg.jpg";
import first2 from "../../assets/hall2.jpg";
import first3 from "../../assets/hall3.jpg";

import API from "../../api";

const departments = [
  "Architecture", "Chemical Engineering & Polymer Science", "Civil & Environmental Engineering", "Computer Science & Engineering", "Electrical & Electronic Engineering", "Food Engineering & Tea Technology", "Industrial & Production Engineering", "Mechanical Engineering", "Petroleum & Mining Engineering",
  "Genetic Engineering & Biotechnology", "Biochemistry & Molecular Biology", "Chemistry", "Geography & Environment", "Mathematics", "Physics", "Statistics", "Forestry & Environmental Science",
  "Bangla", "Economics", "English", "Political Studies", "Public Administration", "Social Work", "Sociology",
  "Business Administration"
];

export default function BookSeat2() {
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
    dorm: "dorm2",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
      <HallSlideshowBg images={images} />

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-white bg-opacity-90 rounded-2xl shadow-2xl p-10 w-full max-w-2xl space-y-6 border border-green-100"
      >
        <div className="flex flex-col items-center mb-6">
          <img src={sustLogo} alt="SUST Logo" className="w-20 mb-2" />
          <h2 className="text-3xl font-bold text-green-700 mb-1">Apply for Seat - Begum Sirajunnesa Chowdhury Hall</h2>
          <p className="text-gray-500 text-sm">Please fill in all the information accurately.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { label: "Name", name: "name" },
            { label: "Registration Number", name: "regNo" },
            { label: "Session (e.g. 2020-21)", name: "session" },
            { label: "Phone Number", name: "phone" },
            { label: "Email", name: "email" },
            { label: "CGPA", name: "cgpa", type: "number", step: "0.01" },
            { label: "Father's Profession", name: "fatherProfession" },
            { label: "Mother's Profession", name: "motherProfession" },
            { label: "Father's Yearly Income (BDT)", name: "fatherIncome", type: "number" },
            { label: "Mother's Yearly Income (BDT)", name: "motherIncome", type: "number" },
          ].map(({ label, name, type = "text", step }) => (
            <div key={name}>
              <label className="block font-semibold mb-1">{label}</label>
              <input
                name={name}
                type={type}
                step={step}
                required
                value={form[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
              />
            </div>
          ))}

          <div>
            <label className="block font-semibold mb-1">Department</label>
            <select
              name="department"
              value={form.department}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Department</option>
              {departments.map((dep) => (
                <option key={dep} value={dep}>{dep}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Year</label>
            <select
              name="year"
              value={form.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Year</option>
              <option>1st Year</option>
              <option>2nd Year</option>
              <option>3rd Year</option>
              <option>4th Year</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Semester</label>
            <select
              name="semester"
              value={form.semester}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            >
              <option value="">Select Semester</option>
              <option>1st Semester</option>
              <option>2nd Semester</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold mb-1">Hall Name</label>
            <input
              type="text"
              readOnly
              value="Begum Sirajunnessa Chowdhury Ladies Hall"
              className="w-full px-4 py-2 border rounded-lg bg-gray-100"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Address</label>
            <textarea
              name="address"
              rows={2}
              value={form.address}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Upload Photo</label>
            <input
              type="file"
              accept="image/*"
              ref={photoRef}
              className="w-full px-4 py-2 border rounded-lg bg-gray-50"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Notes (max 200 words)</label>
            <textarea
              name="note"
              rows={4}
              maxLength={1200}
              value={form.note}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-green-400"
            />
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
