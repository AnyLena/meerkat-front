import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";
import Infobox from "../components/Infobox";
import { Link } from "react-router-dom";
import ProfilePicture from "../assets/decorations/traveler.jpg";

import "../styles/dashboard.css";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const today = new Date();

  const welcomeMessages = [
    "Welcome to your event planning dashboard! Let's bring your vision to life.",
    "Hello and welcome! Your next event starts one click away.",
    "Welcome back, event planner! Let's make some magic happen today.",
    "Hi there, and welcome to your personalized event planning space!",
    "Welcome Event Planner! Let's get started on creating something amazing together.",
    "Hey there, and a warm welcome to your Meerkat Dashboard!",
    "Welcome back! Your next great event is just a click away.",
    "Hello and welcome - it's time to plan something special!",
    "Welcome back, planner extraordinaire! Let's turn those ideas into reality right here on your dashboard.",
    "Welcome home – this is where the magic happens in creating unforgettable events!",
  ];

  const randomMessage = Math.floor(Math.random() * welcomeMessages.length);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <section className="dashboard">
        
        {user.user ? (
          <>
          <div className="logo">
          <button onClick={logout}>Logout</button>
            <h1>Hello {user.user.name}</h1>
            <p className="welcome-message">{welcomeMessages[randomMessage]}</p>
            <img
              className="user-picture"
              src={user.user.picture == 1 ? ProfilePicture : user.user.picture}
              alt=""
              />
              </div>

            {user.events.length > 0 ? (
               <motion.div
               initial={{ opacity: 0, y: 100 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7 }}
             >
              <section className="dashboard-events top-div">
                <h2>Your Upcoming Events</h2>
                <div className="white-background">

                {user.events.map((event) =>
                  new Date(event.date.start) > today ? (
                    <div key={event._id}>
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
            {user.events.length > 0 ? (
              <section className="dashboard-events">
                <h2>Past Events</h2>
                {user.events.map((event) =>
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
