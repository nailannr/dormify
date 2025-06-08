// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Login from './components/user/login.jsx';
// import Signup from './components/user/signup.jsx';
// import Home from "./components/user/home.jsx";
// import BookSeat from "./components/user/bookseat.jsx";
// import ComplainBox from "./components/user/complainBox.jsx";
// import HallNotice from "./components/user/hallNotice.jsx";
// import MakePayment from "./components/user/MakePayment.jsx";
// import SeatCancellation from "./components/user/seatCancel.jsx";
// import Update from "./components/user/update.jsx";
// import AvailableSeats from "./components/user/AvailableSeat.jsx";

// import AdminLayout from "./layout/admin/AdminLayout.jsx";

// function App() {
//   return (
//     <Router>
//       {/* <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/user/login" element={<Login />} />
//         <Route path="/user/signup" element={<Signup />} />
//         <Route path="/user/home" element={<Home />} />
//         <Route path="/user/bookseat" element={<BookSeat />} />
//         <Route path="/user/complainBox" element={<ComplainBox />} />
//         <Route path="/user/hallNotice" element={<HallNotice />} />
//         <Route path="/user/makePayment" element={<MakePayment />} />
//         <Route path="/user/seatCancel" element={<SeatCancellation />} />
//         <Route path="/user/update" element={<Update />} />
//         <Route path="/user/AvailableSeat" element={<AvailableSeats />} />
//       </Routes> */}

//       <AdminLayout/>
//     </Router>
//   );
// }

// export default App;

import React, {useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from './components/user/login.jsx';
import Signup from './components/user/signup.jsx';
import Home from "./components/user/home.jsx";
import BookSeat1 from "./components/user/BookSeat1";
import ComplainBox from "./components/user/complainBox.jsx";
import HallNotice from "./components/user/hallNotice.jsx";
import MakePayment from "./components/user/MakePayment.jsx";
import SeatCancellation from "./components/user/seatCancel.jsx";
import Update from "./components/user/update.jsx";
//import AvailableSeats from "./components/user/AvailableSeat.jsx";

import Dashboard from "./pages/admin/Dashboard";
import AdmissionApplications from "./pages/admin/AdmissionApplications";
import CancellationApplications from "./pages/admin/CancellationApplication";
import AdmittedStudents from "./pages/admin/AdmittedStudents";
import SeatAllotment from "./pages/admin/SeatAllotments";
import UploadNotice from "./pages/admin/UploadNotice";
import Complaints from "./pages/admin/Complaints";
import Profile from "./pages/admin/Profile";
import ProvostBodyAndStaffs from "./pages/admin/ProvostBodyAndStuffs";


import AdminLayout from "./layout/admin/AdminLayout.jsx";

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
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/bookseat1" element={<BookSeat1 />} />
        <Route path="/user/complainBox" element={<ComplainBox />} />
        <Route path="/user/hallNotice" element={<HallNotice />} />
        <Route path="/user/makePayment" element={<MakePayment />} />
        <Route path="/user/seatCancel" element={<SeatCancellation />} />
        <Route path="/user/update" element={<Update />} />
        {/* <Route path="/user/AvailableSeat" element={<AvailableSeats />} /> */}

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

