import React from "react";
import { AppBar, Toolbar, Typography, Box, Avatar } from "@mui/material";

export default function Topbar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Avatar>R</Avatar>
      </Toolbar>
    </AppBar>
  );
}