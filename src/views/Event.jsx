import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/events.js";
import { useAuth } from "../context/useAuth.jsx";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import Todolist from "../components/Todolist";
import Infobox from "../components/Infobox.jsx";
import Location from "../components/Location.jsx";
import Participantslist from "../components/Participantslist.jsx";
import Loader from "../components/Loader.jsx";

//STYLES
import BG1 from "../assets/backgrounds/1.webp";
import "../styles/event.css";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";

const Event = () => {
  const SERVER = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    getEvent(id, token, setEventData, setLoading, setBackgroundImage);
  }, []);

  useEffect(() => {
    const body = document.querySelector("body");
    body.style.backgroundImage = `url(${backgroundImage})`;
    body.style.backgroundRepeat = "no-repeat";
    body.style.backgroundAttachment = "fixed";
    body.style.backgroundSize = "800px auto";
    body.style.backgroundPosition = "center top";

    return () => {
      body.style.backgroundImage = "";
    };
  }, [eventData]);

  return (
    <>
      {loading ? <Loader /> : null}
      <motion.div 
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: "1rem" }}
        transition={{ duration: 0.7 }}
      >
      <Button
        className="back-btn"
        onClick={() => navigate(-1)}
        sx={{
          borderRadius: "50%",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          position: "sticky",
          top: "1rem",
          left: "1rem",
          color: "white",
          width: "40px",
          height: "40px",
          minWidth: "0 !important",
        }}
      >
        <IoIosArrowBack style={{ fontSize: "1.25rem" }} />
      </Button>
      </motion.div>
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
              <Participantslist
                setEventData={setEventData}
                eventData={eventData}
              />
              <div className="text">
                <p>{eventData.description}</p>
              </div>
              {/*<Todolist todos={eventData.todos} />*/}
              <Location location={eventData.location} />
            </section>
          </section>
        ) : null}
      </motion.div>
    </>
  );
};

export default Event;
