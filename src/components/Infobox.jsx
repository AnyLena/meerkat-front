import { useState, useEffect } from "react";
import { convertDate } from "../utils/convertDate.js";
import Messages from "./Messages/Messages";
import MailboxIcon from "./MailboxIcon";

//STYLES
import "../styles/infobox.css";

const Infobox = ({ date, eventId, messages, setMessages }) => {
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setStart(convertDate(date.start));
    setEnd(convertDate(date.end));
  }, []);

  return (
    <>
      <div className="time-infobox">
        <div className="time-grid-container">
          <div className="time-date">
            <p className="day">{start.day}</p>
            <p>{start.month}</p>
          </div>
          <div className="time-center">
            <p className="day">{start.weekday}</p>
            <p>
              {start.hours}:{start.minutes}
              {date.end ? ` – ${end.hours}:${end.minutes}` : null}
            </p>
          </div>
          <MailboxIcon eventId={eventId} setOpen={setOpen} />
        </div>
        <Messages open={open} setOpen={setOpen} messages={messages} setMessages={setMessages} />
      </div>
    </>
  );
};

export default Infobox;
