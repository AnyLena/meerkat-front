import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Box, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill";
import purify from "dompurify";
import "react-quill/dist/quill.snow.css";
import { useState } from "react";

import "../../styles/create-event.css";

const TitleStep = ({ formStep, handleNext, formData, handleChange }) => {
  const [newDescription, setNewDescription] = useState("");

  const sanitizeConfig = {
    ALLOWED_TAGS: [
      "p",
      "#text",
      "h1",
      "h2",
      "h3",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "a",
    ],
    KEEP_CONTENT: false,
  };

  useEffect(() => {
    const sanitizedData = purify.sanitize(newDescription, sanitizeConfig);
    handleChange("description", sanitizedData);
  }, [newDescription]);

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
        <p className="heading-description">Description</p>
        <ReactQuill
          theme="snow"
          value={newDescription}
          onChange={setNewDescription}

        />
      </Box>
    </motion.div>
  );
};

export default TitleStep;
