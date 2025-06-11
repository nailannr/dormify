import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css";
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
    <div className="auth-container">
      <SustLogo />
      <h2>Sign Up</h2>
      <form 
      // action="/user/signup"
      // method="post"
      className="auth-form" onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" name= "name" onChange={e => setForm({ ...form, name: e.target.value })} required />
        <input type="email" placeholder="Email" name= "email" onChange={e => setForm({ ...form, email: e.target.value })} required />
        <input type="password" placeholder="Password" name= "password" onChange={e => setForm({ ...form, password: e.target.value })} required />
        <button type="submit">Sign Up</button>
        <p>
          Already have an account?{" "}
          <span className="link" onClick={() => navigate("/user/login")}>Log In</span>
        </p>
      </form>
    </div>
  );
}
