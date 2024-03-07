import { useState, useEffect, useRef } from "react";
import { convertDate } from "../utils/convertDate.js";
import Messages from "./Messages/Messages";
import MailboxIcon from "./MailboxIcon";
import { putEvent } from "../api/events.js";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";

//STYLES
import "../styles/infobox.css";

const Infobox = ({
  date,
  eventId,
  messages,
  setMessages,
  setEventData,
  token,
  user,
  eventData,
}) => {
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newDate, setNewDate] = useState(date.start);
  const [newTime, setNewTime] = useState(date.start.slice(11, 16));
  const inputRef = useRef();

  useEffect(() => {
    setStart(convertDate(date.start));
    setEnd(convertDate(date.end));
    console.log(date.start.slice(11, 16, "TIME"));
  }, [date]);

  const handleEdit = () => {
    setEdit(!edit);
  };

  useEffect(() => {
    if (edit && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [edit]);

  const handleDateChange = (e) => {
    setNewDate(e.target.value);
    console.log(newDate, "data changed");
    console.log(newTime, "time changed");
  };

  const handleSave = () => {
    setEdit(false);
    const newDateTime = newDate + "T" + newTime;
    const data = {
      date: { start: newDateTime, end: date.end },
    };
    putEvent(eventId, token, data, setEventData);
  };

  const handleTimeChange = (e) => {
    setNewTime(e.target.value);
    console.log(newTime);
  };

  return (
    <>
      <div className="time-infobox">
        <div className="time-grid-container">
          {!edit ? (
            <div className="time-date">
              <div>
                <p className="day">{start.day}</p>
                <p>{start.month}</p>
              </div>
              {eventData.owner._id === user._id && (
                <div className="buttons">
                  <button onClick={handleEdit} className="edit-btn">
                    <FaPencilAlt />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="time-date edit">
              <input
                ref={inputRef}
                type="date"
                value={newDate.slice(0, 10)}
                onChange={handleDateChange}
              />
              <div className="edit-save-btns">
                <div className="buttons">
                  <button onClick={handleSave} className="btn-green">
                    <IoIosCheckmark />
                  </button>
                  <button onClick={() => setEdit(!edit)} className="btn-red">
                    <IoIosClose />
                  </button>
                </div>
              </div>
            </div>
          )}
          <div className="time-center">
            <div className="day-container">
              <p className="day">{start.weekday}</p>
            </div>
            {!edit ? (
              <p>
                {start.hours}:{start.minutes}
                {date.end ? ` – ${end.hours}:${end.minutes}` : null}
              </p>
            ) : (
              <input
                type="time"
                value={newTime.slice(0, 2) + ":" + newTime.slice(3, 5)}
                onChange={handleTimeChange}
              />
            )}
          </div>
          <MailboxIcon eventId={eventId} setOpen={setOpen} />
        </div>
        <Messages
          open={open}
          setOpen={setOpen}
          messages={messages}
          setMessages={setMessages}
        />
      </div>
    </>
  );
};

export default Infobox;
