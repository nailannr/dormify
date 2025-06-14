import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import API from '../../api';
import SustLogo from '../admin/SustLogo';



export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form Data:", form)
    try {
      const res = await API.post('/auth/login', form);
      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', user.role);
      localStorage.setItem('dorm',user.dorm || '');
      localStorage.setItem('changePass', res.data.changePass)
      alert('Login successful');
      // redirect to dashboard
       if (res.data.changePass) {
        //  navigate('/admin/profile');
        window.location.href = '/admin/profile'
       } else if (user.role === 'admin' || user.role === 'superadmin') {
        //  navigate('/admin/dashboard');
        window.location.href = '/admin/dashboard'
       } else {
        //  navigate('/user/home');
        window.location.href = '/user/home'
       }

    } catch (err) {
      alert(err.response.data.message);
    }

  }


  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 via-green-100 to-emerald-100 px-2">
    <div className="bg-white bg-opacity-95 rounded-2xl shadow-2xl p-10 w-full max-w-md flex flex-col items-center">
      <div className="w-full flex flex-col items-center mb-6">
        <SustLogo />
        <h2 className="text-2xl font-bold text-emerald-700 mb-2 mt-2">Sign In to Dormify</h2>
      </div>
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
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
          Log In
        </button>
        <p className="text-center text-gray-600">
          Don't have an account?{" "}
          <span
            className="text-emerald-700 font-bold cursor-pointer hover:underline"
            onClick={() => navigate("/user/signup")}
          >
            Sign Up
          </span>
        </p>
      </form>
    </div>
  </div>
);
}
