import { useState, useRef, useEffect } from "react";
import { putEvent } from "../api/events";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

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
        <div className="title-edit">
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
        {edit && eventData.owner._id === user._id && (
          <button className="btn-green" onClick={handleEdit}><IoIosCheckmark /></button>
        )}
        {eventData.owner._id === user._id && (
          <button className={edit? "btn-red" : "btn-grey" } onClick={handleClickEdit}>{edit ? <IoIosClose /> : <FaPencilAlt/>}</button>
        )}
      </div>
    </div>
  );
};

export default Header;
