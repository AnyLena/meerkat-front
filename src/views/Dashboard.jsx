import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";
import { motion } from "framer-motion";

const Dashboard = () => {

  const { user, logout } = useAuth();

  return (
    <motion.div
    initial={{ opacity: 0}}
    animate={{ opacity: 1 }}
    transition={{ duration: 1.5 }}
    >
      <h1>Dashboard</h1>
      { user.user && <h2>Hello {user.user.name}</h2> }
      <button onClick={logout}>Logout</button>
    </motion.div>
  );
};

export default Dashboard;
