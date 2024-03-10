import { motion } from "framer-motion";
import ProfileSelector from "../ProfileSelector";
import { editUser } from "../../api/users";
import { useState } from "react";
import { useAuth } from "../../context/useAuth";

const PofileSelectorModal = ({ open, setOpen, user, setUser, token }) => {
  const [newPicture, setNewPicture] = useState({
    picture: "65e237b101b8715758b7236f",
  });

  const acceptNewPicture = () => {
    editUser(user._id, token, { picture: newPicture.picture }, setUser);
    setOpen(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="profile-selector-modal"
      onClick={() => setOpen(!open)}
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()} // Stop event propagation here
      >
        <ProfileSelector setUserData={setNewPicture} />
        <div className="buttons">
          <button className="accept-btn" onClick={acceptNewPicture}>
            Accept
          </button>
          <button className="cancel-btn" onClick={() => setOpen(!open)}>
            Cancel
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default PofileSelectorModal;
