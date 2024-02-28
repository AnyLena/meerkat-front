import React from "react";
import { addContact, removeContact } from "../../api/users";
import { useAuth } from "../../context/useAuth";

const UserCard = ({ contact }) => {
  const { user, token, setUser } = useAuth();
  console.log(user.contacts.includes(contact._id), contact._id);

  const handleAdd = (contactId) => {
    addContact(contactId, user._id, token, setUser);
  };

  const handleRemove = (contactId) => {
    removeContact(contactId, user._id, token, setUser);
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

        {!user.contacts.includes(contact._id) ? (
          <button className="btn" onClick={() => handleAdd(contact._id)}>
            Add to Contacts
          </button>
        ) : (
          <button className="btn" onClick={() => handleRemove(contact._id)}>
            Remove from Contacts
          </button>
        )}

      </div>
    </div>
  );
};

export default UserCard;
