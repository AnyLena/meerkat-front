import React from "react";
import { motion } from "framer-motion";
import { Box, TextField, Button } from "@mui/material";

import { buttonStyle } from "../../styles/MUI";
import "../../styles/create-event.css";

const TitleStep = ({ formStep, handleNext, formData, handleChange }) => {
  return (
    <motion.div
      initial={{ x: -100 * formStep + "%" }}
      animate={{ x: -100 * formStep + "%" }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className="form-step title"
    >
      <label className="form-step-label">
        <p>What is it about?</p>
      </label>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { width: "100%" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Title"
          required
          variant="outlined"
          onChange={(e) => handleChange("title", e.target.value)}
        />

        <TextField
          id="outlined-multiline-static"
          label="Description"
          multiline
          rows={4}
          variant="outlined"
          style={{ marginTop: "2rem" }}
          onChange={(e) => handleChange("description", e.target.value)}
        />
      </Box>

      <Button
        disabled={!formData.title}
        type="button"
        onClick={handleNext}
        sx={{ ...buttonStyle, width: "60px", margin: "0 auto" }}
      >
        Next
      </Button>
    </motion.div>
  );
};

export default TitleStep;
