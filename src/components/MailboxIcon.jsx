import { useState, useEffect } from "react";
import { getUnreadMessagesNumber, markMessagesAsRead } from "../api/messages";
import { useAuth } from "../context/useAuth";
import Envelope from "../assets/envelope.png";
import { IoMailOutline } from "react-icons/io5";

const MailboxIcon = ({ setOpen, eventId }) => {
  const [unreadMessages, setUnreadMessages] = useState(0);
  const { token } = useAuth();

  useEffect(() => {
    getUnreadMessagesNumber(setUnreadMessages, token, eventId);
  }, []);

  const handleOpen = () => {
    setOpen(true);
    markMessagesAsRead(setUnreadMessages, eventId, token);
  };

  return (
    <div
      style={{ cursor: "pointer" }}
      onClick={handleOpen}
      className="time-envelope"
    >
      <div className="mail-icon">
        <IoMailOutline />
        {unreadMessages > 0 ? (
          <div className="red-circle">
            <p>{unreadMessages}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MailboxIcon;
