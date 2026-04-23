import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PageHeader from "../components/PageHeader";
import ConfirmDialog from "../components/ConfirmDialog";
import adminApi from "../services/adminApi";

const initialForm = {
  movieId: "",
  theatreId: "",
  screen: "",
  showDate: "",
  showTime: "",
  ticketPrice: "",
  availableSeats: "",
};

export default function ShowsPage() {
  const [rows, setRows] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theatres, setTheatres] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchShows();
    fetchMovies();
    fetchTheatres();
  }, []);

  const fetchShows = async () => {
    const res = await adminApi.get("/shows");
    setRows(res.data);
  };

  const fetchMovies = async () => {
    const res = await adminApi.get("/movies");
    setMovies(res.data);
  };

  const fetchTheatres = async () => {
    const res = await adminApi.get("/theatres");
    setTheatres(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const payload = {
      movieId: Number(form.movieId),
      theatreId: Number(form.theatreId),
      screen: form.screen,
      showDate: form.showDate,
      showTime: form.showTime,
      ticketPrice: Number(form.ticketPrice),
      availableSeats: Number(form.availableSeats),
    };

    if (editing) {
      await adminApi.put(`/shows/${selectedId}`, payload);
    } else {
      await adminApi.post("/shows", payload);
    }

    setOpen(false);
    setForm(initialForm);
    setEditing(false);
    setSelectedId(null);
    fetchShows();
  };

  const handleEdit = (row) => {
    setForm({
      movieId: row.movieId || row.movie?.id || "",
      theatreId: row.theatreId || row.theatre?.id || "",
      screen: row.screen || "",
      showDate: row.showDate || "",
      showTime: row.showTime || "",
      ticketPrice: row.ticketPrice || "",
      availableSeats: row.availableSeats || "",
    });
    setSelectedId(row.id);
    setEditing(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    await adminApi.delete(`/shows/${selectedId}`);
    setDeleteOpen(false);
    setSelectedId(null);
    fetchShows();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "movieName", headerName: "Movie", flex: 1, valueGetter: (_, row) => row.movieName || row.movie?.title || "" },
    { field: "theatreName", headerName: "Theatre", flex: 1, valueGetter: (_, row) => row.theatreName || row.theatre?.name || "" },
    { field: "screen", headerName: "Screen", flex: 0.7 },
    { field: "showDate", headerName: "Date", flex: 0.9 },
    { field: "showTime", headerName: "Time", flex: 0.8 },
    { field: "ticketPrice", headerName: "Price", flex: 0.8 },
    { field: "availableSeats", headerName: "Seats", flex: 0.8 },
    {
      field: "actions",
      headerName: "Actions",
      width: 140,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => handleEdit(params.row)}>
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              setSelectedId(params.row.id);
              setDeleteOpen(true);
            }}
          >
            <DeleteIcon />
          </IconButton>
        </>
      ),
    },
  ];

  return (
    <>
      <PageHeader title="Shows" subtitle="Manage all shows" />

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Shows List</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Show
        </Button>
      </Stack>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editing ? "Edit Show" : "Add Show"}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Movie"
                  name="movieId"
                  value={form.movieId}
                  onChange={handleChange}
                >
                  {movies.map((movie) => (
                    <MenuItem key={movie.id} value={movie.id}>
                      {movie.title}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  select
                  fullWidth
                  label="Theatre"
                  name="theatreId"
                  value={form.theatreId}
                  onChange={handleChange}
                >
                  {theatres.map((theatre) => (
                    <MenuItem key={theatre.id} value={theatre.id}>
                      {theatre.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Screen" name="screen" value={form.screen} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Show Date"
                  name="showDate"
                  value={form.showDate}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="time"
                  label="Show Time"
                  name="showTime"
                  value={form.showTime}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Ticket Price" name="ticketPrice" value={form.ticketPrice} onChange={handleChange} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Available Seats" name="availableSeats" value={form.availableSeats} onChange={handleChange} />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>

      <ConfirmDialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        title="Delete Show"
        message="Are you sure you want to delete this show?"
      />
    </>
  );
}