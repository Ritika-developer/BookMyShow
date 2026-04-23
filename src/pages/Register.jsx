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

export default function Register() {

  const [data, setData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await axios.post("http://localhost:8080/api/auth/register", data);
      alert("Registered Successfully");
      navigate("/login");
    } catch (err) {
      alert("Something went wrong");
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
          Register 🎟️
        </Typography>

        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />

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
          onClick={handleRegister}
        >
          Register
        </Button>

        <Typography sx={{ mt: 2 }}>
          Already have an account?{" "}
          <Link to="/login" style={{ color: "#ff1744" }}>
            Login
          </Link>
        </Typography>

      </Paper>

    </Box>
  );
}