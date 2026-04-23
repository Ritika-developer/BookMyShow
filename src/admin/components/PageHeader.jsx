import React from "react";
import { Box, Typography } from "@mui/material";

export default function PageHeader({ title, subtitle }) {
  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h4" fontWeight={700}>{title}</Typography>
      <Typography color="text.secondary">{subtitle}</Typography>
    </Box>
  );
}