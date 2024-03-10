import { useState } from "react";
import { motion } from "framer-motion";
import ProfileSelectorModal from "./ProfileSelectorModal";

const UserProfile = ({ user, setUser, token }) => {
  const { name, email, contacts, picture } = user;
  const [open, setOpen] = useState(false);

  const handleOpenModal = () => {
    setOpen(true);
  };

  return (
    <>
      <motion.div
        className="profile-content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
      >
        <div className="profile-image" onClick={handleOpenModal}>
          <img src={picture.url} alt={name} />
        </div>

        <div className="profile-details">
          <h2>{name}</h2>
          <p>{email}</p>
          <div className="separator"></div>
          <h3>{contacts.length}</h3>
          <p>{contacts.length === 1 ? "friend" : "friends"}</p>
        </div>
      </motion.div>
      {open && (
        <ProfileSelectorModal
          open={open}
          setOpen={setOpen}
          setUser={setUser}
          user={user}
          token={token}
        />
      )}
    </>
  );
};

export default UserProfile;
