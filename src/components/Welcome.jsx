import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Welcome = () => {
  return (
    <div className="welcome-screen">
      <h1>Welcome to Meerkats!</h1>
      <p>
        This is the place for you to create and plan events with your friends!
      </p>
      <Link to="/new">
        <Button className="btn-green">Create new Event</Button>
      </Link>
    </div>
  );
};

export default Welcome;
