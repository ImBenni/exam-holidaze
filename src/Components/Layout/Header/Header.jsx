import { useState } from "react";
import { Link } from "react-router-dom";
import { AppBar, Box, Container, IconButton, Toolbar, Menu, MenuItem, Button, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HeaderProfile from "./HeaderProfile/HeaderProfile";

const pages = ["Home", "Venues"];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar color="background" position="sticky">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Oleo Script",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Holidaze
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="hamburger menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link
                  to={page === "Home" ? "/" : `/${page.toLowerCase()}`}
                  style={{ textDecoration: "none", color: "black" }}
                  key={page}
                >
                  <MenuItem onClick={handleCloseNavMenu}>
                    {page}
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h4"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Oleo Script",
              fontWeight: 800,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Holidaze
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link 
                to={page === "Home" ? "/" : `/${page.toLowerCase()}`} 
                style={{ textDecoration: "none" }}
                key={page}
              >
                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: "black", display: "block" }}>
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <HeaderProfile />
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
