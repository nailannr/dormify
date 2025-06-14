import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import API from '../../api'
import SustLogo from "../admin/SustLogo";

export default function Signup() {
  const [form,setForm] = useState({name:'', email:'', password:''});
  const navigate = useNavigate();

  const  handleSubmit = async (e)=> {
    e.preventDefault();
    console.log("Form Data:",form)
    try {
      const res = await API.post('/auth/signup', form);
      alert(res.data.message);
      navigate("/user/home");
    } catch (err) {
      alert(err.response.data.message);
    }
    
  }


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 px-2">
    <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-6">
        <SustLogo />
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 mt-2">Sign Up for Dormify</h2>
      </div>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          name="name"
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 text-lg"
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={e => setForm({ ...form, email: e.target.value })}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 text-lg"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={e => setForm({ ...form, password: e.target.value })}
          required
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 text-lg"
        />
        <button
          type="submit"
          className="w-full py-3 bg-emerald-700 text-white rounded-full font-semibold text-lg shadow-md hover:bg-emerald-800 transition"
        >
          Sign Up
        </button>
        <p className="text-center text-gray-600">
          Already have an account?{" "}
          <span
            className="text-emerald-700 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/user/login")}
          >
            Log In
          </span>
        </p>
      </form>
    </div>
  </div>
);
}
