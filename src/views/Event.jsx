import { useEffect, useState } from "react";
// import { data } from "../data.js";
import BG1 from "../assets/backgrounds/1.webp";
import "../styles/event.css";
import Todolist from "../components/Todolist";
import Infobox from "../components/Infobox.jsx";
import Location from "../components/Location.jsx";
import Participantslist from "../components/Participantslist.jsx";
import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/useAuth.jsx";
import axios from "axios";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";

const Event = () => {
  const SERVER = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const { token, user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [eventData, setEventData] = useState({});

  const [backgroundImage, setBackgroundImage] = useState();
  const { id } = useParams();

  const getEvent = async () => {
    try {
      setLoading(true);
      const data = await axios.get(`${SERVER}/events/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      setEventData(data.data);
      data.data.picture == 1
        ? setBackgroundImage(BG1)
        : setBackgroundImage(data.data.picture);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getEvent().then(() => {
      console.log(eventData);
    });
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
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {Object.keys(eventData).length > 0 ? (
          <section className="event">

            <Button
              className="back-btn"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                position: "sticky",
                top: "1rem",
                left: "1rem",
                color: "white",
                width: "40px",
                height: "40px",
                minWidth: "0 !important",
              }}
            >
              <IoIosArrowBack style={{ fontSize: "1.25rem"}} />
            </Button>

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

              <Todolist todos={eventData.todos} />

              <Location location={eventData.location} />
            </section>
          </section>
        ) : null}
      </motion.div>
    </>
  );
};

export default Event;
