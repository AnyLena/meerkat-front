import { useEffect, useState } from "react";
import { data } from "../data.js";
import BG1 from "../assets/background/bg1.jpg";
import Envelope from "../assets/envelope.png";
import "../styles/event.css";

const Event = () => {
  const SERVER = import.meta.env.VITE_DB;
  const [loading, setLoading] = useState(false);
  //   const [eventId, setEventId] = useState("65d8b3cd37638758b13131c4");
  //   const [userId, setUserId] = useState("65d8ac4a8dc48aae7b4e86e0");
  const [eventData, setEventData] = useState({});

  const [start, setStart] = useState({});
  const [end, setEnd] = useState({});
  const [backgroundImage, setBackgroundImage] = useState(BG1);

  const convertDate = (timestamp) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
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

  //   const getEvent = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`${SERVER}/events/${eventId}`);
  //       const data = await response.json();
  //       setEventData(data)
  //     } catch (error) {
  //       console.log(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  useEffect(() => {
    // getEvent()
    setEventData(data);
    setStart(convertDate(data.date.start));
    setEnd(convertDate(data.date.end));
  }, []);

  useEffect(() => {
    console.log(eventData);
  }, [eventData]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${backgroundImage})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "100vw";
  }, [eventData]);

  return (
    <>
      {Object.keys(eventData).length > 0 ? (
        <section className="event">
          <div className="header">
            <h1>{eventData.title}</h1>
          </div>
          <section className="info">
            <div className="time-infobox">
              <div className="time-date">
                <p className="day">{start.day}</p>
                <p>{start.month}</p>
              </div>
              <div className="time-center">
                <p className="day">{start.weekday}</p>
                <p>
                  {start.hours}:{start.minutes} – {end.hours}:{end.minutes}
                </p>
              </div>
              <div className="time-envelope">
                <img src={Envelope} alt="" />

                <div className="red-circle">
                  <p>10</p>
                </div>
              </div>
            </div>

            <div className="participants"></div>

            <div className="description">
              <p>{eventData.description}</p>
            </div>

            {eventData.todos.length > 0 ? (
              <>
                <h2>TO-DO-List</h2>
                <div className="todo-list">
                  {eventData.todos.map((todo, index) => (
                    <div className="todo-item" key={index}>
                      <div className="circle" style={{backgroundColor: todo.done ? 'var(--secondary-color)' : 'white'}}></div>
                      <p> {todo.title}</p>
                      <div className="assigned"></div>
                      <button>edit</button>
                    </div>
                  ))}
                </div>
              </>
            ) : null}
          </section>
        </section>
      ) : null}
    </>
  );
};

export default Event;
