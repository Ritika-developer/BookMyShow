import React, { useEffect, useState } from "react";
import API from "../services/api";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Box
} from "@mui/material";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await API.get(`/bookings/user/${userId}`);
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };
const handleCancel = async (id) => {
  const confirmDelete = window.confirm("Are you sure you want to cancel this booking?");

  if (!confirmDelete) return;

  try {
    await API.delete(`/bookings/${id}`);
    fetchBookings();
  } catch (err) {
    console.error(err);
  }
};

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Bookings 🎟️
      </Typography>

      <Grid container spacing={3}>
        {bookings.length === 0 ? (
          <Typography>No bookings found</Typography>
        ) : (
          bookings.map((booking) => (
            <Grid item xs={12} md={6} key={booking.id}>
              <Card>
                <CardContent>

                  {/* 🎬 Movie Name */}
                  <Typography variant="h6">
                    {booking.show?.movie?.title}
                  </Typography>

                  {/* 🏢 Theatre */}
                  <Typography variant="body2">
                    🎬 {booking.show?.theatre?.name}
                  </Typography>

                  {/* 🕒 Show Time */}
                  <Typography variant="body2">
                    🕒 {new Date(booking.show?.showTime).toLocaleString()}
                  </Typography>

                  {/* 💺 Seats */}
                  <Typography variant="body2">
                    💺 Seats: {booking.seatNumber}
                  </Typography>

                  {/* 💰 Amount */}
                  <Typography variant="body2">
                    💰 ₹ {booking.amount}
                  </Typography>

                  {/* 📌 Status */}
                  <Chip
                    label={booking.status}
                    color={booking.status === "CONFIRMED" ? "success" : "error"}
                    sx={{ mt: 1 }}
                  />

                  {/* ❌ Cancel Button */}
                  <Box sx={{ mt: 2 }}>
                    {booking.status === "CONFIRMED" && (
                   <Button
  variant="contained"
  color="error"
  onClick={() => handleCancel(booking.id)}
  sx={{
    textTransform: "none",
    fontWeight: "bold"
  }}
>
  ❌ Cancel / Delete
</Button>
                    )}
                  </Box>

                </CardContent>
              </Card>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default MyBookings;