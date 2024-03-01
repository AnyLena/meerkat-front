import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { fetchUserEvents } from "../api/events.js";
import { welcomeMessages } from "../utils/welcomeMessages.js";

//COMPONENTS
import Infobox from "../components/Infobox";

//STYLES
import "../styles/dashboard.css";
import ProfilePicture from "../assets/decorations/traveler.jpg";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const today = new Date();
  const randomMessage = Math.floor(Math.random() * welcomeMessages.length);

  useEffect(() => {
    fetchUserEvents(setUserEvents, token);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <section className="dashboard">
        {user ? (
          <>
            <div className="logo">
              <h1>Hello, {user.name}!</h1>
              <p className="welcome-message">
                {welcomeMessages[randomMessage]}
              </p>
              {user.picture ? (
                <img className="user-picture" src={user.picture.url} alt="" />
              ) : null}
            </div>

            {userEvents.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <section className="dashboard-events top-div">
                  <h2>Your Upcoming Events</h2>
                  <div className="white-background">
                    {userEvents.map((event) =>
                      new Date(event.date.start) > today ? (
                        <div className="event-card" key={event._id}>
                          <Link to={`/event/${event._id}`}>
                            <Infobox
                              date={event.date}
                              title={event.title}
                              location={event.location}
                              messages={event.messages}
                              picture={event.picture}
                              host={event.owner.name}
                            />
                          </Link>
                        </div>
                      ) : null
                    )}
                  </div>
                </section>
              </motion.div>
            ) : null}
            {userEvents.length > 0 ? (
              <section className="dashboard-events">
                <h2>Past Events</h2>
                {userEvents.map((event) =>
                  new Date(event.date.start) < today ? (
                    <div key={event._id}>
                      <Link to={`/event/${event._id}`}>
                        <Infobox
                          date={event.date}
                          title={event.title}
                          location={event.location}
                          picture={event.picture}
                        />
                      </Link>
                    </div>
                  ) : null
                )}
              </section>
            ) : null}
          </>
        ) : null}
      </section>
    </motion.div>
  );
};

export default Dashboard;
