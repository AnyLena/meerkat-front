import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { fetchUserEvents } from "../api/events.js";
import { welcomeMessages } from "../utils/welcomeMessages.js";
import DashboardMenu from "../components/DashboardMenu.jsx";

//COMPONENTS
import EventCard from "../components/EventCard";

//STYLES
import "../styles/dashboard.css";
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

  useEffect(() => {
    console.log(userEvents)
  }, [userEvents]);


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
            {/* <div className="logo">
              <h1>Hello, {user.name}!</h1>
              <p className="welcome-message">
                {welcomeMessages[randomMessage]}
              </p>
              {user.picture.url ? (
                <img className="user-picture" src={user.picture.url} alt="" />
              ) : null}
            </div> */}

            <div className="logo">
              <h1>Hello, {user.name}!</h1>
              <p className="welcome-message">
                {welcomeMessages[randomMessage]}
              </p>
            </div>

            {userEvents.length > 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <h2>Your Upcoming Events</h2>
                <section className="dashboard-events">
                  {userEvents.map((event) =>
                    new Date(event.date.start) > today ? (
                      <div className="event-card" key={event._id}>
                        <Link to={`/event/${event._id}`}>
                          <EventCard
                            date={event.date}
                            title={event.title}
                            location={event.location}
                            messages={event.messages}
                            picture={event.picture.url}
                            host={event.owner.name}
                            hostImg={event.owner.picture.url}
                          />
                        </Link>
                      </div>
                    ) : null
                  )}
                </section>
              </motion.div>
            ) : null}
          </>
        ) : null}
      </section>
    </motion.div>
  );
};

export default Dashboard;
