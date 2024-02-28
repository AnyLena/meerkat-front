import { useState } from "react";
import image1 from "../assets/profile_pictures/1.png";
import image2 from "../assets/profile_pictures/2.png";
import image3 from "../assets/profile_pictures/3.png";
import image4 from "../assets/profile_pictures/4.png";
import image5 from "../assets/profile_pictures/5.png";
import image6 from "../assets/profile_pictures/6.png";
import image7 from "../assets/profile_pictures/7.png";
import image8 from "../assets/profile_pictures/8.png";

import {
  FaRegArrowAltCircleLeft,
  FaRegArrowAltCircleRight,
} from "react-icons/fa";

const ProfileSelector = ({ setUserData }) => {
  const [imageIndex, setImageIndex] = useState(0);

  const images = [image1, image2, image3, image4, image5, image6, image7, image8];

const handleNext = () => {
    setImageIndex((index) => {
        const newIndex = index === images.length - 1 ? 0 : index + 1;
        setUserData((prev) => ({ ...prev, picture: images[newIndex] }));
        return newIndex;
    });
};

const handlePrevious = () => {
    setImageIndex((index) => {
        const newIndex = index === 0 ? images.length - 1 : index - 1;
        setUserData((prev) => ({ ...prev, picture: images[newIndex] }));
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
              src={image}
              key={image}
            />
          ))}
        </div>

        <button
          className="left-btn"
          onClick={handlePrevious}
          type="button"
        >
          <FaRegArrowAltCircleLeft />
        </button>

        <button
          className="right-btn"
          onClick={handleNext}
          type="button"
        >
          <FaRegArrowAltCircleRight />
        </button>
      </div>
    </div>
  );
};

export default ProfileSelector;
