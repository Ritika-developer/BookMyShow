import React, { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Avatar,
  Stack
} from "@mui/material";
import API from "../services/api";

export default function Profile() {

  const [user, setUser] = useState(null);
  const [edit, setEdit] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: ""
  });

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setForm({
        name: storedUser.name || "",
        email: storedUser.email || "",
        phone: storedUser.phone || ""
      });
    }
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSave = async () => {
    try {
      const res = await API.put(`/users/${user.id}`, form);

      localStorage.setItem("user", JSON.stringify(res.data));
      setUser(res.data);
      setEdit(false);

      alert("Profile updated ✅");
    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

const inputStyle = {
  mb: 2,

  // 🔥 TEXT COLOR (IMPORTANT FIX)
  "& .MuiOutlinedInput-input": {
    color: "#fff !important",
    WebkitTextFillColor: "#fff !important", // 🔥 fixes Chrome autofill issue
  },

  // 🔥 LABEL
  "& .MuiInputLabel-root": {
    color: edit ? "#ff1744" : "#aaa",
  },

  // 🔥 BORDER + BACKGROUND
  "& .MuiOutlinedInput-root": {
    background: edit ? "rgba(255,255,255,0.08)" : "transparent",
    borderRadius: "10px",

    "& fieldset": {
      borderColor: edit ? "#ff1744" : "#555",
    },

    "&:hover fieldset": {
      borderColor: "#ff1744",
    },

    "&.Mui-focused fieldset": {
      borderColor: "#ff1744",
      boxShadow: "0 0 8px rgba(255,23,68,0.5)"
    }
  }
};

  if (!user) {
    return <h2 style={{ padding: "20px" }}>Please login first</h2>;
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg,#000000,#1a1a1a,#0f2027)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px"
      }}
    >
      <Paper
        elevation={10}
        sx={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          padding: "30px",
          backdropFilter: "blur(12px)",
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.1)",
          color: "white",
          boxShadow: "0 8px 40px rgba(0,0,0,0.7)"
        }}
      >
        {/* 🔥 HEADER */}
        <Stack alignItems="center" spacing={2} mb={3}>
          <Avatar
            sx={{
              width: 90,
              height: 90,
              fontSize: "32px",
              bgcolor: "#ff1744",
              boxShadow: "0 0 20px rgba(255,23,68,0.6)"
            }}
          >
            {user.name?.charAt(0)}
          </Avatar>

          <Typography variant="h5" fontWeight="bold">
            {user.name}
          </Typography>

          <Typography variant="body2" color="#bbb">
            {user.email}
          </Typography>
        </Stack>

        {/* 🔥 FORM */}
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          disabled={!edit}
          sx={inputStyle}
        />

        <TextField
          fullWidth
          label="Email"
          value={form.email}
          disabled
          sx={{
            ...inputStyle,
            "& .MuiInputBase-input": { color: "#888" }
          }}
        />

        <TextField
          fullWidth
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          disabled={!edit}
          sx={inputStyle}
        />

        {/* 🔥 BUTTON */}
        {!edit ? (
          <Button
            fullWidth
            variant="contained"
            onClick={() => setEdit(true)}
            sx={{
              mt: 2,
              background: "linear-gradient(45deg,#ff1744,#ff9100)",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": {
                background: "linear-gradient(45deg,#e6003c,#ff6d00)"
              }
            }}
          >
            Edit Profile
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            onClick={handleSave}
            sx={{
              mt: 2,
              background: "linear-gradient(45deg,#4caf50,#2e7d32)",
              borderRadius: "12px",
              fontWeight: "bold",
              fontSize: "16px",
              "&:hover": {
                background: "linear-gradient(45deg,#388e3c,#1b5e20)"
              }
            }}
          >
            Save Changes
          </Button>
        )}
      </Paper>
    </Box>
  );
}