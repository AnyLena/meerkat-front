import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Box, Button } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import ConfettiExplosion from "react-confetti-explosion";
import CircularProgress from "@mui/material/CircularProgress";
import { getEventImages } from "../../api/images";

import "../../styles/create-event.css";

const ImageStep = ({
  formStep,
  handleBack,
  handleSelectImage,
  handleSubmit,
  isExploding,
  selectedImage,
}) => {

  const [images, setImages] = useState([]);

  useEffect(() => {
    getEventImages(setImages);
  }, []);

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
            key={image._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`image ${selectedImage === image._id ? "selected" : ""}`}
            style={{
              backgroundImage: `url(${image.url})`,
            }}
            onClick={() => handleSelectImage("image", image._id)}
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
          disabled={isExploding}
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
          {isExploding && (
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
        </Button>
        <div className="explosion">{isExploding && <ConfettiExplosion />}</div>
      </Box>
    </motion.div>
  );
};

export default ImageStep;
