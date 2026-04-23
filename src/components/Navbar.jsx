




// import React, { useState } from "react";
// import {
//   AppBar,
//   Toolbar,
//   Typography,
//   IconButton,
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   Box,
//   MenuItem,
//   Select,
//   TextField,
//   Button,
//   InputAdornment
// } from "@mui/material";

// import MenuIcon from "@mui/icons-material/Menu";
// import SearchIcon from "@mui/icons-material/Search";

// import { Link, useNavigate } from "react-router-dom";

// function Navbar({ city, setCity }) {

//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const navigate = useNavigate();
//   const user = JSON.parse(localStorage.getItem("user"));

//   const toggleDrawer = () => {
//     setOpen(!open);
//   };

//   // 🔥 ONLY CHANGE: LIVE SEARCH
//   const handleSearchChange = (e) => {
//     const value = e.target.value;
//     setSearch(value);
//     navigate(`/movies?search=${value}`);
//   };

//   const handleCityChange = (e) => {
//     const selectedCity = e.target.value;
//     setCity(selectedCity);
//     localStorage.setItem("city", selectedCity);

//     // 👇 search maintain rahe
//     navigate(`/movies?search=${search}`);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("user");
//     navigate("/login");
//   };

//   return (
//     <>
//       <AppBar position="fixed" sx={{ background: "#0f0f0f" }}>

//         <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

//           {/* LEFT SECTION */}
//           <Box sx={{ display: "flex", alignItems: "center" }}>

//             <IconButton color="inherit" onClick={toggleDrawer}>
//               <MenuIcon />
//             </IconButton>

//             <Typography
//               variant="h5"
//               sx={{
//                 marginLeft: "10px",
//                 fontWeight: "bold",
//                 color: "#ff1744",
//                 letterSpacing: "1px"
//               }}
//             >
//               BookMyShow
//             </Typography>

//           </Box>

//           {/* 🔍 SEARCH BAR (UPDATED ONLY THIS PART) */}
//           <TextField
//             size="small"
//             placeholder="Search movies..."
//             value={search}
//             onChange={handleSearchChange}   // 🔥 CHANGE HERE
//             sx={{
//               background: "#1c1c1c",
//               borderRadius: "6px",
//               width: "400px",
//               input: { color: "white" }
//             }}
//             InputProps={{
//               startAdornment: (
//                 <InputAdornment position="start">
//                   <SearchIcon sx={{ color: "white" }} />
//                 </InputAdornment>
//               )
//             }}
//           />

//           {/* RIGHT SECTION */}
//           <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>

//             <Select
//               value={city}
//               onChange={handleCityChange}
//               size="small"
//               sx={{
//                 background: "#1c1c1c",
//                 color: "white",
//                 ".MuiOutlinedInput-notchedOutline": {
//                   borderColor: "#444"
//                 },
//                 "& .MuiSvgIcon-root": {
//                   color: "white"
//                 }
//               }}
//             >

//               <MenuItem value="ALL">All Cities</MenuItem>
//               <MenuItem value="Bhopal">Bhopal</MenuItem>
//               <MenuItem value="Delhi">Delhi</MenuItem>
//               <MenuItem value="Mumbai">Mumbai</MenuItem>
//              <MenuItem value="Indore">Indore</MenuItem>
//              <MenuItem value="Pune">Pune</MenuItem>
//             <MenuItem value="Hyderabad">Hyderabad</MenuItem>

//             </Select>

//             {!user ? (
//               <Button
//                 variant="contained"
//                 onClick={() => navigate("/login")}
//                 sx={{
//                   background: "#ff1744",
//                   "&:hover": { background: "#e6003c" }
//                 }}
//               >
//                 Login
//               </Button>
//             ) : (
//               <>
//                 <Typography sx={{ color: "white" }}>
//                   {user.name}
//                 </Typography>

//                 {user.role === "ADMIN" && (
//                   <Button
//                     variant="outlined"
//                     onClick={() => navigate("/admin")}
//                     sx={{
//                       color: "white",
//                       borderColor: "white"
//                     }}
//                   >
//                     Admin
//                   </Button>
//                 )}

//                 <Button
//                   variant="contained"
//                   onClick={handleLogout}
//                   sx={{
//                     background: "#ff1744",
//                     "&:hover": { background: "#e6003c" }
//                   }}
//                 >
//                   Logout
//                 </Button>
//               </>
//             )}

//           </Box>

//         </Toolbar>

//       </AppBar>

//       {/* DRAWER MENU */}
//       <Drawer anchor="left" open={open} onClose={toggleDrawer}>

//         <Box sx={{ width: 250 }}>

//           <List>

//             <ListItem button component={Link} to="/" onClick={toggleDrawer}>
//               <ListItemText primary="Home" />
//             </ListItem>

//             <ListItem button component={Link} to="/movies" onClick={toggleDrawer}>
//               <ListItemText primary="Movies" />
//             </ListItem>

//             <ListItem button component={Link} to="/admin" onClick={toggleDrawer}>
//               <ListItemText primary="Admin" />
//             </ListItem>

//           </List>

//         </Box>

//       </Drawer>

//     </>
//   );
// }

// export default Navbar;

























import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  MenuItem,
  Select,
  TextField,
  Button,
  InputAdornment
} from "@mui/material";

import HomeIcon from "@mui/icons-material/Home";
import MovieIcon from "@mui/icons-material/Movie";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import PersonIcon from "@mui/icons-material/Person";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";   // 🔥 IMPORTANT

function Navbar({ city, setCity }) {

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cities, setCities] = useState([]); // 🔥 NEW

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ LOAD CITY FROM LOCALSTORAGE ON START
  useEffect(() => {
    const savedCity = localStorage.getItem("city") || "ALL";
    setCity(savedCity);
  }, []);

  // ✅ FETCH CITIES FROM DB
useEffect(() => {
  API.get("/cities")
    .then(res => {
      console.log("FRONTEND CITIES:", res.data); // 🔥 ADD THIS
      setCities(res.data);
    })
    .catch(err => console.error(err));
}, []);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // 🔍 SEARCH
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    const selectedCity = localStorage.getItem("city") || "ALL";

    navigate(`/movies?search=${value}&city=${selectedCity}`);
  };

  // 🌆 CITY CHANGE
  const handleCityChange = (e) => {
    const selectedCity = e.target.value;

    setCity(selectedCity);
    localStorage.setItem("city", selectedCity);

    navigate(`/movies?search=${search}&city=${selectedCity}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <AppBar position="fixed" sx={{ background: "#0f0f0f" }}>
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>

          {/* LEFT */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton color="inherit" onClick={toggleDrawer}>
              <MenuIcon />
            </IconButton>

            <Typography
              variant="h5"
              sx={{
                marginLeft: "10px",
                fontWeight: "bold",
                color: "#ff1744"
              }}
            >
              BookMyShow
            </Typography>
          </Box>

          {/* SEARCH */}
          <TextField
            size="small"
            placeholder="Search movies..."
            value={search}
            onChange={handleSearchChange}
            sx={{
              background: "#1c1c1c",
              borderRadius: "6px",
              width: "400px",
              input: { color: "white" }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "white" }} />
                </InputAdornment>
              )
            }}
          />

          {/* RIGHT */}
          <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>

            {/* 🌆 DYNAMIC CITY */}
            <Select
              value={city || "ALL"}
              onChange={handleCityChange}
              size="small"
              sx={{
                background: "#1c1c1c",
                color: "white",
                ".MuiOutlinedInput-notchedOutline": {
                  borderColor: "#444"
                },
                "& .MuiSvgIcon-root": {
                  color: "white"
                }
              }}
            >
              <MenuItem value="ALL">All Cities</MenuItem>

              {cities.map((c) => (
                <MenuItem key={c.id} value={c.name}>
                  {c.name}
                </MenuItem>
              ))}

            </Select>

            {!user ? (
              <Button
                variant="contained"
                onClick={() => navigate("/login")}
                sx={{
                  background: "#ff1744",
                  "&:hover": { background: "#e6003c" }
                }}
              >
                Login
              </Button>
            ) : (
              <>
                <Typography sx={{ color: "white" }}>
                  {user.name}
                </Typography>

                {user.role === "ADMIN" && (
                  <Button
                    variant="outlined"
                    onClick={() => navigate("/admin")}
                    sx={{
                      color: "white",
                      borderColor: "white"
                    }}
                  >
                    Admin
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleLogout}
                  sx={{
                    background: "#ff1744"
                  }}
                >
                  Logout
                </Button>
              </>
            )}

          </Box>

        </Toolbar>
      </AppBar>

      {/* DRAWER */}
     <Drawer anchor="left" open={open} onClose={toggleDrawer}>
  <Box
    sx={{
      width: 260,
      height: "100%",
      background: "linear-gradient(180deg,#0f0f0f,#1c1c1c)",
      color: "white",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between"
    }}
  >

    {/* 🔥 TOP SECTION */}
    <Box>

      {/* LOGO */}
      <Box sx={{ p: 2, borderBottom: "1px solid #333" }}>
        <Typography
          variant="h6"
          sx={{ color: "#ff1744", fontWeight: "bold" }}
        >
          🎬 BookMyShow
        </Typography>
      </Box>

      {/* MENU */}
      <List>

  <ListItem
    button
    component={Link}
    to="/"
    onClick={toggleDrawer}
    sx={{ "&:hover": { background: "#ff1744" } }}
  >
    <HomeIcon sx={{ mr: 2 }} />
    <ListItemText primary="Home" />
  </ListItem>

  <ListItem
    button
    component={Link}
    to="/movies"
    onClick={toggleDrawer}
    sx={{ "&:hover": { background: "#ff1744" } }}
  >
    <MovieIcon sx={{ mr: 2 }} />
    <ListItemText primary="Movies" />
  </ListItem>

  {/* 🔥 NEW FEATURES */}

  <ListItem
    button
    component={Link}
    to="/my-bookings"
    onClick={toggleDrawer}
    sx={{ "&:hover": { background: "#ff1744" } }}
  >
    <ConfirmationNumberIcon sx={{ mr: 2 }} />
    <ListItemText primary="My Bookings" />
  </ListItem>

  <ListItem
    button
    component={Link}
    to="/my-tickets"
    onClick={toggleDrawer}
    sx={{ "&:hover": { background: "#ff1744" } }}
  >
    <ReceiptLongIcon sx={{ mr: 2 }} />
    <ListItemText primary="My Tickets" />
  </ListItem>

  <ListItem
    button
    component={Link}
    to="/profile"
    onClick={toggleDrawer}
    sx={{ "&:hover": { background: "#ff1744" } }}
  >
    <PersonIcon sx={{ mr: 2 }} />
    <ListItemText primary="Profile" />
  </ListItem>

  {/* ADMIN */}
  {user?.role === "ADMIN" && (
    <ListItem
      button
      component={Link}
      to="/admin"
      onClick={toggleDrawer}
      sx={{ "&:hover": { background: "#ff1744" } }}
    >
      <AdminPanelSettingsIcon sx={{ mr: 2 }} />
      <ListItemText primary="Admin Panel" />
    </ListItem>
  )}

</List>

    </Box>

    {/* 🔥 BOTTOM USER SECTION */}
    {user && (
      <Box sx={{ p: 2, borderTop: "1px solid #333" }}>

        <Typography sx={{ mb: 1 }}>
          👤 {user.name}
        </Typography>

        <Button
          fullWidth
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          sx={{
            background: "#ff1744",
            color: "white",
            "&:hover": { background: "#e6003c" }
          }}
        >
          Logout
        </Button>

      </Box>
    )}

  </Box>
</Drawer>
    </>
  );
}

export default Navbar;