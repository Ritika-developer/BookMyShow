// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import API from "../services/api";

// function Seats() {
//   const { showId } = useParams();

//   const [seats, setSeats] = useState([]);
//   const [selectedSeat, setSelectedSeat] = useState("");
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!showId) {
//       setError("Show ID not found");
//       setLoading(false);
//       return;
//     }

//     API.get(`/seats/show/${showId}`)
//       .then((res) => {
//         console.log("Seats API Response:", res.data);
//         setSeats(res.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.log("Seats API Error:", err);
//         setError("Failed to load seats");
//         setLoading(false);
//       });
//   }, [showId]);

//   return (
//     <div
//       style={{
//         minHeight: "100vh",
//         background: "#0f0f0f",
//         color: "white",
//         paddingTop: "40px"
//       }}
//     >
//       <div className="container text-center">
//         <h2
//           style={{
//             fontWeight: "bold",
//             marginBottom: "30px",
//             background: "linear-gradient(90deg,#ff1744,#ff9100)",
//             WebkitBackgroundClip: "text",
//             color: "transparent"
//           }}
//         >
//           Select Your Seat
//         </h2>

//         <p style={{ color: "#aaa", marginBottom: "20px" }}>
//           Show ID: {showId}
//         </p>

//         <div
//           style={{
//             width: "70%",
//             margin: "0 auto 40px",
//             padding: "12px",
//             background: "linear-gradient(90deg,#fff,#ddd)",
//             color: "black",
//             borderRadius: "6px",
//             fontWeight: "bold",
//             boxShadow: "0 10px 25px rgba(255,255,255,0.15)"
//           }}
//         >
//           SCREEN
//         </div>

//         {loading && <p>Loading seats...</p>}

//         {error && <p style={{ color: "red" }}>{error}</p>}

//         {!loading && !error && seats.length === 0 && (
//           <p style={{ color: "#ff9100" }}>No seats found for this show.</p>
//         )}

//         {!loading && !error && seats.length > 0 && (
//           <div
//             style={{
//               display: "grid",
//               gridTemplateColumns: "repeat(4,80px)",
//               justifyContent: "center",
//               gap: "15px",
//               marginBottom: "40px"
//             }}
//           >
//             {seats.map((seat) => (
//               <button
//                 key={seat.id}
//                 disabled={seat.status === "BOOKED"}
//                 onClick={() => setSelectedSeat(seat.seatNumber)}
//                 style={{
//                   height: "60px",
//                   borderRadius: "10px",
//                   border: "none",
//                   fontWeight: "bold",
//                   cursor: seat.status === "BOOKED" ? "not-allowed" : "pointer",
//                   transition: "0.3s",
//                   background:
//                     seat.status === "BOOKED"
//                       ? "#555"
//                       : selectedSeat === seat.seatNumber
//                       ? "#4caf50"
//                       : "#1c1c1c",
//                   color: "white",
//                   boxShadow:
//                     selectedSeat === seat.seatNumber
//                       ? "0 0 12px #4caf50"
//                       : "0 0 6px rgba(255,255,255,0.08)"
//                 }}
//               >
//                 {seat.seatNumber}
//               </button>
//             ))}
//           </div>
//         )}

//         <h4 style={{ marginBottom: "20px" }}>
//           Selected Seat:{" "}
//           <span style={{ color: "#ff1744" }}>
//             {selectedSeat || "None"}
//           </span>
//         </h4>

//         <Link
//           to={selectedSeat ? `/payment?seat=${selectedSeat}&show=${showId}` : "#"}
//           onClick={(e) => {
//             if (!selectedSeat) {
//               e.preventDefault();
//               alert("Please select a seat first");
//             }
//           }}
//           style={{
//             background: "#ff1744",
//             padding: "12px 40px",
//             color: "white",
//             borderRadius: "8px",
//             textDecoration: "none",
//             fontWeight: "bold",
//             fontSize: "18px",
//             display: "inline-block"
//           }}
//         >
//           Book Ticket
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Seats;





















import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import API from "../services/api";

function Seats() {
  const { showId } = useParams();

  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadSeats();
  }, [showId]);

  const loadSeats = async () => {
    try {
      if (!showId) {
        setError("Show ID not found");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError("");

      const res = await API.get(`/seats/show/${showId}`);
      setSeats(res.data || []);
    } catch (err) {
      console.log("Seats API Error:", err);
      setError("Failed to load seats");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelect = (seat) => {
    if (seat.status === "BOOKED" || seat.status === "BLOCKED") return;

    const alreadySelected = selectedSeats.includes(seat.seatNumber);

    if (alreadySelected) {
      setSelectedSeats(selectedSeats.filter((item) => item !== seat.seatNumber));
    } else {
      setSelectedSeats([...selectedSeats, seat.seatNumber]);
    }
  };

  const getSeatStyle = (seat) => {
    const isSelected = selectedSeats.includes(seat.seatNumber);

    if (seat.status === "BOOKED") {
      return {
        background: "#e53935",
        color: "white",
        cursor: "not-allowed",
        boxShadow: "none",
      };
    }

    if (seat.status === "BLOCKED") {
      return {
        background: "#757575",
        color: "white",
        cursor: "not-allowed",
        boxShadow: "none",
      };
    }

    if (isSelected) {
      return {
        background: "#43a047",
        color: "white",
        cursor: "pointer",
        boxShadow: "0 0 14px rgba(67,160,71,0.8)",
      };
    }

    return {
      background: "#1c1c1c",
      color: "white",
      cursor: "pointer",
      boxShadow: "0 0 6px rgba(255,255,255,0.08)",
    };
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
        padding: "40px 20px",
      }}
    >
      <div className="container text-center">
        <h2
          style={{
            fontWeight: "bold",
            marginBottom: "15px",
            background: "linear-gradient(90deg,#ff1744,#ff9100)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Select Your Seats
        </h2>

        <p style={{ color: "#aaa", marginBottom: "25px" }}>
          Show ID: {showId}
        </p>

        <div
          style={{
            width: "70%",
            margin: "0 auto 35px",
            padding: "14px",
            background: "linear-gradient(90deg,#ffffff,#d9d9d9)",
            color: "black",
            borderRadius: "8px",
            fontWeight: "bold",
            boxShadow: "0 10px 25px rgba(255,255,255,0.15)",
            letterSpacing: "2px",
          }}
        >
          SCREEN
        </div>

        {loading && <p>Loading seats...</p>}
        {error && <p style={{ color: "#ff5252" }}>{error}</p>}

        {!loading && !error && seats.length === 0 && (
          <p style={{ color: "#ff9100" }}>No seats found for this show.</p>
        )}

        {!loading && !error && seats.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 80px)",
              justifyContent: "center",
              gap: "15px",
              marginBottom: "40px",
            }}
          >
            {seats.map((seat) => (
              <button
                key={seat.id}
                disabled={seat.status === "BOOKED" || seat.status === "BLOCKED"}
                onClick={() => handleSeatSelect(seat)}
                style={{
                  height: "60px",
                  borderRadius: "12px",
                  border: "1px solid rgba(255,255,255,0.08)",
                  fontWeight: "bold",
                  transition: "0.3s",
                  ...getSeatStyle(seat),
                }}
              >
                {seat.seatNumber}
              </button>
            ))}
          </div>
        )}

        <h4 style={{ marginBottom: "10px" }}>
          Selected Seats:{" "}
          <span style={{ color: "#ff1744" }}>
            {selectedSeats.length > 0 ? selectedSeats.join(", ") : "None"}
          </span>
        </h4>

        <p style={{ color: "#aaa", marginBottom: "25px" }}>
          Total Seats: {selectedSeats.length}
        </p>

        <Link
          to={
            selectedSeats.length > 0
              ? `/payment?seats=${selectedSeats.join(",")}&show=${showId}`
              : "#"
          }
          onClick={(e) => {
            if (selectedSeats.length === 0) {
              e.preventDefault();
              alert("Please select at least one seat");
            }
          }}
          style={{
            background: "#ff1744",
            padding: "12px 40px",
            color: "white",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px",
            display: "inline-block",
          }}
        >
          Book Ticket
        </Link>
      </div>
    </div>
  );
}

export default Seats;