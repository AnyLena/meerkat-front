import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";
import Infobox from "../components/Infobox";
import { Link } from "react-router-dom";

import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <section className="dashboard">
        <button onClick={logout}>Logout</button>
        {user.user ? (
          <>
            <img className="user-picture" src={user.user.picture} alt="" />
            <h1>Hello {user.user.name}</h1>

            {user.events.length > 0 ? (
              <section className="upcoming-events">
                <h2>Your Upcoming Events</h2>
                {user.events.map((event) => (
                  <Link to={`/event/${event._id}`}>
                    <Infobox
                      date={event.date}
                      title={event.title}
                      location={event.location}
                    />
                  </Link>
                ))}
              </section>
            ) : null}
          </>
        ) : null}
      </section>
    </motion.div>
  );
};

export default Dashboard;
