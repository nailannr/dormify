// src/pages/UserRoutes.js
import { Routes, Route } from "react-router-dom";
import Login from "../components/user/login";
import Signup from "../components/user/signup";
import Home from "../components/user/home";
import BookSeat from "../components/user/bookseat";
// ...other imports

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="home" element={<Home />} />
      <Route path="book-seat" element={<BookSeat />} />
      {/* Add other user routes here */}
    </Routes>
  );
}
