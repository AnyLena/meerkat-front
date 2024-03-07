import { useState, useRef, useEffect } from "react";
import { putEvent } from "../api/events";

const Header = ({ eventData, user, setEventData, token }) => {
  const [newTitle, setNewTitle] = useState(eventData.title);
  const [edit, setEdit] = useState(false);
  const inputRef = useRef();

  const handleEdit = () => {
    const data = { title: newTitle };
    putEvent(eventData._id, token, data, setEventData);
    setEdit(false);
  };

  const handleClickEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [edit]);

  return (
    <div className="header">
      {edit && eventData.owner._id === user._id ? (
        <div className="title">
          <input
            ref={inputRef}
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleEdit();
              }
              if (e.key === "Escape") {
                setEdit(false);
              }
            }}
          />
        </div>
      ) : (
        <h1>{eventData.title}</h1>
      )}
      <div className="buttons">
        {eventData.owner._id === user._id && (
          <button onClick={handleClickEdit}>{edit ? "cancel" : "edit"}</button>
        )}
        {edit && eventData.owner._id === user._id && (
          <button onClick={handleEdit}>save</button>
        )}
      </div>
    </div>
  );
};

export default Header;
