import { useEffect, useState } from "react";
import { useAuth } from "../../context/useAuth";
import "../../styles/messages.css";
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { motion } from "framer-motion";
import { fetchMessages, sendMessage } from "../../api/messages";
import { useParams } from "react-router-dom";

const Messages = ({ open, setOpen }) => {
  const { user, token } = useAuth();
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({
    event: id,
    sender: user._id,
    message: {
      text: "",
      file: "",
    },
  });

  console.log("user", user._id, "event", id);

  const sendMessageData = (e) => {
    e.preventDefault();
    sendMessage(id, message, token, setMessages);
    setMessage({
      ...message,
      message: {
        text: "",
        file: "",
      },
    });
  };

  useEffect(() => {
    fetchMessages(id, token, setMessages);
  }, []);

  return (
    open && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="modal"
      >
        <div className="messages-container">
          <Header setOpen={setOpen} />
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="messages-content"
          >
            <MessageList messages={messages} userId={user._id} />
            <MessageInput
              setMessage={setMessage}
              sendMessageData={sendMessageData}
              message={message}
            />
          </motion.div>
        </div>
      </motion.div>
    )
  );
};

export default Messages;
