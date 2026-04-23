// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Movies from "./pages/Movie";
// import Shows from "./pages/Show";
// import Seats from "./pages/Seats";
// import Payment from "./pages/Payment";
// import Ticket from "./pages/ticket";

// function App() {

//   const [city, setCity] = useState(
//     localStorage.getItem("city") || "Bhopal"
//   );

//   return (

//     <BrowserRouter>

//       <Navbar city={city} setCity={setCity} />

//       <Routes>

//         <Route path="/" element={<Home />} />

//         <Route path="/movies" element={<Movies city={city} />} />

//        <Route path="/shows/:movieId" element={<Shows />} />

//         <Route path="/seats" element={<Seats />} />

//         <Route path="/payment" element={<Payment />} />

//         <Route path="/ticket" element={<Ticket />} />

//       </Routes>

//     </BrowserRouter>

//   );
// }

// export default App;







// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Movies from "./pages/Movie";
// import Shows from "./pages/Show";
// import Seats from "./pages/Seats";
// import Payment from "./pages/Payment";
// import Ticket from "./pages/ticket";

// import { Toolbar } from "@mui/material";



// import AdminLayout from "./pages/admin/AdminLayout"
// import AdminDashboard from "./pages/admin/AdminDashboard"
// import AddMovie from "./pages/admin/AddMovie"
// import ManageMovies from "./pages/admin/ManageMovies"
// import AddShow from "./pages/admin/AddShow"
// import AddTheatre from "./pages/admin/AddTheatre"

// function App() {

//   const [city, setCity] = useState(
//     localStorage.getItem("city") || "Bhopal"
//   );

//   return (

//     <BrowserRouter>

//       {/* Navbar */}
//       <Navbar city={city} setCity={setCity} />

//       {/* Spacer for fixed AppBar */}
//       <Toolbar />

//       <Routes>

//         <Route path="/" element={<Home />} />

//         <Route path="/movies" element={<Movies city={city} />} />

//         <Route path="/shows/:movieId" element={<Shows />} />

//        <Route path="/seats/:showId" element={<Seats />} />

//         <Route path="/payment" element={<Payment />} />

//         <Route path="/ticket" element={<Ticket />} />


// {/* ADMIN ROUTES */}
// <Route path="/admin" element={<AdminLayout/>}>

// <Route index element={<AdminDashboard/>}/>

// <Route path="add-movie" element={<AddMovie/>}/>

// <Route path="movies" element={<ManageMovies/>}/>

// <Route path="add-show" element={<AddShow/>}/>

// <Route path="add-theatre" element={<AddTheatre/>}/>

// </Route>
//       </Routes>

//     </BrowserRouter>

//   );
// }

// export default App;












// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { useState } from "react";
// import { Toolbar } from "@mui/material";

// import Navbar from "./components/Navbar";

// import Home from "./pages/Home";
// import Movies from "./pages/Movie";
// import Shows from "./pages/Show";
// import Seats from "./pages/Seats";
// import Payment from "./pages/Payment";
// import Ticket from "./pages/ticket";

// import AdminLayout from "./pages/admin/AdminLayout";
// import AdminDashboard from "./pages/admin/AdminDashboard";
// import AddMovie from "./pages/admin/AddMovie";
// import ManageMovies from "./pages/admin/ManageMovies";
// import AddShow from "./pages/admin/AddShow";
// import AddTheatre from "./pages/admin/AddTheatre";

// function App() {

//   const [city, setCity] = useState(
//     localStorage.getItem("city") || "Bhopal"
//   );

//   return (

//     <BrowserRouter>

//       <Routes>

//         {/* USER ROUTES */}

//         <Route path="/*" element={
//           <>
//             <Navbar city={city} setCity={setCity} />
//             <Toolbar />

//             <Routes>

//               <Route path="/" element={<Home />} />

//               <Route path="/movies" element={<Movies city={city} />} />

//               <Route path="/shows/:movieId" element={<Shows />} />

//               <Route path="/seats/:showId" element={<Seats />} />

//               <Route path="/payment" element={<Payment />} />

//               <Route path="/ticket" element={<Ticket />} />

//             </Routes>
//           </>
//         }/>

//         {/* ADMIN ROUTES */}

//         <Route path="/admin" element={<AdminLayout />}>

//           <Route index element={<AdminDashboard />} />

//           <Route path="add-movie" element={<AddMovie />} />

//           <Route path="movies" element={<ManageMovies />} />

//           <Route path="add-show" element={<AddShow />} />

//           <Route path="add-theatre" element={<AddTheatre />} />

//         </Route>

//       </Routes>

//     </BrowserRouter>

//   );

// }

// export default App;








// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useState } from "react";
// import { Toolbar } from "@mui/material";

// import Navbar from "./components/Navbar";

// import Home from "./pages/Home";
// import Movies from "./pages/Movie";
// import Shows from "./pages/Show";
// import Seats from "./pages/Seats";
// import Payment from "./pages/Payment";
// import Ticket from "./pages/ticket";

// import AdminLayout from "../src/admin/components/AdminLayout";
// import AdminDashboard from "../src/admin/pages/Dashboard";
// import AddMovie from "../src/admin/pages/MoviePage";
// // import ManageMovies from "./pages/admin/ManageMovies";
// import AddShow from "../src/admin/pages/ShowPage";
// import AddTheatre from "../src/admin/pages/TheatresPage";
// import MoviesPage from "../src/admin/pages/MoviePage";

// // optional placeholder pages
// function Placeholder({ title }) {
//   return (
//     <div style={{ color: "white", padding: "20px" }}>
//       <h2>{title}</h2>
//     </div>
//   );
// }

// function UserLayout({ city, setCity }) {
//   return (
//     <>
//       <Navbar city={city} setCity={setCity} />
//       <Toolbar />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/movies" element={<Movies city={city} />} />
//         <Route path="/shows/:movieId" element={<Shows />} />
//         <Route path="/seats/:showId" element={<Seats />} />
//         <Route path="/payment" element={<Payment />} />
//         <Route path="/ticket" element={<Ticket />} />
//       </Routes>
//     </>
//   );
// }

// function App() {
//   const [city, setCity] = useState(
//     localStorage.getItem("city") || "Bhopal"
//   );

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* USER ROUTES */}
//         <Route path="/*" element={<UserLayout city={city} setCity={setCity} />} />

//         {/* ADMIN ROUTES */}
//         <Route path="/admin" element={<AdminLayout />}>
//           <Route index element={<Navigate to="dashboard" />} />
//           <Route path="dashboard" element={<AdminDashboard />} />
//           <Route path="add-movie" element={<AddMovie />} />
//           <Route path="movies" element={<MoviesPage />} />
//           <Route path="add-show" element={<AddShow />} />
//           <Route path="add-theatre" element={<AddTheatre />} />

//           <Route path="theatres" element={<Placeholder title="Theatres Page" />} />
//           <Route path="shows" element={<Placeholder title="Shows Page" />} />
//           <Route path="bookings" element={<Placeholder title="Bookings Page" />} />
//           <Route path="users" element={<Placeholder title="Users Page" />} />
//           <Route path="payments" element={<Placeholder title="Payments Page" />} />
//         </Route>



//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;




















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