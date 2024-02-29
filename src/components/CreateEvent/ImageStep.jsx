import React from "react";
import { motion } from "framer-motion";
import { Box, Button } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import ConfettiExplosion from "react-confetti-explosion";
import CircularProgress from "@mui/material/CircularProgress";

import "../../styles/create-event.css";

import bg1 from "../../assets/backgrounds/1.webp";
import bg2 from "../../assets/backgrounds/2.webp";
import bg3 from "../../assets/backgrounds/3.webp";
import bg4 from "../../assets/backgrounds/4.webp";
import bg5 from "../../assets/backgrounds/5.webp";
import bg6 from "../../assets/backgrounds/6.webp";
import bg7 from "../../assets/backgrounds/7.webp";
import bg8 from "../../assets/backgrounds/8.webp";
import bg9 from "../../assets/backgrounds/9.webp";
import bg10 from "../../assets/backgrounds/10.webp";
import bg11 from "../../assets/backgrounds/11.webp";
import bg12 from "../../assets/backgrounds/12.webp";

const ImageStep = ({
  formStep,
  handleBack,
  handleSelectImage,
  handleSubmit,
  isExploding,
}) => {
  const images = [
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
    bg10,
    bg11,
    bg12,
  ];
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
