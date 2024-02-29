import React from "react";
import { motion } from "framer-motion";

const UserProfile = ({ user }) => {

  const { name, email, contacts, picture } = user;
  
  return (
    <motion.div
      className="profile-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
    >
      <div className="profile-image">
        <img src={picture} alt={name} />
      </div>

      <div className="profile-details">
        <h2>{name}</h2>
        <p>{email}</p>
        <div className="separator"></div>
        <h3>{contacts.length}</h3>
        <p>{contacts.length === 1 ? "contact" : "contacts"}</p>
      </div>

    </motion.div>
  );
};

export default UserProfile;
