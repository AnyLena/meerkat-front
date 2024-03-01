import { useState } from "react";
import { motion } from "framer-motion";
import ProfileSelector from "../components/ProfileSelector";
import { createUser } from "../api/users";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { inputStyle, buttonStyle } from "../styles/MUI";

const Signup = ({ setShowLogin, setMessage, setErrorMessage }) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    picture: "/src/assets/profile_pictures/1.png",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(userData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    createUser(userData, setLoading, setMessage, setErrorMessage, setShowLogin);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      className="signup"
    >
      <div className="signup-header">
        <h2>Sign Up</h2>
      </div>

      <div className="signup-form">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Name"
            variant="outlined"
            name="name"
            required
            onChange={handleChange}
            sx={inputStyle}
          />
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            required
            onChange={handleChange}
            sx={inputStyle}
          />
          <TextField
            onChange={handleChange}
            required
            type="password"
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            sx={inputStyle}
          />

          <ProfileSelector setUserData={setUserData} />

          <Box sx={{ position: "relative" }}>
            <Button
              variant="contained"
              disabled={loading}
              type="submit"
              sx={buttonStyle}
              className="signup-btn"
            >
              Sign Up
            </Button>
          </Box>
          <div className="loading">{loading && <CircularProgress />}</div>
        </form>
      </div>
      <Button
        onClick={() => setShowLogin(true)}
        sx={{
          color: "var(--secondary-color)",
          fontSize: "1rem",
          textTransform: "none",
          marginTop: "1rem",
          ":hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        Do you have an account?
      </Button>
    </motion.div>
  );
};

export default Signup;
