import React, { useEffect, useState } from "react";
import { Grid, Paper, Typography } from "@mui/material";
import PageHeader from "../components/PageHeader";
import StatCard from "../components/StatCard";
import adminApi from "../services/adminApi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalMovies: 0,
    totalTheatres: 0,
    totalShows: 0,
    totalBookings: 0,
    totalUsers: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    const res = await adminApi.get("/dashboard/stats");
    setStats(res.data);
  };

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Overview of your BookMyShow admin system" />
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Movies" value={stats.totalMovies} /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Theatres" value={stats.totalTheatres} /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Shows" value={stats.totalShows} /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Bookings" value={stats.totalBookings} /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Users" value={stats.totalUsers} /></Grid>
        <Grid item xs={12} sm={6} md={4}><StatCard title="Total Revenue" value={`₹${stats.totalRevenue}`} /></Grid>
        
      </Grid>
    </>
  );
}