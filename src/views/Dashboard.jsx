import { useState, useEffect } from "react";
import { useAuth } from "../context/useAuth";

const Dashboard = () => {

  const { user, logout } = useAuth();

  return (
    <>
      <h1>Dashboard</h1>
      { user.user && <h2>Hello {user.user.name}</h2> }
      <button onClick={logout}>Logout</button>
    </>
  );
};

export default Dashboard;
