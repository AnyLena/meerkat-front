import { useState } from "react";
import { leaveEvent,  } from "../api/events";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";
import "../styles/confirm-modal.css";

const LeaveEvent = ({ eventData, token }) => {
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const handleActive = () => {
    setActive(!active);
  };

  const handleConfirm = async () => {
    await leaveEvent(eventData._id, token);
    navigate("/");
    setDone(true);
  };

  return (
    <section className="leave-event">
      <button onClick={handleActive} className="leave-btn">
        Leave event
      </button>
      {active && (
        <ConfirmModal
          message="Do you really want to leave this event?"
          handleConfirm={handleConfirm}
          setActive={setActive}
          active={active}
        />
      )}
    </section>
  );
};

export default LeaveEvent;
