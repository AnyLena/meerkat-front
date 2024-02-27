import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";
import image from "../assets/decorations/traveler.jpg";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { buttonStyle, inputStyle } from "../styles/MUI";

const Login = ({ setShowLogin, setMessage, setErrorMessage }) => {
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate("/");
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(userData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setErrorMessage("");
    await login(userData, setLoading, setMessage, setErrorMessage);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -300 }}
      animate={{ opacity: 1, y: 0 }}
      className="login"
    >
      <div className="login-header">
        <h2>Login</h2>
        <Button onClick={() => setShowLogin(false)}>Sign Up ?</Button>
      </div>

      <div className="login-image">
        <img src={image} alt="traveler" />
      </div>
      
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <TextField
            id="outlined-basic"
            label="Email"
            variant="outlined"
            name="email"
            required
            onChange={handleChange}
            sx={inputStyle}
          />
          <TextField
            onChange={handleChange}
            required
            name="password"
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            sx={inputStyle}
          />
          <Box sx={{ position: "relative" }}>
            <Button
              variant="contained"
              sx={buttonStyle}
              disabled={loading}
              type="submit"
            >
              Login
            </Button>
            {loading && (
              <CircularProgress
                size={24}
                sx={{
                  color: "var(--primary-color)",
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  marginTop: "-12px",
                  marginLeft: "-12px",
                }}
              />
            )}
          </Box>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
