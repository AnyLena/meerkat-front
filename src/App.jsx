import "./styles/app.css";
import "./styles/fonts.css";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import Landing from "./views/Landing";
import Navbar from "./components/Navbar";
import Dashboard from "./views/Dashboard";
import Event from "./views/Event";
import CreateEvent from "./views/CreateEvent";
import Profile from "./views/Profile";

function App() {
  const { user } = useAuth();
  return (
    <>
      {!user ? (
        <Landing />
      ) : (
        <>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/new" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/:id" element={<Event />} />
          </Routes>
          <Navbar />
        </>
      )}
    </>
  );
}

export default App;
