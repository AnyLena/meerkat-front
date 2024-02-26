// Import your component pages
import Dashboard from "../views/Dashboard";
import Event from "../views/Event";
import CreateEvent from "../views/CreateEvent";
import Profile from "../views/Profile";
import Login from "../views/Login";
import Signup from "../views/Signup";

// Public routes are accessible without authentication
export const publicRoutes = [
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> },
];

// Private routes require authentication
export const privateRoutes = [
  { path: "/", element: <Dashboard /> },
  { path: "/new", element: <CreateEvent /> },
  { path: "/profile", element: <Profile /> },
  { path: "/event/:id", element: <Event /> },
];
