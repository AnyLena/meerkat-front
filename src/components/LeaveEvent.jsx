import { useState, useRef, useEffect } from "react";
import { leaveEvent } from "../api/events";
import { useNavigate } from "react-router-dom";

const LeaveEvent = ({ eventData, token, user }) => {
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
        <div
          ref={confirmRef}
          className="confirm"
          style={{ maxHeight: active ? "100px" : "0px", position: "absolute" }}
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

export default LeaveEvent;
