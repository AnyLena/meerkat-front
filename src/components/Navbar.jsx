import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import "../styles/navbar.css";

import Home from "../assets/home.png";
import Plus from "../assets/plus.png";
import Profile from "../assets/profile.png";
import HomeActive from "../assets/home_r.png";
import PlusActive from "../assets/plus_r.png";
import ProfileActive from "../assets/profile_r.png";

const Navbar = () => {
  const [value, setValue] = useState(0);

  const navigate = useNavigate();

  const navStyle = {

    backgroundColor: 'var(--background-color)',
    position: "fixed",
    height: "70px",
    bottom: 0,
    width: "100%",
    zIndex: 1000,
  };

  return (
    <nav>
      <BottomNavigation
        style={navStyle}
        value={value}
        sx={{ flexGrow: 1 }}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction
          icon={
            <img
              src={value === 0 ? HomeActive : Home}
              className="ico-sm"
              alt="home"
            />
          }
          onClick={() => {
            navigate("/");
          }}
        />
        <BottomNavigationAction
          icon={
            <img src={value === 1 ? PlusActive : Plus} 
            alt="Create Event" />
          }
          onClick={() => {
            navigate("/new");
          }}
        />
        <BottomNavigationAction
          icon={
            <img
              src={value === 2 ? ProfileActive : Profile}
              className="ico-sm"
              alt="profile"
            />
          }
          onClick={() => {
            navigate("/profile");
          }}
        />
      </BottomNavigation>
    </nav>
  );
};

export default Navbar;
