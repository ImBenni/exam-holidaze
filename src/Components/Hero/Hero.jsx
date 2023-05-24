import { Box, Button, Typography } from "@mui/material";
import styles from "./Hero.module.scss";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <Box className={styles.hero}>
      <div className={styles.overlay}></div>
      <Typography variant="h1">Find your Dream Home</Typography>
      <Typography variant="body1">Stay in the world's most Remarkable Homes</Typography>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/venues");
        }}
      >
        Book Now
      </Button>
    </Box>
  );
}

export default Hero;
