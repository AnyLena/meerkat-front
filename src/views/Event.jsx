import { useEffect, useState } from "react";
import { data } from "../data.js";
import BG1 from "../assets/backgrounds/6.webp";
import "../styles/event.css";
import Todolist from "../components/Todolist";
import Infobox from "../components/Infobox.jsx";
import Location from "../components/Location.jsx";
import Participantslist from "../components/Participantslist.jsx";
import { motion } from "framer-motion";


const Event = () => {
  const SERVER = import.meta.env.VITE_DB;
  const [loading, setLoading] = useState(false);
  //   const [eventId, setEventId] = useState("65d8b3cd37638758b13131c4");
  //   const [userId, setUserId] = useState("65d8ac4a8dc48aae7b4e86e0");
  const [eventData, setEventData] = useState({});

  const [backgroundImage, setBackgroundImage] = useState(BG1);

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
  }, []);

  useEffect(() => {
    console.log(eventData);
  }, [eventData]);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${backgroundImage})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "auto 500px";
    body.style.backgroundPosition = "center top";

    return () => {
        body.style.backgroundImage = "";
      };

  }, [eventData]);

  return (
    <>
    <motion.div
   initial={{ opacity: 0, y: 100 }} 
   animate={{ opacity: 1, y: 0 }} 
   transition={{ duration: 0.7 }}
    >

      {Object.keys(eventData).length > 0 ? (
          <section className="event">
          <div className="header">
            <h1>{eventData.title}</h1>
          </div>
          <section className="info">

            <Infobox date={eventData.date} />
            <Participantslist participants={eventData.participants}/>

            <div className="text">
              <p>{eventData.description}</p>
            </div>

            <Todolist todos={eventData.todos} />
            
            <Location location={eventData.location}/>

          </section>
        </section>
      ) : null}
            </motion.div>
    </>
  );
};

export default Event;
