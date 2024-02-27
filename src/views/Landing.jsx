import Login from "./Login";
import Signup from "./Signup";
import Message from "../components/Message";
import { useState } from "react";
import "../styles/landing.css";

const Landing = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  return (
    <>
      {showLogin ? (
        <Login
          setShowLogin={setShowLogin}
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
        />
      ) : (
        <Signup
          setShowLogin={setShowLogin}
          setMessage={setMessage}
          setErrorMessage={setErrorMessage}
        />
      )}
      {message && <Message message={message} severity="success" />}
      {errorMessage && <Message message={errorMessage} severity="error" />}
    </>
  );
};

export default Landing;
