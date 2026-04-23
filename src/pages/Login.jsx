import { useState } from "react";
import axios from "axios";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {

  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const res = await axios.post("http://localhost:8080/api/auth/login", data);

    // 👉 Agar backend error bhej raha hai
    if (res.data.error) {
      if (res.data.error === "User not registered") {
        alert("User not registered, please register first");
        navigate("/register"); // 🔥 auto redirect
      } else {
        alert(res.data.error);
      }
      return;
    }

    // ✅ Login success
    localStorage.setItem("user", JSON.stringify(res.data));

        localStorage.setItem("userId", res.data.id);
        
    if (res.data.role === "ADMIN") {
      navigate("/admin");
    } else {
      navigate("/");
    }

  } catch (err) {
    alert("Server error");
  }
};

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #141e30, #243b55)"
      }}
    >

      <Paper
        elevation={10}
        sx={{
          padding: "40px",
          width: "350px",
          borderRadius: "12px",
          textAlign: "center"
        }}
      >

        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
          Login 🎬
        </Typography>

        <TextField
          fullWidth
          label="Email"
          margin="normal"
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          margin="normal"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <Button
          fullWidth
          variant="contained"
          sx={{
            mt: 2,
            background: "#ff1744",
            "&:hover": { background: "#e6003c" }
          }}
          onClick={handleLogin}
        >
          Login
        </Button>

        <Typography sx={{ mt: 2 }}>
          Don't have an account?{" "}
          <Link to="/register" style={{ color: "#ff1744" }}>
            Register
          </Link>
        </Typography>

      </Paper>

    </Box>
  );
}