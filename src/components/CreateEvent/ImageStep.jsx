import React from "react";
import { motion } from "framer-motion";
import { Box, Button } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import "../../styles/create-event.css";

const ImageStep = ({
  formStep,
  handleNext,
  handleBack,
  images,
  handleSelectImage,
  handleSubmit,
}) => {
  return (
    <motion.div
      initial={{ x: -100 * formStep + "%" }}
      animate={{ x: -100 * formStep + "%" }}
      transition={{ ease: "easeOut", duration: 0.3 }}
      className="form-step image"
    >
      <label className="form-step-label-last">
        <p>Select an image. Done!</p>
      </label>

      <div className="image-container">
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="image"
            style={{
              backgroundImage: `url(${image})`,
            }}
            onClick={() => handleSelectImage("image", image)}
          ></motion.div>
        ))}
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "4rem",
          marginBottom: "8rem",
        }}
      >
        <Button sx={buttonStyle} type="button" onClick={handleBack}>
          Back
        </Button>
        <Button
          className="create-event-btn"
          type="submit"
          onClick={handleSubmit}
          sx={{
            animation: "pulse 2s infinite",
            backgroundColor: "var(--headingBG-color)",
            color: "black",
            "&:hover": {
              backgroundColor: "var(--headingBG-color)",
            },
          }}
        >
          Create Event
        </Button>
      </Box>
    </motion.div>
  );
};

export default ImageStep;
