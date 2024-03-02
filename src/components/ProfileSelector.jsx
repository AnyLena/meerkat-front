import { useState, useEffect } from "react";
import { getProfileImages } from "../api/images";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const ProfileSelector = ({ setUserData }) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getProfileImages(setImages);
  }, []);

  const handleNext = () => {
    setImageIndex((index) => {
      const newIndex = index === images.length - 1 ? 0 : index + 1;
      setUserData((prev) => ({ ...prev, picture: images[newIndex]._id }));
      return newIndex;
    });
  };

  const handlePrevious = () => {
    setImageIndex((index) => {
      const newIndex = index === 0 ? images.length - 1 : index - 1;
      setUserData((prev) => ({ ...prev, picture: images[newIndex]._id }));
      return newIndex;
    });
  };

  return (
    <div className="profile-selector-container">
      <label>Select a profile picture</label>

      <div className="profile-selector">
        <div className="image-container">
          {images.map((image) => (
            <img
              style={{ transform: `translateX(${-100 * imageIndex}%)` }}
              src={image.url}
              key={image._id}
            />
          ))}
        </div>

        <button className="left-btn" onClick={handlePrevious} type="button">
          <FaRegArrowAltCircleLeft />
        </button>

        <button className="right-btn" onClick={handleNext} type="button">
          <FaRegArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default ProfileSelector;
