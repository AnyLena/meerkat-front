import { useState, useRef, useEffect } from "react";
import { putEvent } from "../api/events";
import purify from "dompurify"

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FaPencilAlt } from "react-icons/fa";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import "../styles/event.css";

const EventDescription = ({ eventData, setEventData, user, token }) => {
  const [edit, setEdit] = useState(false);
  const [newDescription, setNewDescription] = useState(eventData.description);

  const handleUpdateEvent = () => {
    const sanitizedData = purify.sanitize(newDescription, { sanitize: true })
    const data = { description: sanitizedData };
    putEvent(eventData._id, token, data, setEventData);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <section className="event-description">
      <div className="text">
        {edit ? (
          <ReactQuill
            theme="snow"
            value={newDescription}
            onChange={setNewDescription}
          />
        ) : (
          <div dangerouslySetInnerHTML={{ __html:purify.sanitize(eventData.description, { sanitize: true }) }} />
        )}
        <div className="buttons">
          {eventData.owner._id === user._id && (
            <button onClick={handleEdit} className="edit-btn">
              {!edit ? <FaPencilAlt /> : <IoIosClose />}
            </button>
          )}
          {edit && (
            <div className="save">
              <button className="save-btn" onClick={handleUpdateEvent}>
                {" "}
                <IoIosCheckmark />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventDescription;
