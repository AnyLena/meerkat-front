import { useState, useRef, useEffect } from "react";
import { putEvent } from "../api/events";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import "../styles/event.css"

const EventDescription = ({ eventData, setEventData, user, token }) => {
  const [edit, setEdit] = useState(false);
  const [newDescription, setNewDescription] = useState(eventData.description);
  const inputRef = useRef();

  const handleChange = (e) => {
    setNewDescription(e.target.value);
  };

  const handleUpdateEvent = () => {
    const data = { description: newDescription };
    putEvent(eventData._id, token, data, setEventData);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleUpdateEvent();
    }
    if (e.key === "Escape") {
      setEdit(false);
    }
  };

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [edit]);

  return (
    <section className="event-description">
      <div className="text">
        {edit ? (
          <input
            ref={inputRef}
            type="text"
            value={newDescription}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
          />
        ) : (
          <p>{eventData.description}</p>
        )}
        <div className="buttons">


          {eventData.owner._id === user._id && (
           
        <button onClick={handleEdit} className="edit-btn">
                    {!edit ? <FaPencilAlt /> : <IoIosClose />}
                  </button>
           )}


          {edit && (
            <div className="save">
              <button className="save-btn" onClick={handleUpdateEvent}>    <IoIosCheckmark /></button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDescription;
