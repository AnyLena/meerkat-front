import React from "react";
import { useAuth } from "../context/useAuth";
import { acceptInvitation, rejectInvitation } from "../api/invitations.js";

const Notifications = ({ invitations, setInvitations, setUser }) => {
  const { token } = useAuth();

  const handleReject = async (id) => {
    rejectInvitation(id, token, setInvitations);
  };
  const handleAccept = async (id) => {
    acceptInvitation(id, token, setInvitations);
    setUser((prev) => ({ ...prev, contacts: [...prev.contacts, id] }));
  };

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      <div className="notifications-container">
        {/* EVENTS */}
        {invitations.map(
          (invitation) =>
            invitation.type === "event" && (
              <div
                className="notification"
                key={invitation._id}
                style={
                  invitation.status === "accepted"
                    ? { backgroundColor: "lightgreen" }
                    : null
                }
              >
                <img
                  src={invitation.inviting.picture.url}
                  alt=""
                  style={{ width: "20px" }}
                />
                <p>
                  {invitation.inviting.name} invited you to:{" "}
                  {invitation.event?.title} on{" "}
                  {invitation.event?.date.start.slice(0, 10)}
                </p>

                <button onClick={() => handleReject(invitation._id)}>X</button>
                <button onClick={() => handleAccept(invitation._id)}>✓</button>
                <button>clear</button>
              </div>
            )
        )}

        {/* FRIENDSHIP */}
        {invitations.map(
          (invitation) =>
            invitation.type === "friendship" && (
              <div
                className="notification"
                key={invitation._id}
                style={
                  invitation.status === "accepted"
                    ? { backgroundColor: "lightgreen" }
                    : null
                }
              >
                <img
                  src={invitation.inviting.picture.url}
                  alt=""
                  style={{ width: "20px" }}
                />
                <p>{invitation.inviting.name} wants to connect with you</p>
                <button onClick={() => handleReject(invitation._id)}>X</button>
                <button onClick={() => handleAccept(invitation._id)}>✓</button>
                <button>clear</button>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Notifications;
