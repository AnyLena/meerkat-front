import React from "react";
import { motion } from "framer-motion";

const UserProfile = ({ user }) => {
  return (
    <motion.div
      className="profile-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="profile-image">
        <img src={user.user.picture} alt="profile" />
      </div>

      <div className="profile-details">
        <h2>{user.user.name}</h2>
        <p>{user.user.email}</p>
        <div className="separator"></div>
        <h3>{user.user.contacts.length}</h3>
        <p>Contacts</p>
      </div>

    </motion.div>
  );
};

export default UserProfile;
