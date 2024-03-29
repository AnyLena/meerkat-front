import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEvent } from "../api/events.js";
import { fetchMessages } from "../api/messages.js";
import { useAuth } from "../context/useAuth.jsx";
import { useNavigate } from "react-router-dom";

//COMPONENTS
import Header from "../components/Header.jsx";
import Todolist from "../components/Todolist";
import Infobox from "../components/Infobox.jsx";
import Location from "../components/Location.jsx";
import Weatherforecast from "../components/Weatherforecast.jsx";
import Participantslist from "../components/Participantslist.jsx";
import SharedFiles from "../components/SharedFiles.jsx";
import EventDescription from "../components/EventDescription.jsx";
import DeleteEvent from "../components/DeleteEvent.jsx";
import NavBar from "../components/Navbar";
import Expenses from "../components/Expenses.jsx";

//STYLES
import "../styles/event.css";
import { motion } from "framer-motion";
import { Button } from "@mui/material";
import { IoIosArrowBack } from "react-icons/io";
import NotInvited from "../components/NotInvited.jsx";

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

  // useEffect(() => {
  //   console.log(eventData);
  // }, [eventData]);

  return (
    <>
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

          {!loading && Object.keys(eventData).length === 0 ? (
            <NotInvited />
          ) : null}

          {Object.keys(eventData).length > 0 && (
            <div className="top-container">
              {eventData.owner && (
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
              )}
            </div>
          )}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="event-content"
          style={{
            backgroundImage: `url(${backgroundImage})`,
          }}
        >
          {Object.keys(eventData).length > 0 ? (
            <section className="event">
              <Header
                eventData={eventData}
                user={user}
                setEventData={setEventData}
                token={token}
              />

              <section className="info">
                <Infobox
                  eventId={eventData._id}
                  date={eventData.date}
                  messages={messages}
                  setMessages={setMessages}
                  setEventData={setEventData}
                  token={token}
                  user={user}
                  eventData={eventData}
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
                <Expenses eventData={eventData} setEventData={setEventData} />
                <SharedFiles messages={messages} />
              </section>
            </section>
          ) : null}
          {eventData && eventData.owner?._id === user._id && (
          
            <DeleteEvent eventData={eventData} token={token} user={user} />
    
          )}
        </motion.div>
      </div>
      <NavBar />
    </>
  );
};

export default Event;
