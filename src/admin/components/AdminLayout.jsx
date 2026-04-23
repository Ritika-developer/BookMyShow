import React from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import AppSidebar from "./AppSidebar";
import Topbar from "./Topbar";

export default function AdminLayout() {
  return (
    <Box sx={{ display: "flex" }}>
      <Topbar />
      <AppSidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}