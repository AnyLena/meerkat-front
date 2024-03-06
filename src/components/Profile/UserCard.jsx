import React from "react";
import { sendFriendshipRequest, removeContact } from "../../api/users";
import { useAuth } from "../../context/useAuth";
import { acceptInvitation } from "../../api/invitations";

const UserCard = ({ contact, invitations, setInvitations, setUser }) => {
  const { user, token } = useAuth();
  console.log(invitations, "friend requests");
  const handleAdd = (contactId) => {
    sendFriendshipRequest(contactId, token, setInvitations);
  };

  const handleRemove = (contactId) => {
    removeContact(contactId, user._id, token, setUser);
    setInvitations((prev) =>
      prev.filter(
        (i) => i.invited._id !== contactId && i.inviting._id !== contactId
      )
    );
  };

  const handleAccept = (id) => {
    console.log("ACCEPTED", id);
    acceptInvitation(id, token, setInvitations);
    const newFriend = invitations.find((i) => i._id === id).inviting;
    setUser((prev) => ({ ...prev, contacts: [...prev.contacts, newFriend._id] }));
  };

  return (
    <div className="user-card">
      <div className="user-image">
        <img src={contact.picture?.url} alt="profile" />
      </div>
      <div className="user-details">
        <h2>{contact.name}</h2>
        <p>{contact.email}</p>
      </div>

      <div className="buttons">
        {!user.contacts.includes(contact._id) &&
        !invitations.find((i) => i.invited._id === contact._id) &&
        !invitations.find((i) => i.inviting._id === contact._id) ? (
          <button className="btn" onClick={() => handleAdd(contact._id)}>
            connect
          </button>
        ) : invitations.find(
            (i) => i.invited._id === contact._id && i.status === "pending"
          ) ? (
          <button disabled className="btn grey">
            pending
          </button>
        ) : invitations.find(
            (i) => i.inviting._id === contact._id && i.status === "pending"
          ) ? (
          <button
            onClick={() =>
              handleAccept(
                invitations.find((i) => i.inviting._id === contact._id)._id
              )
            }
            className="btn lightgreen"
          >
            accept
          </button>
        ) : (
          <button className="btn red" onClick={() => handleRemove(contact._id)}>
            remove
          </button>
        )}
      </div>
    </div>
  );
};

export default UserCard;
