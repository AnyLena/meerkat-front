import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import Meerkat404 from "../assets/decorations/404meerkat.png";
import "../styles/notfound.css"

const NotInvited = () => {
  return (
    <section className="notfound">
      <div className="flex-item">
        <h1>Sorry!</h1>
        <h2>But you can not access this event.</h2>

        <p>Let us help you to get back an track.</p>
        <Link to="/">
          <Button className="btn-green">Go back to Dashboard</Button>
        </Link>
      </div>
      <div className="flex-item">
      <img src={Meerkat404} alt="A meerkat holding a map." />
      </div>
    </section>
  );
};

export default NotInvited;
