import React from "react";
import { addContact } from "../../api/users";
import { useAuth } from "../../context/useAuth";

const UserCard = ({ contact }) => {
  const { user, token } = useAuth();

  const handleAdd = (contactId) => {
    addContact(contactId, user.user._id, token);
  };

  return (
    <div className="user-card">
      <div className="user-image">
        <img src={contact.picture} alt="profile" />
      </div>
      <div className="user-details">
        <h2>{contact.name}</h2>
        <p>{contact.email}</p>
      </div>

      <div className="buttons">
        <button className="btn" onClick={() => handleAdd(contact._id)}>
          Add to Contacts
        </button>
      </div>
    </div>
  );
};

export default UserCard;
