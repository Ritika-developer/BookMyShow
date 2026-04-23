// import React, { useState } from "react";
// import API from "../services/api";

// function Payment() {

//   const [method, setMethod] = useState("UPI");

//   const makePayment = () => {

//     const paymentData = {
//       amount: 300,
//       booking: {
//         id: 3
//       },
//       paymentMethod: method,
//       status: "SUCCESS"
//     };

//     API.post("/payments", paymentData)
//       .then(res => {

//         alert("Payment Successful 🎉");

//         console.log(res.data);

//       })
//       .catch(err => console.log(err));

//   };

//   return (

//     <div className="container mt-4">

//       <h2>Payment</h2>

//       <div className="card p-4">

//         <h5>Select Payment Method</h5>

//         <select
//           className="form-control mb-3"
//           onChange={(e)=>setMethod(e.target.value)}
//         >
//           <option>UPI</option>
//           <option>Credit Card</option>
//           <option>Debit Card</option>
//         </select>

//         <h4>Total Amount: ₹300</h4>

//         <button
//           className="btn btn-success mt-3"
//           onClick={makePayment}
//         >
//           Pay Now
//         </button>

//       </div>

//     </div>

//   );

// }

// export default Payment;













import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

function Payment() {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const showId = params.get("show");
  const seatsParam = params.get("seats");

  const selectedSeats = seatsParam ? seatsParam.split(",") : [];

  const [show, setShow] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    loadShow();
  }, [showId]);

  const loadShow = async () => {
    try {
      if (!showId) {
        setLoading(false);
        return;
      }

      const res = await API.get(`/shows/${showId}`);
      setShow(res.data);
    } catch (error) {
      console.log("Show fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const ticketPrice = show?.ticketPrice || 0;
  const totalAmount = ticketPrice * selectedSeats.length;


const handlePayment = async () => {
  try {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("User not logged in ❌");
      return;
    }

    setProcessing(true);

    // 🔹 1. Create Booking
    const bookingData = {
      user: { id: Number(userId) },
      show: { id: Number(showId) },
      seatNumber: selectedSeats.join(","),
      bookingTime: new Date().toISOString(),
      bookingDate: new Date().toISOString().split("T")[0],
      amount: totalAmount,
      status: "CONFIRMED"
    };

    const bookingRes = await API.post("/bookings/create", bookingData);

    console.log("Booking saved:", bookingRes.data);

    // 🔥 2. SAVE PAYMENT (IMPORTANT)
   await API.post("/payments", {
  booking: { id: bookingRes.data.id }, // ✅ FIXED
  amount: totalAmount,
  status: "SUCCESS",
  paymentMethod: paymentMethod, // ✅ FIXED
  transactionId: "TXN" + Date.now()
});

    alert("Payment Successful 🎉");

    // 🔹 3. Redirect
    navigate(`/ticket?bookingId=${bookingRes.data.id}`);

  } catch (error) {
    console.log("Payment error:", error);
    alert("Payment failed ❌");
  } finally {
    setProcessing(false);
  }
};

  if (!showId || selectedSeats.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#0f0f0f",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "20px",
        }}
      >
        Invalid payment details
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f0f0f",
        color: "white",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          background: "#181818",
          borderRadius: "16px",
          padding: "30px",
          boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            marginBottom: "25px",
            background: "linear-gradient(90deg,#ff1744,#ff9100)",
            WebkitBackgroundClip: "text",
            color: "transparent",
          }}
        >
          Payment Page
        </h2>

        {loading ? (
          <p style={{ textAlign: "center" }}>Loading show details...</p>
        ) : (
          <>
            <div
              style={{
                background: "#222",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "25px",
              }}
            >
              <h3 style={{ marginBottom: "15px", color: "#ff9100" }}>
                Booking Summary
              </h3>

              <p>
                <strong>Movie:</strong> {show?.movie?.title || "N/A"}
              </p>
              <p>
                <strong>Theatre:</strong> {show?.theatre?.name || "N/A"}
              </p>
              <p>
                <strong>Date:</strong> {show?.showDate || "N/A"}
              </p>
              <p>
                <strong>Time:</strong> {show?.showTime || "N/A"}
              </p>
              <p>
                <strong>Screen:</strong> {show?.screen || "N/A"}
              </p>
              <p>
                <strong>Seats:</strong> {selectedSeats.join(", ")}
              </p>
              <p>
                <strong>Total Seats:</strong> {selectedSeats.length}
              </p>
              <p>
                <strong>Price Per Ticket:</strong> ₹{ticketPrice}
              </p>
              <p
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  color: "#4caf50",
                  marginTop: "15px",
                }}
              >
                Total Amount: ₹{totalAmount}
              </p>
            </div>

            <div
              style={{
                background: "#222",
                padding: "20px",
                borderRadius: "12px",
                marginBottom: "25px",
              }}
            >
              <h3 style={{ marginBottom: "15px", color: "#ff9100" }}>
                Select Payment Method
              </h3>

              <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
                {["UPI", "CARD", "NET_BANKING", "CASH"].map((method) => (
                  <button
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    style={{
                      padding: "12px 20px",
                      borderRadius: "10px",
                      border: paymentMethod === method ? "2px solid #4caf50" : "1px solid #444",
                      background: paymentMethod === method ? "#1f3b22" : "#111",
                      color: "white",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <button
                onClick={handlePayment}
                disabled={processing}
                style={{
                  background: processing ? "#777" : "#ff1744",
                  color: "white",
                  border: "none",
                  padding: "14px 40px",
                  borderRadius: "10px",
                  fontSize: "18px",
                  fontWeight: "bold",
                  cursor: processing ? "not-allowed" : "pointer",
                }}
              >
                {processing ? "Processing..." : `Pay ₹${totalAmount}`}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Payment;