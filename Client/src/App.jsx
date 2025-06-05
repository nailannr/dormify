import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './components/user/login.jsx';
import Signup from './components/user/signup.jsx';
import Home from "./components/user/home.jsx";
import BookSeat from "./components/user/bookseat.jsx";
import ComplainBox from "./components/user/complainBox.jsx";
import HallNotice from "./components/user/hallNotice.jsx";
import MakePayment from "./components/user/MakePayment.jsx";
import SeatCancellation from "./components/user/seatCancel.jsx";
import Update from "./components/user/update.jsx";
import AvailableSeats from "./components/user/AvailableSeat.jsx";

import AdminLayout from "./layout/admin/AdminLayout.jsx";

function App() {
  return (
    <Router>
      {/* <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/bookseat" element={<BookSeat />} />
        <Route path="/user/complainBox" element={<ComplainBox />} />
        <Route path="/user/hallNotice" element={<HallNotice />} />
        <Route path="/user/makePayment" element={<MakePayment />} />
        <Route path="/user/seatCancel" element={<SeatCancellation />} />
        <Route path="/user/update" element={<Update />} />
        <Route path="/user/AvailableSeat" element={<AvailableSeats />} />
      </Routes> */}

      <AdminLayout/>
    </Router>
  );
}

export default App;
