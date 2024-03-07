import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/events.js";
import { fetchMessages } from "../api/messages.js";
import { useAuth } from "../context/useAuth.jsx";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import Todolist from "../components/Todolist";
import Infobox from "../components/Infobox.jsx";
import Location from "../components/Location.jsx";
import Weatherforecast from "../components/Weatherforecast.jsx";
import Participantslist from "../components/Participantslist.jsx";
import SharedFiles from "../components/SharedFiles.jsx";
import EventDescription from "../components/EventDescription.jsx";

//STYLES
import "../styles/event.css";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";

const Event = () => {
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);
  const [eventData, setEventData] = useState({});
  const [backgroundImage, setBackgroundImage] = useState();
  const { id } = useParams();

  useEffect(() => {
    getEvent(id, token, setEventData, setLoading, setBackgroundImage);
    fetchMessages(id, token, setMessages);
    scrollTo(0, 0);
  }, []);

  return (
    <div
      className="event-container"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ opacity: 1, y: "1rem" }}
        transition={{ duration: 0.7 }}
        className="back-btn-container"
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

        {Object.keys(eventData).length > 0 && (
          <div className="top-container">
            <div className="owner">
              <img src={eventData.owner.picture.url} alt="" />
              <p>
                {eventData.owner.name !== user.name ? (
                  <>
                    <span>{eventData.owner.name}</span> is the host
                  </>
                ) : (
                  <>
                    <span>You</span> are the host
                  </>
                )}
              </p>
            </div>
          </div>
        )}
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
              <Infobox
                eventId={eventData._id}
                date={eventData.date}
                messages={messages}
                setMessages={setMessages}
                setEventData={setEventData}
                token={token}
              />

              <Participantslist
                setEventData={setEventData}
                eventData={eventData}
              />
              <EventDescription
                eventData={eventData}
                setEventData={setEventData}
                user={user}
                token={token}
              />
              <Todolist eventData={eventData} setEventData={setEventData} />
              <Location location={eventData.location} />
              {eventData.location.map && eventData.location.lat ? (
                <Weatherforecast eventData={eventData} />
              ) : null}
              <SharedFiles messages={messages} />
            </section>
          </section>
        ) : null}
      </motion.div>
    </div>
  );
};

export default Event;
