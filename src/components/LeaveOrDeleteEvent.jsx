import { useState, useRef, useEffect } from "react";
import { leaveEvent, deleteEvent } from "../api/events";
import { useNavigate } from "react-router-dom";

const LeaveOrDeleteEvent = ({ eventData, token, user }) => {
  const [active, setActive] = useState(false);

  const confirmRef = useRef();
  const navigate = useNavigate();

  const handleActive = () => {
    setActive(!active);
  };

  useEffect(() => {
    if (active) {
      confirmRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log;
  }, [active]);

  const handleConfirm = async () => {
    if (eventData.owner._id !== user._id) {
      await leaveEvent(eventData._id, token);
      navigate("/");
    } else {
      await deleteEvent(eventData._id, token);
      navigate("/");
    }
    setDone(true);
  };

  return (
    <section className="leave-or-delete">
      {eventData.owner._id !== user._id ? (
        <button onClick={handleActive} className="leave-btn">
          Leave event
        </button>
      ) : (
        <button onClick={handleActive} className="delete-btn">
          Delete event
        </button>
      )}
      {active && (
        <div
          ref={confirmRef}
          className="confirm"
          style={{ height: active ? "100px" : "0px" }}
        >
          <p>Are you sure?</p>
          <div className="buttons">
            <button onClick={handleConfirm} className="confirm-btn">
              Yes
            </button>
            <button onClick={() => setActive(!active)} className="cancel-btn">
              No
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default LeaveOrDeleteEvent;
