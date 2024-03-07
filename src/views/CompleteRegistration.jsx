import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { decryptToken } from "../api/users.js";
import ProfileSelector from "../components/ProfileSelector";
import "../styles/landing.css";
import { motion } from "framer-motion";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { inputStyle, buttonStyle } from "../styles/MUI";
import { completeRegistration } from "../api/users.js";
import { useNavigate } from "react-router-dom";

const CompleteRegistration = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

  const [decryptedToken, setDecryptedToken] = useState("");
  const [userData, setUserData] = useState({
    name: "",
    email: decryptedToken.email,
    password: "",
    picture: "65e237b101b8715758b7236f",
  });

  useEffect(() => {
    decryptToken(token, setDecryptedToken);
    console.log(token);
  }, [token]);

  useEffect(() => {
    setUserData((prev) => ({
      ...prev,
      email: decryptedToken.email,
    }));
  }, [decryptedToken]);

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
    console.log(userData);
    completeRegistration(userData, decryptedToken.id);

    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      className="signup"
    >
      <div className="signup-header">
        <h2>Complete registration</h2>
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
            value={decryptedToken.email}
            disabled
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
              Complete registration
            </Button>
          </Box>
          <div className="loading">{loading && <CircularProgress />}</div>
        </form>
      </div>
    </motion.div>
  );
};

export default CompleteRegistration;
