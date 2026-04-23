import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import adminApi from "../services/adminApi";
import PageHeader from "../components/PageHeader";

export default function SeatsPage() {
  const [shows, setShows] = useState([]);
  const [selectedShowId, setSelectedShowId] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchShows();
  }, []);

  const fetchShows = async () => {
    const res = await adminApi.get("/shows");
    setShows(res.data);
  };

  const fetchSeats = async (showId) => {
    if (!showId) return;
    const res = await adminApi.get(`/seats/show/${showId}`);
    setRows(res.data);
  };

  const handleGenerateSeats = async () => {
    if (!selectedShowId) {
      alert("Please select a show first");
      return;
    }
    await adminApi.post(`/seats/generate/${selectedShowId}`);
    fetchSeats(selectedShowId);
  };

  const handleStatusChange = async (seatId, status) => {
    await adminApi.put(`/seats/${seatId}/status`, { status });
    fetchSeats(selectedShowId);
  };

  const handleDelete = async (seatId) => {
    await adminApi.delete(`/seats/${seatId}`);
    fetchSeats(selectedShowId);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "seatNumber", headerName: "Seat Number", flex: 1 },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "changeStatus",
      headerName: "Change Status",
      flex: 1.5,
      renderCell: (params) => (
        <TextField
          select
          size="small"
          value={params.row.status || ""}
          onChange={(e) => handleStatusChange(params.row.id, e.target.value)}
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="AVAILABLE">AVAILABLE</MenuItem>
          <MenuItem value="BOOKED">BOOKED</MenuItem>
          <MenuItem value="BLOCKED">BLOCKED</MenuItem>
        </TextField>
      ),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <IconButton color="error" onClick={() => handleDelete(params.row.id)}>
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Seats" subtitle="Manage seats show-wise" />

      <Paper sx={{ p: 2, mb: 2 }}>
        <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
          <TextField
            select
            fullWidth
            label="Select Show"
            value={selectedShowId}
            onChange={(e) => {
              setSelectedShowId(e.target.value);
              fetchSeats(e.target.value);
            }}
          >
            {shows.map((show) => (
              <MenuItem key={show.id} value={show.id}>
                {show.movie?.title} - {show.theatre?.name} - {show.showDate} - {show.showTime}
              </MenuItem>
            ))}
          </TextField>

          <Button variant="contained" onClick={handleGenerateSeats}>
            Generate Seats
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />
      </Paper>
    </>
  );
}