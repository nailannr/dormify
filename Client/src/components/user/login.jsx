import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from '../../api';
import SustLogo from '../admin/SustLogo';

import { useEffect } from 'react';



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
      localStorage.setItem('dorm', user.dorm || '');
      // alert('Login successful');
      // redirect to dashboard
      if (user.role === 'admin' || user.role === 'superadmin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }
    } catch (err) {
      alert(err.response.data.message);
    }

  }

  return (
    <div className="auth-container">
      <SustLogo />
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" name="password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Log In</button>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/user/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
