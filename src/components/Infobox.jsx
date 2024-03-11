import { useState, useEffect, useRef } from "react";
import { convertDate } from "../utils/convertDate.js";
import Messages from "./Messages/Messages";
import MailboxIcon from "./MailboxIcon";
import { putEvent } from "../api/events.js";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { months, days } from "../utils/dateNames.js";

//STYLES
import "../styles/infobox.css";
import LocalTime from "./LocalTime.jsx";

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
  // const [end, setEnd] = useState({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newStart, setNewStart] = useState();
  const inputRef = useRef();

  useEffect(() => {
    const dateStart = new Date(eventData.date.start);
    setStart(dateStart);
    setNewStart(dateStart);
  }, [eventData]);

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
    let updatedStart = new Date(newStart);

    if (e.target.type === "date") {
      const newDate = new Date(e.target.value);
      updatedStart.setFullYear(newDate.getFullYear());
      updatedStart.setMonth(newDate.getMonth());
      updatedStart.setDate(newDate.getDate());
    }
    if (e.target.type === "time") {
      const timeString = e.target.value;
      const [hours, minutes] = timeString.split(":");
      updatedStart.setHours(Number(hours));
      updatedStart.setMinutes(Number(minutes));
    }
    setNewStart(updatedStart);
  };

  const handleSave = () => {
    setEdit(false);
    const data = {
      date: { start: newStart, end: date.end },
    };
    putEvent(eventId, token, data, setEventData);
  };

  return (
    <>
      <div className="time-infobox">
        <div className="time-grid-container">
          {!edit ? (
            <div className="time-date">
              <div>
                {start instanceof Date ? (
                  <>
                    <p className="day">{start.getDate()}</p>
                    <p>{months[start.getMonth()]}</p>{" "}
                  </>
                ) : null}
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
                value={`${newStart.getFullYear()}-${(
                  "0" +
                  (newStart.getMonth() + 1)
                ).slice(-2)}-${("0" + newStart.getDate()).slice(-2)}`}
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
              {start instanceof Date ? (
                <>
                  <p className="day">{days[start.getDay()]}</p>
                </>
              ) : null}
            </div>
            <LocalTime start={start} edit={edit} eventData={eventData}/>
          </div>
          <MailboxIcon eventId={eventId} setOpen={setOpen} />
        </div>
        <Messages
          eventTitle={eventData.title}
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
