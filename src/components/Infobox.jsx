import { useState, useEffect } from "react";
import Envelope from "../assets/envelope.png";
import "../styles/infobox.css";
import { useAuth } from "../context/useAuth";

const Infobox = ({ date, title, location, messages, picture, host }) => {
  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});

  const {user} = useAuth()

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate());
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "Oktober",
      "November",
      "December",
    ];
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const weekday = days[date.getDay()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return { day, month, year, weekday, hours, minutes };
  };

  useEffect(() => {
    setStart(convertDate(date.start));
    setEnd(convertDate(date.end));
    // console.log(messages)
  }, []);

  // useEffect(() => {
  //   console.log(timestamp)
  // }, [timestamp]);

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
          <div className="time-envelope">
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
              {user.user._id === host ? 
              <p className="host">You are the host!</p>
              :
              <p className="host">Host: {host}</p>
              }

            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Infobox;
