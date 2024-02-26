import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import "../styles/login.css";
import { motion } from "framer-motion";
import image from "../assets/decorations/traveler.jpg";

// MUI
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../context/theme";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { login, user } = useAuth();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

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

  const timer = useRef();

  const buttonSx = {
    ...(success && {
      bgcolor: "var(--quaternary-color)",
      "&:hover": {
        bgcolor: "var(--quaternary-color)",
      },
    }),
  };

  useEffect(() => {
    return () => {
      clearTimeout(timer.current);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loading) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(async () => {
        setSuccess(true);
        await login(userData, setMessage);
        setLoading(false);
      }, 2000);
    }
  };
  return (
    <ThemeProvider theme={theme}>
      <motion.div
        initial={{ opacity: 0, y: -300 }}
        animate={{ opacity: 1, y: 0 }}
        className="login"
      >
        <div className="login-header">
          <h2>Login</h2>
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
            />
            <TextField
              onChange={handleChange}
              required
              name="password"
              id="outlined-basic"
              label="Password"
              variant="outlined"
            />
            <Box sx={{ position: "relative" }}>
              <Button
                variant="contained"
                sx={buttonSx}
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
        {message && <p>{message}</p>}
      </motion.div>
    </ThemeProvider>
  );
};

export default Login;
