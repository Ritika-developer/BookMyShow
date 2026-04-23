

import React, { useEffect, useState } from "react";
import API from "../services/api";
import { Link, useLocation } from "react-router-dom";

import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardContent,
  Button
} from "@mui/material";

function Movies() {

  const [movies, setMovies] = useState([]);

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  const searchQuery = queryParams.get("search") || "";
  const city = queryParams.get("city") || "ALL";

  useEffect(() => {
    API.get("/movies")
      .then(res => setMovies(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesCity =
      city === "ALL" ||
      movie.city?.toLowerCase() === city.toLowerCase();

    return matchesSearch && matchesCity;
  });

  return (

    <Box sx={{ background:"#0f0f0f", minHeight:"100vh", paddingTop:"30px" }}>

      <Container maxWidth="lg">

        {/* HEADER */}
        <Typography
          variant="h4"
          sx={{
            fontWeight:"700",
            marginBottom:"20px",
            textAlign:"center",
            background:"linear-gradient(90deg,#ff1744,#ff9100)",
            WebkitBackgroundClip:"text",
            color:"transparent"
          }}
        >
          Movies in {city === "ALL" ? "All Cities" : city}
        </Typography>

        {/* SEARCH TEXT */}
        {searchQuery && (
          <Typography sx={{ color:"#aaa", mb:3, textAlign:"center" }}>
            Showing results for: <b>{searchQuery}</b>
          </Typography>
        )}

        {/* NO RESULT */}
        {filteredMovies.length === 0 && (
          <Typography sx={{ color:"gray", mt:3, textAlign:"center" }}>
            😢 No movies found
          </Typography>
        )}

        {/* GRID FIX */}
        <Grid 
          container 
          spacing={3} 
          justifyContent="center"
        >

          {filteredMovies.map(movie => (

            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={3} 
              key={movie.id}
              sx={{ display:"flex", justifyContent:"center" }}
            >

              <Card
                sx={{
                  background:"#1c1c1c",
                  color:"white",
                  borderRadius:"12px",
                  overflow:"hidden",
                  transition:"0.3s",
                  width:"100%",
                  maxWidth:"260px",   // 🔥 IMPORTANT FIX
                  display:"flex",
                  flexDirection:"column",
                  "&:hover":{
                    transform:"translateY(-6px) scale(1.02)",
                    boxShadow:"0 15px 30px rgba(0,0,0,0.7)"
                  }
                }}
              >

                {/* IMAGE */}
                <Box
                  sx={{
                    height:"360px",
                    width:"100%",
                    overflow:"hidden",
                    background:"#000"
                  }}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    onError={(e)=>{
                      e.target.src="https://via.placeholder.com/300x450?text=No+Image"
                    }}
                    style={{
                      width:"100%",
                      height:"100%",
                      objectFit:"cover"
                    }}
                  />
                </Box>

                {/* CONTENT */}
                <CardContent sx={{ flexGrow:1 }}>

                  <Typography
                    variant="h6"
                    sx={{
                      whiteSpace:"nowrap",
                      overflow:"hidden",
                      textOverflow:"ellipsis"
                    }}
                  >
                    {movie.title}
                  </Typography>

                  <Typography sx={{ color:"#aaa", fontSize:"14px" }}>
                    {movie.genre} • {movie.language}
                  </Typography>

                  <Typography sx={{ mt:1 }}>
                    ⭐ {movie.rating}
                  </Typography>

                  <Button
                    component={Link}
                    to={`/shows/${movie.id}`}
                    variant="contained"
                    fullWidth
                    sx={{
                      mt:2,
                      background:"#ff1744",
                      "&:hover":{background:"#e6003c"}
                    }}
                  >
                    Book Now
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

export default Movies;