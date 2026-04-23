import React, { useEffect, useState } from "react";
import {
  Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid,
  IconButton, Paper, Stack, TextField, Typography, MenuItem
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../components/PageHeader";
import ConfirmDialog from "../components/ConfirmDialog";
import adminApi from "../services/adminApi";

const initialForm = {
  title: "",
  genre: "",
  language: "",
  duration: "",
  rating: "",
  posterUrl: "",
  city: ""   // 🔥 important
};

export default function MoviesPage() {

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);
  const [file, setFile] = useState(null);

  // ☁️ Cloudinary Upload
  const uploadImageToCloudinary = async () => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "movie_preset");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzbhmkmbg/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();
    return data.secure_url;
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    const res = await adminApi.get("/movies");
    setRows(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔥 SAVE
  const handleSave = async () => {
    try {
      let imageUrl = form.posterUrl;

      if (file) {
        imageUrl = await uploadImageToCloudinary();
      }

      const finalData = {
        ...form,
        posterUrl: imageUrl,
      };

      if (editing) {
        await adminApi.put(`/movies/${selectedId}`, finalData);
      } else {
        await adminApi.post("/movies", finalData);
      }

      setOpen(false);
      setForm(initialForm);
      setFile(null);
      setEditing(false);
      setSelectedId(null);
      fetchMovies();

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  const handleEdit = (row) => {
    setForm(row);
    setSelectedId(row.id);
    setEditing(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    await adminApi.delete(`/movies/${selectedId}`);
    setDeleteOpen(false);
    setSelectedId(null);
    fetchMovies();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "title", headerName: "Title", flex: 1 },
    { field: "genre", headerName: "Genre", flex: 1 },
    { field: "language", headerName: "Language", flex: 1 },
    { field: "city", headerName: "City", flex: 1 }, // 🔥 show city
    { field: "rating", headerName: "Rating", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => {
            setSelectedId(params.row.id);
            setDeleteOpen(true);
          }}>
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Movies" subtitle="Manage all movies" />

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Movies List</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Movie
        </Button>
      </Stack>

      <Paper sx={{ height: 500 }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10]} />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editing ? "Edit Movie" : "Add Movie"}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid item xs={6}>
              <TextField fullWidth label="Title" name="title" value={form.title} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Genre" name="genre" value={form.genre} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Language" name="language" value={form.language} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Duration" name="duration" value={form.duration} onChange={handleChange} />
            </Grid>

            <Grid item xs={6}>
              <TextField fullWidth label="Rating" name="rating" value={form.rating} onChange={handleChange} />
            </Grid>

            {/* 🌆 CITY DROPDOWN */}
            <Grid item xs={6}>
              <TextField
                select
                fullWidth
                label="City"
                name="city"
                value={form.city}
                onChange={handleChange}
              >
                <MenuItem value="Bhopal">Bhopal</MenuItem>
                <MenuItem value="Delhi">Delhi</MenuItem>
                <MenuItem value="Mumbai">Mumbai</MenuItem>
              </TextField>
            </Grid>

            {/* 📁 IMAGE */}
            <Grid item xs={12}>
              <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            </Grid>

            {file && (
              <Grid item xs={12}>
                <img src={URL.createObjectURL(file)} width="120" />
              </Grid>
            )}

          </Grid>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Movie"
        message="Are you sure?"
      />
    </>
  );
}