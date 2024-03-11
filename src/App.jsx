import "./styles/app.css";
import "./styles/fonts.css";
import { Navigate, Routes, Route } from "react-router-dom";
import { useAuth } from "./context/useAuth";

//VIEWS
import Landing from "./views/Landing";
import Dashboard from "./views/Dashboard";
import Event from "./views/Event";
import CreateEvent from "./views/CreateEvent";
import Profile from "./views/Profile";
import PastEvents from "./views/PastEvents";
import CompleteRegistration from "./views/CompleteRegistration";
import NotFound from "./components/NotFound";

//COMPONENTS
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";


function App() {
  const { token, globalLoading } = useAuth();

  return (
    <>
      {globalLoading ? (
        <Loader />
      ) : !token ? (
        <Routes>
          <Route index element={<Landing />} />
          <Route
            path="/complete-registration/:token"
            element={<CompleteRegistration />}
          />
           <Route path="/not-found" element={<NotFound />} />
           <Route path="*" element={<Navigate to="/not-found" replace />} />
        </Routes>
      ) : (
        <>
          <Routes>
            <Route index element={<Dashboard />} />
            <Route path="/past-events" element={<PastEvents />} />
            <Route path="/new" element={<CreateEvent />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event/:id" element={<Event />} />

            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Routes>
        </>
      )}
    </>
  );
}

export default App;
