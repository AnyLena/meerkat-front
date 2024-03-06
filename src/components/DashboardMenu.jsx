import * as React from "react";

import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
} from "@mui/material";
import { IoMenu } from "react-icons/io5";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";

import "../styles/appbar.css";

const pages = [
  { name: "Upcoming Events", path: "/" },
  { name: "Past Events", path: "/past-events" },
];

const ResponsiveAppBar = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleProfile = () => {
    navigate("/profile");
  };

  const handleCloseNavMenu = (path) => {
    setAnchorElNav(null);
    navigate(path);
  };

  return (
    <AppBar
      className="appbar"
      position="sticky"
      sx={{ backgroundColor: "#233d4d" }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <IoMenu className="burger-icon" />
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
                <MenuItem
                  className="menu-item"
                  key={page.name}
                  onClick={() => handleCloseNavMenu(page.path)}
                >
                  <Typography
                    textAlign="center"
                    sx={{
                      mr: 2,
                      display: { xs: "flex", md: "none" },
                      flexGrow: 1,
                      fontWeight: 700,
                      fontFamily: "Oswald",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            onClick={() => navigate("/")}
            variant="h5"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: 700,
              fontFamily: "Oswald",
              textTransform: "uppercase",
              color: "white",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            Meerkat
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => {
              const pagePath = `/${page.path}`;
              return (
                <Button
                  key={page.name}
                  onClick={(e) => handleCloseNavMenu(page.path)}
                  sx={{
                    my: 2,
                    color: location.pathname === pagePath ? "#b5e9f7" : "white",
                    display: "block",
                  }}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {user.picture?.url ? (
              <IconButton onClick={handleProfile} sx={{ p: 0 }}>
                <Avatar alt={user.username} src={user.picture.url} />
              </IconButton>
            ) : null}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
