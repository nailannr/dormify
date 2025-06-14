
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";

import Login from './components/user/login.jsx';
import Signup from './components/user/signup.jsx';
import Home from "./components/user/home.jsx";
import BookSeat1 from "./components/user/BookSeat1";
import BookSeat2 from "./components/user/BookSeat2.jsx"
import BookSeat3 from "./components/user/BookSeat3.jsx"
import ComplainBox from "./components/user/ComplainBox.jsx";
import HallNotice from "./components/user/hallNotice.jsx";
import MakePayment from "./components/user/MakePayment.jsx";
import SeatCancellation from "./components/user/seatCancel.jsx";
import Update from "./components/user/update.jsx";

import Dashboard from "./pages/admin/Dashboard";
import AdmissionApplications from "./pages/admin/AdmissionApplications";
import CancellationApplications from "./pages/admin/CancellationApplication";
import AdmittedStudents from "./pages/admin/AdmittedStudents";
import SeatAllotment from "./pages/admin/SeatAllotments";
import UploadNotice from "./pages/admin/UploadNotice";
import Complaints from "./pages/admin/Complaints";
import Profile from "./pages/admin/Profile";
import ProvostBodyAndStaffs from "./pages/admin/ProvostBodyAndStuffs";
import ApplicationStatus from "./components/user/ApplicationStatus.jsx";


import AdminLayout from "./layout/admin/AdminLayout.jsx";
import UserLayout from "./layout/user/UserLayout.jsx";
import MonitorAdmins from "./pages/admin/MonitorAdmins.jsx";

function App() {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));
  const changePass = localStorage.getItem('changePass') === 'true'

  
  // if (token === null || role === null) return <div>Loading...</div>;


  useEffect(() => {
    const handleStorage = () => {
      setToken(localStorage.getItem("token"));
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  

  return (
    <Router>
      <Routes>
        {/* Smart default route */}
        <Route
          path="/"
          element={
            !token
              ? <Navigate to="/user/login" />
              : role === 'admin' || role === 'superadmin'
                ? <Navigate to="/admin/dashboard" />
                : <Navigate to="/user/home" />
          }
        />

        {/* Auth routes */}
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />

        {/* User layout route */}
        <Route
          path="/user/*"
          element={
            token && (role === 'student')
              ? <UserLayout />
              : <Navigate to="/user/login" />
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="bookseat1" element={<BookSeat1 />} />
          <Route path="bookseat2" element={<BookSeat2 />} />
          <Route path="bookseat3" element={<BookSeat3 />} />
          <Route path="complainBox" element={<ComplainBox />} />
          <Route path="hallNotice" element={<HallNotice />} />
          <Route path="makePayment" element={<MakePayment />} />
          <Route path="seatCancel" element={<SeatCancellation />} />
          <Route path="update" element={<Update />} />
          <Route path="applicationStatus" element={<ApplicationStatus />} />
        </Route>
        

        {/* Admin layout route */}
        <Route
          path="/admin/*"
          element={
            token && (role === 'admin' || role === 'superadmin')
              ? changePass && role === 'admin'
                ? <Navigate to= "/admin/profile" />
                : <AdminLayout />
              : <Navigate to="/user/login" />
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="admission-applications" element={<AdmissionApplications />} />
          <Route path="cancellation-applications" element={<CancellationApplications />} />
          <Route path="admitted-students" element={<AdmittedStudents />} />
          <Route path="seat-allotment" element={<SeatAllotment />} />
          <Route path="upload-notice" element={<UploadNotice />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="provost-body-and-staffs" element={<ProvostBodyAndStaffs />} />
          {
            role === 'superadmin' && (
              <Route path="monitor-admins" element={<MonitorAdmins />} />
            )
          }
           
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

