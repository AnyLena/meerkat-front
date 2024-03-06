import React from "react";
import { useAuth } from "../context/useAuth";
import { acceptInvitation, rejectInvitation } from "../api/invitations.js";
import { convertDate } from "../utils/convertDate.js";
import { IoIosClose } from "react-icons/io";

const Notifications = ({ invitations, setInvitations, setUser, type }) => {
  const { token } = useAuth();

  const handleReject = async (id) => {
    rejectInvitation(id, token, setInvitations);
  };
  const handleAccept = async (id) => {
    acceptInvitation(id, token, setInvitations);
    setUser((prev) => ({ ...prev, contacts: [...prev.contacts, id] }));
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
            <div
              className="notification"
              key={invitation._id}
              style={
                invitation.status === "accepted"
                  ? { backgroundColor: "#a1c181" }
                  : null
              }
            >
              <div className="button-container">
                <button className="btn-clear">
                  {" "}
                  <IoIosClose />
                </button>
              </div>
              <div className="invite-info">
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
              </div>
              <div className="buttons">
                <button
                  className="btn-green"
                  onClick={() => handleAccept(invitation._id)}
                >
                  accept
                </button>
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

      {/* FRIENDSHIP */}
      {/* {invitations.map(
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
        )} */}
    </div>
  );
};

export default Notifications;
