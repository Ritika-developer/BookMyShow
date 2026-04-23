import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  Avatar,
  Divider
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import MovieIcon from "@mui/icons-material/Movie";
import TheaterComedyIcon from "@mui/icons-material/TheaterComedy";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PeopleIcon from "@mui/icons-material/People";
import PaymentsIcon from "@mui/icons-material/Payments";
import ScheduleIcon from "@mui/icons-material/Schedule";
import LogoutIcon from "@mui/icons-material/Logout";
import HomeIcon from "@mui/icons-material/Home";

import { useLocation, useNavigate } from "react-router-dom";

const drawerWidth = 240;

const items = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Movies", icon: <MovieIcon />, path: "/admin/movies" },
  { text: "Theatres", icon: <TheaterComedyIcon />, path: "/admin/theatres" },
  { text: "Shows", icon: <ScheduleIcon />, path: "/admin/shows" },
  { text: "Seats", icon: <EventSeatIcon />, path: "/admin/seats" },
  { text: "Bookings", icon: <BookOnlineIcon />, path: "/admin/bookings" },
  // { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
  // { text: "Payments", icon: <PaymentsIcon />, path: "/admin/payments" },
];

export default function AppSidebar() {

  const navigate = useNavigate();
  const location = useLocation();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          background: "#0f0f0f",
          color: "white"
        },
      }}
    >

      {/* LOGO / TITLE */}
      <Toolbar>
        <Typography
          variant="h6"
          sx={{ fontWeight: "bold", color: "#ff1744" }}
        >
          BookMyShow Admin
        </Typography>
      </Toolbar>

      {/* ADMIN PROFILE */}
      <Box sx={{ textAlign: "center", p: 2 }}>
        <Avatar
          sx={{
            bgcolor: "#ff1744",
            width: 56,
            height: 56,
            margin: "auto",
            mb: 1
          }}
        >
          {user?.name ? user.name[0].toUpperCase() : "A"}
        </Avatar>

        <Typography variant="subtitle1">
          {user?.name || "Admin"}
        </Typography>

        <Typography variant="caption" sx={{ color: "#aaa" }}>
          {user?.role}
        </Typography>
      </Box>

      <Divider sx={{ background: "#333" }} />

      {/* MENU ITEMS */}
      <List>
        {items.map((item) => {
          const active = location.pathname === item.path;

          return (
            <ListItemButton
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                mx: 1,
                borderRadius: "8px",
                mb: 0.5,
                background: active ? "#ff1744" : "transparent",
                "&:hover": {
                  background: active ? "#e6003c" : "#1c1c1c"
                }
              }}
            >
              <ListItemIcon
                sx={{
                  color: active ? "white" : "#bbb"
                }}
              >
                {item.icon}
              </ListItemIcon>

              <ListItemText
                primary={item.text}
                sx={{
                  color: active ? "white" : "#bbb"
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ background: "#333", mt: "auto" }} />

      {/* BOTTOM ACTIONS */}
      <List>

        <ListItemButton onClick={() => navigate("/")}>
          <ListItemIcon sx={{ color: "#bbb" }}>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Back to Home" />
        </ListItemButton>

        <ListItemButton onClick={handleLogout}>
          <ListItemIcon sx={{ color: "#ff1744" }}>
            <LogoutIcon />
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItemButton>

      </List>

    </Drawer>
  );
}