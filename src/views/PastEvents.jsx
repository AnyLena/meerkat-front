import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { fetchUserEvents } from "../api/events.js";
import DashboardMenu from "../components/DashboardMenu.jsx";

//COMPONENTS
import EventCard from "../components/EventCard";

//STYLES
import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@mui/material";

const PastEvents = () => {
  const { user, token } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const today = new Date();

  useEffect(() => {
    fetchUserEvents(setUserEvents, token);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <DashboardMenu />
      <section className="dashboard">
        {user ? (
          <>
            {userEvents.length > 0 ? (
              <>
                <h2>Your Past Events</h2>
              <section className="dashboard-events">
                {userEvents.map((event) =>
                  new Date(event.date.start) < today ? (
                    <div key={event._id}>
                      <Link to={`/event/${event._id}`}>
                        <EventCard
                          date={event.date}
                          title={event.title}
                          location={event.location}
                          picture={event.picture.url}
                        />
                      </Link>
                    </div>
                  ) : null
                )}
              </section>
              </>
            ) : null}
            {userEvents.find((event) => event.date.start < today) ? null : (
              <div className="no-past-event">
                <p>
                  You do not have any past events. Go and make some memories.
                </p>
                <Link to="/new">
                  <Button className="btn-green" style={{ fontSize: "1rem" }}>
                    Create an Event
                  </Button>
                </Link>
              </div>
            )}
          </>
        ) : null}
      </section>
    </motion.div>
  );
};

export default PastEvents;
