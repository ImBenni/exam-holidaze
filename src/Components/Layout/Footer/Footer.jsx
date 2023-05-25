import styles from "./Footer.module.scss";
import { Box, Container, Typography, Link } from "@mui/material/";

function Copyright() {
  return (
    <Typography variant="body2" color="white" textAlign="center">
      {"© "}
      <Link color="inherit" href="/">
        Holidaze
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        backgroundColor: (theme) =>
          theme.palette.mode === "dark" ? theme.palette.grey[200] : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Copyright />
      </Container>
    </Box>
  );
}

export default Footer;
