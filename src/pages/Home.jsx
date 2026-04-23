import { Container, Box, Typography, Button } from "@mui/material";
import Slider from "react-slick";
import { useNavigate } from "react-router-dom";

import banner1 from "../assets/1467721201-5966.avif";
import banner2 from "../assets/1_Axpr5dmgrOmNHel2DOJDOQ.jpg";
import banner3 from "../assets/Big-Cinemas.jpg.jpg";

function Home() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 700,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500
  };

  const banners = [
    {
      img: banner1,
      title: "Experience Cinema Like Never Before",
      desc: "Book tickets for the latest movies and events"
    },
    {
      img: banner2,
      title: "Watch Latest Blockbusters",
      desc: "Enjoy premium movie experience near you"
    },
    {
      img: banner3,
      title: "Live Events & Shows",
      desc: "Concerts, sports and entertainment"
    }
  ];

  const navigate = useNavigate();

return (

  <Box
    sx={{
      background: "#0f0f0f",
      height: "85vh",
      width: "100%"
    }}
  >

    <Slider {...settings} className="hero-slider">

      {banners.map((banner, index) => (

        <Box
          key={index}
          sx={{
            position: "relative",
            height: "90vh",
            width: "100%",
            overflow: "hidden"
          }}
        >

          {/* IMAGE */}

          <img
            src={banner.img}
            alt="banner"
            style={{
              width: "100%",
              height: "90vh",
              objectFit: "cover"
            }}
          />

          {/* GRADIENT OVERLAY */}

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background:
                "linear-gradient(90deg, rgba(0,0,0,0.85) 15%, rgba(0,0,0,0.2) 60%)"
            }}
          />

          {/* FLOATING TEXT */}

          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "100px",
              transform: "translateY(-50%)",
              color: "white",
              maxWidth: "500px"
            }}
          >

            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", marginBottom: "20px" }}
            >
              {banner.title}
            </Typography>

            <Typography
              sx={{
                marginBottom: "25px",
                color: "#ddd",
                fontSize: "20px"
              }}
            >
              {banner.desc}
            </Typography>

            <Button
  variant="contained"
  color="error"
  size="large"
  onClick={() => navigate("/movies")}
>
  Book Tickets
</Button>

          </Box>

        </Box>

      ))}

    </Slider>

  </Box>

);

}

export default Home;