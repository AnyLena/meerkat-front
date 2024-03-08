import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/profile.css";
import { IoIosArrowBack } from "react-icons/io";
import { useAuth } from "../context/useAuth";
import { useState, useEffect } from "react";
import { searchUsers } from "../api/users";
import { getMyFriendRequests } from "../api/invitations";

// Components
import UserProfile from "../components/Profile/UserProfile";
import LatestFriends from "../components/Profile/LatestFriends";
import FriendshipRequests from "../components/Profile/FriendshipRequests";
import SearchBar from "../components/Profile/SearchBar";
import SearchResults from "../components/Profile/SearchResults";

const Profile = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const { user, setUser, token, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim() === "") return;
    setSearchResults([]);
    setSearchQuery("");
    searchUsers(searchQuery, token, setSearchResults);
  };

  useEffect(() => {
    getMyFriendRequests(token, setInvitations);
  }, [token]);

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
        <Button
          onClick={logout}
          sx={{
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            color: "grey",
            borderRadius: 0,
            textTransform: "none",
          }}
        >
          Logout
        </Button>
      </motion.div>

      <UserProfile user={user} />

      <div className="search">
        <LatestFriends user={user} token={token} setUser={setUser} />
        <FriendshipRequests
          invitations={invitations}
          setInvitations={setInvitations}
          user={user}
          token={token}
          setUser={setUser}
        />
        <SearchBar
          handleSearch={handleSearch}
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}
        />
        <SearchResults
          searchResults={searchResults}
          invitations={invitations}
          setInvitations={setInvitations}
          setUser={setUser}
        />
      </div>
    </div>
  );
};

export default Profile;
