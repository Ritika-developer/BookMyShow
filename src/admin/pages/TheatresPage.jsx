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
  name: "",
  city: "",
  address: "",
  screens: "",
  contact: "",
};

export default function TheatresPage() {
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [form, setForm] = useState(initialForm);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    fetchTheatres();
  }, []);

  const fetchTheatres = async () => {
    const res = await adminApi.get("/theatres");
    setRows(res.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const payload = {
      ...form,
      screens: form.screens ? Number(form.screens) : 0,
    };

    if (editing) {
      await adminApi.put(`/theatres/${selectedId}`, payload);
    } else {
      await adminApi.post("/theatres", payload);
    }

    setOpen(false);
    setForm(initialForm);
    setEditing(false);
    setSelectedId(null);
    fetchTheatres();
  };

  const handleEdit = (row) => {
    setForm(row);
    setSelectedId(row.id);
    setEditing(true);
    setOpen(true);
  };

  const handleDelete = async () => {
    await adminApi.delete(`/theatres/${selectedId}`);
    setDeleteOpen(false);
    setSelectedId(null);
    fetchTheatres();
  };

  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Theatre Name", flex: 1 },
    { field: "city", headerName: "City", flex: 1 },
    { field: "address", headerName: "Address", flex: 1.3 },
    { field: "screens", headerName: "Screens", flex: 0.7 },
    { field: "contact", headerName: "Contact", flex: 1 },
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
      <PageHeader title="Theatres" subtitle="Manage all theatres" />

      <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
        <Typography variant="h6">Theatres List</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Add Theatre
        </Button>
      </Stack>

      <Paper sx={{ height: 500, width: "100%" }}>
        <DataGrid rows={rows} columns={columns} pageSizeOptions={[5, 10, 20]} />
      </Paper>

      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>{editing ? "Edit Theatre" : "Add Theatre"}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Theatre Name" name="name" value={form.name} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} />
              </Grid>
              <Grid item xs={12}>
                <TextField fullWidth label="Address" name="address" value={form.address} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Screens" name="screens" value={form.screens} onChange={handleChange} />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField fullWidth label="Contact" name="contact" value={form.contact} onChange={handleChange} />
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
        title="Delete Theatre"
        message="Are you sure you want to delete this theatre?"
      />
    </>
  );
}