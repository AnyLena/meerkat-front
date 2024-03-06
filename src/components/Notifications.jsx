import React, { useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { acceptInvitation, rejectInvitation } from "../api/invitations.js";
import { convertDate } from "../utils/convertDate.js";
import { fetchUserEvents } from "../api/events.js";
import { useState } from "react";

const Notifications = ({ invitations, setInvitations, setUser, type, setUserEvents }) => {
  const { token } = useAuth();
  const [fetchEvents, setFetchEvents] = useState(false)

  const handleReject = async (id) => {
    rejectInvitation(id, token, setInvitations);
  };
  const handleAccept = (id) => {
    acceptInvitation(id, token, setInvitations);
    const newFriend = invitations.find((i) => i._id === id).inviting;
    setUser((prev) => ({ ...prev, contacts: [...prev.contacts, newFriend] }));
  };


  const getDate = (dates) => {
    let date = convertDate(dates);
    return [date.day, " ", date.month, " ", date.year];
  };

  return (
    <div className="notifications-container">
      {invitations.map(
        (invitation) =>
          invitation.type === type && (
            <div className="notification" key={invitation._id}>
              <img
                src={invitation.inviting.picture.url}
                alt=""
                style={{ width: "20px" }}
              />
              {type === "event" ? (
                <div className="event-text">
                  <h4>{invitation.event?.title} </h4>
                  <p>Host: {invitation.inviting.name} </p>
                  <p>{getDate(invitation.event?.date.start)}</p>
                </div>
              ) : (
                <p>{invitation.inviting.name}</p>
              )}
              <div className="buttons">
                {type === "event" ? (
                  <button
                    className="btn-green"
                    onClick={() => handleAccept(invitation._id)}
                  >
                    accept
                  </button>
                ) : (
                  <button
                    className="btn-green"
                    onClick={() => handleAccept(invitation._id)}
                  >
                    accept
                  </button>
                )}
                <button
                  className="btn-red"
                  onClick={() => handleReject(invitation._id)}
                >
                  decline
                </button>
              </div>
            </div>
          )
      )}
    </div>
  );
};

export default Notifications;
