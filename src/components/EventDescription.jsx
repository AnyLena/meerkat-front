import { useState, useRef, useEffect } from "react";
import { putEvent } from "../api/events";
import purify from "dompurify";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { FaPencilAlt } from "react-icons/fa";
import { IoIosCheckmark, IoIosClose } from "react-icons/io";
import "../styles/event.css";

const EventDescription = ({ eventData, setEventData, user, token }) => {
  const [edit, setEdit] = useState(false);
  const [newDescription, setNewDescription] = useState(eventData.description);

  const sanitizeConfig = {
    ALLOWED_TAGS: [
      "p",
      "#text",
      "h1",
      "h2",
      "h3",
      "strong",
      "em",
      "u",
      "ul",
      "ol",
      "li",
      "a",
    ],
    KEEP_CONTENT: false,
  };

  const handleUpdateEvent = () => {
    const sanitizedData = purify.sanitize(newDescription, sanitizeConfig);
    const data = { description: sanitizedData };
    putEvent(eventData._id, token, data, setEventData);
    setEdit(false);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  return (
    <section className="event-description">
      {edit ? (
        <div className="description-edit">
          <ReactQuill
            theme="snow"
            value={newDescription}
            onChange={setNewDescription}
          />
          <div className="save">
            <button className="save-btn" onClick={handleUpdateEvent}>
              <IoIosCheckmark />
            </button>
            <button className="close-btn" onClick={handleEdit}>
              <IoIosClose />
            </button>
          </div>
        </div>
      ) : (
        <div className="description-show">
          <div
            dangerouslySetInnerHTML={{
              __html: purify.sanitize(eventData.description, sanitizeConfig),
            }}
          />
          {eventData.owner._id === user._id && (
            <button onClick={handleEdit} className="edit-btn">
              {!edit ? <FaPencilAlt /> : null}
            </button>
          )}
        </div>
      )}
    </section>
  );
};

export default EventDescription;
