import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { fetchUserEvents } from "../api/events.js";
import { welcomeMessages } from "../utils/welcomeMessages.js";

//COMPONENTS
import EventCard from "../components/EventCard";
import Notifications from "../components/Notifications";

//STYLES
import "../styles/dashboard.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyInvitations } from "../api/invitations.js";

const Dashboard = () => {
  const { user, token } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const today = new Date();
  const randomMessage = Math.floor(Math.random() * welcomeMessages.length);

  useEffect(() => {
    fetchUserEvents(setUserEvents, token);
    getMyInvitations(token, setInvitations);
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
              {/* <h1>Hello, {user.name}!</h1>
              <p className="welcome-message">
                {welcomeMessages[randomMessage]}
              </p> */}
              <Notifications
                invitations={invitations}
                setInvitations={setInvitations}
              />
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
                            <EventCard
                              date={event.date}
                              title={event.title}
                              location={event.location}
                              messages={event.messages}
                              picture={event.picture.url}
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
            ) : null}
          </>
        ) : null}
      </section>
    </motion.div>
  );
};

export default Dashboard;
