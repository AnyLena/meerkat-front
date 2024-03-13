import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { fetchUserEvents } from "../api/events.js";
import { welcomeMessages } from "../utils/welcomeMessages.js";
import DashboardMenu from "../components/DashboardMenu.jsx";

//COMPONENTS
import EventCard from "../components/EventCard";
import Notifications from "../components/Notifications";
import Welcome from "../components/Welcome";
import NavBar from "../components/Navbar";
import Loader from "../components/Loader.jsx";

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
  const [loadingEvents, setLoadingEvents] = useState(false);
  const today = new Date();
  const randomMessage = Math.floor(Math.random() * welcomeMessages.length);

  useEffect(() => {
    fetchUserEvents(setUserEvents, token, setLoadingEvents);
    getMyInvitations(token, setInvitations);
  }, []);

  useEffect(() => {
    fetchUserEvents(setUserEvents, token);
  }, [invitations]);

  return (
    <>
      {Object.keys(user).length > 0 ? <DashboardMenu /> : null}
      <section className="dashboard">
        {user ? (
          <>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {loadingEvents ? <Loader /> : null}
              {!loadingEvents &&
              invitations.length === 0 &&
              userEvents.length === 0 ? (
                <Welcome />
              ) : null}
              {invitations.length > 0 ? (
                <>
                  <h2>
                    Notifications{" "}
                    <span className="notification-number">
                      {invitations.length}
                    </span>
                  </h2>
                  <div className="notifications">
                    {invitations.some(
                      (invitation) => invitation.type === "event"
                    ) ? (
                      <div>
                        <h3>
                          Event Invitations
                        </h3>
                        <Notifications
                          invitations={invitations}
                          setInvitations={setInvitations}
                          setUser={setUser}
                          type="event"
                          setUserEvents={setUserEvents}
                        />{" "}
                      </div>
                    ) : null}

                    {invitations.some(
                      (invitation) => invitation.type === "friendship"
                    ) ? (
                      <div>
                        <h3 className="second-h3">
                          Friend Requests
                        </h3>
                        <Notifications
                          invitations={invitations}
                          setInvitations={setInvitations}
                          setUser={setUser}
                          type="friendship"
                        />{" "}
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </motion.div>

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
      <NavBar />
    </>
  );
};

export default Dashboard;
