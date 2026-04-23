import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function MyTicket() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
const bookingId = Number(params.get("bookingId"));

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  console.log("URL:", window.location.href);
  console.log("Raw bookingId:", params.get("bookingId"));
  console.log("Final bookingId:", bookingId);
}, []);
  useEffect(() => {
    loadBooking();
  }, [bookingId]);

  const loadBooking = async () => {
    try {
    if (!bookingId || isNaN(bookingId)) return;

      const res = await API.get(`/bookings/${bookingId}`);
      setBooking(res.data);
    } catch (err) {
      console.log("Error loading ticket:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!bookingId) {
    return <h2 style={{ color: "white" }}>Invalid Ticket ❌</h2>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#111", color: "white", padding: "30px" }}>
      <div style={{ maxWidth: "700px", margin: "auto", background: "#1c1c1c", padding: "30px", borderRadius: "15px" }}>
        
        <h1 style={{ textAlign: "center", color: "#ff1744" }}>🎟 My Ticket</h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h2>{booking?.show?.movie?.title}</h2>

            <p><b>Theatre:</b> {booking?.show?.theatre?.name}</p>
            <p><b>Date:</b> {booking?.show?.showDate}</p>
            <p><b>Time:</b> {booking?.show?.showTime}</p>

            <p><b>Seats:</b> {booking?.seatNumber}</p>
            <p><b>Amount:</b> ₹{booking?.amount}</p>

            <p><b>Status:</b> {booking?.status}</p>

            <hr />

            <p><b>Booking ID:</b> {booking?.id}</p>

            <button
              onClick={() => navigate("/")}
              style={{
                marginTop: "20px",
                padding: "10px 20px",
                background: "#ff1744",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              Go Home
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default MyTicket;