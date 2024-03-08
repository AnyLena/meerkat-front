import { useState, useEffect, useRef } from "react";
import { convertDate } from "../utils/convertDate.js";
import Messages from "./Messages/Messages";
import MailboxIcon from "./MailboxIcon";
import { putEvent } from "../api/events.js";
import { FaPencilAlt } from "react-icons/fa";
import { IoIosClose } from "react-icons/io";
import { IoIosCheckmark } from "react-icons/io";
import { months, days } from "../utils/dateNames.js";
import { getTimezone } from "../api/timezone.js";

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
  // const [end, setEnd] = useState({});
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [newStart, setNewStart] = useState();
  const [timezone, setTimezone] = useState({});
  const [timezoneStart, setTimezoneStart] = useState();
  const inputRef = useRef();

  useEffect(() => {
    getTimezone(eventData.location.lat, eventData.location.lng, setTimezone);
    if (start instanceof Date) {
      const newDate = new Date(eventData.date.start);
      newDate.setSeconds(newDate.getSeconds() + timezone.offset_DST_seconds);
      setTimezoneStart(newDate);
    }
  }, [start]);

  useEffect(() => {
    const dateStart = new Date(eventData.date.start);
    setStart(dateStart);
    setNewStart(dateStart);
  }, [eventData]);

  useEffect(() => {
    console.log(timezone);
  }, [timezone]);
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
    console.log(newStart);
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
            {!edit ? (
              <p>
                {start instanceof Date ? (
                  <>
                    {start.getHours()}:
                    {start.getMinutes().toString().padStart(2, "0")} |{" "}
                    {Object.keys(timezone).length > 0 ? (
                      <span>

                        {timezone.offset_STD[0] === "+" ? 
                        (Number(eventData.date.start.split("T")[1].split(":")[0])+ Number(timezone.offset_STD.split("+")[1].split(":")[0])) %24
                        : 
                        ((Number(eventData.date.start.split("T")[1].split(":")[0]) - Number(timezone.offset_STD.split("-")[1].split(":")[0]) + 24) % 24) }
                      </span>
                    ) : 
                    null}
                    :{start.getMinutes().toString().padStart(2, "0")}{" "}
                    <span className="local">(local time)</span>
                  </>
                ) : null}

                {/* {date.end ? ` – ${end.hours}:${end.minutes}` : null} */}
              </p>
            ) : (
              <input
                type="time"
                value={`${("0" + newStart.getHours()).slice(-2)}:${(
                  "0" + newStart.getMinutes()
                ).slice(-2)}`}
                onChange={handleDateChange}
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
