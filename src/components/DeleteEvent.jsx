import { useState } from "react";
import { deleteEvent } from "../api/events";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "./ConfirmModal";

const DeleteEvent = ({ eventData, token }) => {
  const [active, setActive] = useState(false);

  const navigate = useNavigate();

  const handleActive = () => {
    setActive(!active);
  };

  const handleConfirm = async () => {
    await deleteEvent(eventData._id, token);
    navigate("/");
    setDone(true);
  };

  return (
    <section className="leave-or-delete">
      <button onClick={handleActive} className="delete-btn">
        Delete event
      </button>
      {active && (
        <ConfirmModal
          message="Do you really want to delete this event?"
          handleConfirm={handleConfirm}
          setActive={setActive}
          active={active}
        />
      )}
    </section>
  );
};

export default DeleteEvent;
