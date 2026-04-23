import React, { useEffect, useState } from "react";
import API from "../services/api";
import { useParams, Link } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Chip
} from "@mui/material";

function Shows() {

  const { movieId } = useParams();
  const [shows, setShows] = useState([]);

  useEffect(() => {

    API.get("/shows")
      .then(res => {

        const filtered = res.data.filter(
          show => show.movie.id == movieId
        );

        setShows(filtered);

      })
      .catch(err => console.log(err));

  }, [movieId]);

  return (

    <Box sx={{ background:"#0f0f0f", minHeight:"100vh", py:4 }}>

      <Container maxWidth="md">

        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            fontWeight:"700",
            mb:3,
            textAlign:"center",
            background:"linear-gradient(90deg,#ff1744,#ff9100)",
            WebkitBackgroundClip:"text",
            color:"transparent"
          }}
        >
          🎬 Available Shows
        </Typography>

        {/* NO SHOWS */}
        {shows.length === 0 && (
          <Typography sx={{ color:"#aaa", textAlign:"center" }}>
            😢 No shows available
          </Typography>
        )}

        <Grid container spacing={3}>

          {shows.map(show => (

            <Grid item xs={12} key={show.id}>

              <Card
                sx={{
                  background:"#1c1c1c",
                  color:"white",
                  borderRadius:"16px",
                  transition:"0.3s",
                  "&:hover":{
                    transform:"translateY(-5px)",
                    boxShadow:"0 10px 25px rgba(0,0,0,0.6)"
                  }
                }}
              >

                <CardContent>

                  {/* MOVIE NAME */}
                  <Typography variant="h6" sx={{ fontWeight:"600" }}>
                    {show.movie.title}
                  </Typography>

                  {/* THEATRE */}
                  <Typography sx={{ color:"#aaa", mb:2 }}>
                    📍 {show.theatre.name}
                  </Typography>

                  {/* DATE + TIME */}
                  <Box sx={{ display:"flex", gap:1, mb:2, flexWrap:"wrap" }}>

                    <Chip
                      label={show.showDate}
                      sx={{ background:"#2a2a2a", color:"white" }}
                    />

                    <Chip
                      label={show.showTime}
                      sx={{ background:"#ff1744", color:"white" }}
                    />

                  </Box>

                  {/* BUTTON */}
                  <Button
                    component={Link}
                    to={`/seats/${show.id}`}
                    variant="contained"
                    sx={{
                      background:"#ff1744",
                      "&:hover":{background:"#e6003c"}
                    }}
                  >
                    Select Seats
                  </Button>

                </CardContent>

              </Card>

            </Grid>

          ))}

        </Grid>

      </Container>

    </Box>

  );

}

export default Shows;