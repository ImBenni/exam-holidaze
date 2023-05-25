import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, IconButton, Typography, Menu, MenuItem, Tooltip, Avatar, ListItemIcon } from "@mui/material";
import { useProfile } from "../../../../Hooks/useFetch";
import { AccountCircle, ExitToApp, Person } from "@mui/icons-material";
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';

const loggedSettings = ["Profile", "Logout"];
const settings = ["Log In", "Sign Up"];

function HeaderProfile() {
  const storedProfile = JSON.parse(localStorage.getItem("profile"));
  const [profile, isLoading] = useProfile(storedProfile?.name);
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem("accessToken");

  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("profile");
    navigate("/login");
    window.location.reload();
  };

  const renderMenuItem = (setting) => {
    let destination;
    let icon;

    switch (setting) {
      case "Log In":
        destination = "/login";
        icon = <LoginOutlinedIcon />;
        break;
      case "Sign Up":
        destination = "/signup";
        icon = <Person />;
        break;
      case "Profile":
        destination = "/profile";
        icon = <AccountCircle />;
        break;
      case "Logout":
        destination = null;
        icon = <ExitToApp />;
        break;
      default:
        destination = null;
    }

    const clickHandler = (event) => {
      if (setting === "Logout") {
        handleLogout();
      } else {
        handleCloseUserMenu();
      }
    };

    return (
      <Link to={destination} style={{ color: "black", textDecoration: "none" }} key={setting}>
        <MenuItem onClick={clickHandler}>
          <ListItemIcon>{icon}</ListItemIcon>
          <Typography textAlign="start">{setting}</Typography>
        </MenuItem>
      </Link>
    );
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open profile">
        <IconButton onClick={handleOpenUserMenu} type="profileButton" sx={{ p: 0 }}>
          <Avatar alt="Loading..." src={isLoading ? null : profile?.avatar} />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        {(isLoggedIn ? loggedSettings : settings).map(renderMenuItem)}
      </Menu>
    </Box>
  );
}

export default HeaderProfile;
