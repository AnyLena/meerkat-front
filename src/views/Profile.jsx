import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/profile.css";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../context/useAuth";
import { useState } from "react";
import { searchUsers } from "../api/users";

// Components
import UserProfile from "../components/Profile/UserProfile";
import SearchBar from "../components/Profile/SearchBar";
import SearchResults from "../components/Profile/SearchResults";

const Profile = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { user, token } = useAuth();
  console.log(user);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    setSearchResults([]);
    setSearchQuery("");
    searchUsers(searchQuery, token, setSearchResults);
  };

  return (
    <div className="profile">
      <motion.div
        initial={{ y: -600, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="profile-header"
      >
        <Button
          className="back-btn"
          onClick={() => navigate(-1)}
          sx={{
            borderRadius: "50%",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "white",
            width: "40px",
            height: "40px",
            minWidth: "0 !important",
          }}
        >
          <IoIosArrowBack style={{ fontSize: "1.25rem" }} />
        </Button>
        <div className="title-container">
          <h2>Profile</h2>
        </div>
      </motion.div>

      <UserProfile user={user} />

      <div className="search">
        <SearchBar
          handleSearch={handleSearch}
          setSearch={setSearchQuery}
          searchQuery={searchQuery}
        />
        <SearchResults searchResults={searchResults} />
      </div>
    </div>
  );
};

export default Profile;
