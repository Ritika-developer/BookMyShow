import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await API.get(`/bookings/user/${userId}`);
      setTickets(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ padding: "30px", background: "#111", minHeight: "100vh", color: "white" }}>
      <h2>🎟 My Tickets</h2>

      {tickets.length === 0 ? (
        <p>No tickets found</p>
      ) : (
        tickets.map((t) => (
          <div
            key={t.id}
            style={{
              background: "#1c1c1c",
              padding: "20px",
              marginBottom: "20px",
              borderRadius: "10px",
              cursor: "pointer"
            }}
            onClick={() => navigate(`/ticket?bookingId=${t.id}`)} // 🔥 important
          >
            <h3>{t.show?.movie?.title}</h3>
            <p>Theatre: {t.show?.theatre?.name}</p>
            <p>Seats: {t.seatNumber}</p>
            <p>Amount: ₹{t.amount}</p>

            <p style={{ color: "#4caf50" }}>Booking ID: {t.id}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default MyTickets;