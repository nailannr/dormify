
import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from './components/user/login.jsx';
import Signup from './components/user/signup.jsx';
import Home from "./components/user/home.jsx";
import BookSeat1 from "./components/user/BookSeat1";
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
import PrivateRoute from "./components/user/PrivateRoute.jsx";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [role, setRole] = useState(localStorage.getItem("role"));

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

        {/* User routes */}
        <Route path="/user/home" element={<PrivateRoute><Home /></PrivateRoute>} />
        <Route path="/user/bookseat1" element={<PrivateRoute><BookSeat1 /></PrivateRoute>} />
        <Route path="/user/complainBox" element={<PrivateRoute><ComplainBox /></PrivateRoute>} />
        <Route path="/user/hallNotice" element={<PrivateRoute><HallNotice /></PrivateRoute>} />
        <Route path="/user/makePayment" element={<MakePayment />} />
        <Route path="/user/seatCancel" element={<SeatCancellation />} />
        <Route path="/user/update" element={<Update />} />
        <Route path="user/applicationStatus" element={<PrivateRoute><ApplicationStatus/></PrivateRoute>} />

        {/* Admin layout route (all child admin pages live inside AdminLayout) */}
        <Route
          path="/admin/*"
          element={
            token && (role === 'admin' || role === 'superadmin')
              ? <AdminLayout />
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
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

