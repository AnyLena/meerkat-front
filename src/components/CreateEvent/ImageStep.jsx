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
    </motion.div>
  );
};

export default ImageStep;
