import { useState, useEffect } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Message({ message, severity }) {
  const [open, setOpen] = useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setOpen(true);
  }, [message]);

  const snackbarStyles = {
    success: {
      backgroundColor: "var(--secondary-color)",
    },
    error: {
      backgroundColor: "var(--alert-color)",
    },
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={severity}
          variant="filled"
          sx={{ width: "100%", fontSize: "1rem" }}
          style={snackbarStyles[severity]}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
