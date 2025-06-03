import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "./Login.css";
import API from '../../api';

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log("Form Data:", form)
     try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      // redirect to dashboard
      navigate("/user/home");
    } catch (err) {
      alert(err.response.data.message);
    }
    
  }

  return (
    <div className="auth-container">
      <img src="/sust-logo.png" alt="SUST Logo" className="logo" />
      <h2>Sign In</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" name="email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" name="password" onChange={e => setForm({ ...form, password: e.target.value })}  required />
        <button type="submit">Log In</button>
        <p>
          Don't have an account?{" "}
          <span className="link" onClick={() => navigate("/user/signup")}>Sign Up</span>
        </p>
      </form>
    </div>
  );
}
