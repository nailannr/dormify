import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/user/login.jsx";
import Signup from "./components/user/signup.jsx";
import Home from "./components/user/home.jsx";
import BookSeat1 from "./components/user/BookSeat1.jsx";
import BookSeat2 from "./components/user/BookSeat2.jsx";
import BookSeat3 from "./components/user/BookSeat3.jsx";
import ComplainBox from "./components/user/ComplainBox.jsx";
import HallNotice from "./components/user/hallNotice.jsx";
import MakePayment from "./components/user/makePayment.jsx";
import SeatCancellation from "./components/user/seatCancel.jsx";
import Update from "./components/user/ApplicationStatus.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/user/login" element={<Login />} />
        <Route path="/user/signup" element={<Signup />} />
        <Route path="/user/home" element={<Home />} />
        <Route path="/user/BookSeat1" element={<BookSeat1 />} />
         <Route path="/user/BookSeat2" element={<BookSeat2 />} />
         <Route path="/user/BookSeat3" element={<BookSeat3 />} />
        <Route path="/user/ComplainBox" element={<ComplainBox />} />
        <Route path="/user/hallNotice" element={<HallNotice />} />
        <Route path="/user/makePayment" element={<MakePayment />} />
        <Route path="/user/seatCancel" element={<SeatCancellation />} />
        <Route path="/user/ApplicationStatus" element={<ApplicationStatus />} />
        
      </Routes>
    </Router>
  );
}

export default App;
