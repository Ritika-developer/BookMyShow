import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import { Toolbar } from "@mui/material";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Movies from "./pages/Movie";
import Shows from "./pages/Show";
import Seats from "./pages/Seats";
import Payment from "./pages/Payment";
import MyBooking from "./pages/MyBooking";
import Ticket from "./pages/Ticket";
import MyTicket from "./pages/MyTickets";
import Profile from "./pages/Profile";

import AdminLayout from "./admin/components/AdminLayout";
import AdminDashboard from "./admin/pages/Dashboard";
import MoviesPage from "./admin/pages/MoviePage";
import ShowsPage from "./admin/pages/ShowPage";
import TheatresPage from "./admin/pages/TheatresPage";
import BookingsPage from "./admin/pages/BookingPage";
// import UsersPage from "./admin/pages/UsersPage";
// import PaymentsPage from "./admin/pages/PaymentsPage";
import SeatsPage from "./admin/pages/SeatsPage";

import Login from "./pages/Login";
import Register from "./pages/Register";

function UserLayout({ city, setCity }) {
  return (
    <>
      <Navbar city={city} setCity={setCity} />
      <Toolbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies city={city} />} />
        <Route path="/shows/:movieId" element={<Shows />} />
        <Route path="/seats/:showId" element={<Seats />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/my-bookings" element={<MyBooking />} />
        <Route path="/ticket" element={<Ticket />} />
        <Route path="/my-tickets" element={<MyTicket />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </>
  );
}

function App() {
  const [city, setCity] = useState(localStorage.getItem("city") || "Bhopal");

  return (
    <BrowserRouter>
      <Routes>

        {/* ✅ PUBLIC ROUTES */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ ADMIN ROUTES */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="theatres" element={<TheatresPage />} />
          <Route path="shows" element={<ShowsPage />} />
          <Route path="bookings" element={<BookingsPage />} />
          <Route path="seats" element={<SeatsPage />} />
        </Route>

        {/* ✅ USER ROUTES */}
        <Route path="/*" element={<UserLayout city={city} setCity={setCity} />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;