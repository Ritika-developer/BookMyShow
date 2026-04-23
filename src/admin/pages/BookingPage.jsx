import React, { useEffect, useState } from "react";
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import PageHeader from "../components/PageHeader";
import adminApi from "../services/adminApi";

export default function BookingsPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    const res = await adminApi.get("/bookings");
    setRows(res.data);
  };

  const columns = [
    { field: "id", headerName: "Booking ID", width: 100 },
    { field: "userName", headerName: "User", flex: 1, valueGetter: (_, row) => row.userName || row.user?.name || "" },
    { field: "movieName", headerName: "Movie", flex: 1, valueGetter: (_, row) => row.movieName || row.show?.movie?.title || "" },
    { field: "theatreName", headerName: "Theatre", flex: 1, valueGetter: (_, row) => row.theatreName || row.show?.theatre?.name || "" },
    { field: "seatNumber", headerName: "Seat", flex: 0.8 },
    { field: "bookingDate", headerName: "Booking Date", flex: 1 },
    { field: "amount", headerName: "Amount", flex: 0.8 },
    { field: "status", headerName: "Status", flex: 0.8 },
  ];

  return (
    <>
      <PageHeader title="Bookings" subtitle="View all bookings" />
      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />
      </Paper>
    </>
  );
}