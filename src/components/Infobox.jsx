import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { convertDate } from "../utils/convertDate.js";
import Messages from "./Messages/Messages";

//STYLES
import Envelope from "../assets/envelope.png";
import "../styles/infobox.css";

const Infobox = ({ date, title, location, messages, picture, host }) => {
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  const [open, setOpen] = useState(false);

  const { user } = useAuth();

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

          <div
            style={{ cursor: "pointer"  }}
            onClick={() => {
              setOpen(true);
            }}
            className="time-envelope"
          >
            <img src={Envelope} alt="" />
            <div className="red-circle">
              <p>10</p>
            </div>
          </div>
        </div>
        {location && title ? (
          <div
            className="event-image"
            style={{ backgroundImage: `url(${picture})` }}
          >
            <div className="description">
              <p className="title">{title}</p>
              <p>{location.description}</p>
              {user._id === host ? (
                <p className="host">You are the host!</p>
              ) : (
                <p className="host">Host: {host}</p>
              )}
            </div>
          </div>
        ) : null}
        <Messages open={open} setOpen={setOpen} />
      </div>
    </>
  );
};

export default Infobox;
