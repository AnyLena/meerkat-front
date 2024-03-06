import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { fetchUserEvents } from "../api/events.js";
import { welcomeMessages } from "../utils/welcomeMessages.js";
import DashboardMenu from "../components/DashboardMenu.jsx";

//COMPONENTS
import EventCard from "../components/EventCard";
import Notifications from "../components/Notifications";

//STYLES
import "../styles/dashboard.css";
import "../styles/notifications.css";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getMyInvitations } from "../api/invitations.js";

const Dashboard = () => {
  const { user, setUser, token } = useAuth();
  const [userEvents, setUserEvents] = useState([]);
  const [invitations, setInvitations] = useState([]);
  const today = new Date();
  const randomMessage = Math.floor(Math.random() * welcomeMessages.length);

  useEffect(() => {
    fetchUserEvents(setUserEvents, token);
    getMyInvitations(token, setInvitations);
  }, []);

  useEffect(() => {
    console.log(invitations);
  }, [invitations]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      {Object.keys(user).length > 0 ? <DashboardMenu /> : null}
      <section className="dashboard">
        {user ? (
          <>
            <div className="logo">
              <h1>Hello, {user.name}!</h1>
              <p className="welcome-message">
                {welcomeMessages[randomMessage]}
              </p>
            </div>

            <h2>Notifications</h2>
            {invitations.length > 0 ? (
              <div className="notifications">
                <h3 className="notifications-head_a">Event Invitations</h3>
                <Notifications
                  invitations={invitations}
                  setInvitations={setInvitations}
                  setUser={setUser}
                  type="event"
                />
                <h3 className="notifications-head_b">Friend Requests</h3>

                <Notifications
                  invitations={invitations}
                  setInvitations={setInvitations}
                  setUser={setUser}
                  type="friendship"
                />
              </div>
            ) : null}

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
