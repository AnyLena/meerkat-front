import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/useAuth";
import { fetchMessages, sendMessage } from "../../api/messages";
import "../../styles/messages.css";

// Components
import Header from "./Header";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const Messages = ({ eventTitle, open, setOpen, messages, setMessages }) => {
  const { user, token } = useAuth();
  const { id } = useParams();

  const [message, setMessage] = useState({
    event: id,
    sender: user._id,
    text: "",
    file: "",
  });

  const sendMessageData = (e) => {
    e.preventDefault();
    if (!message.text && !message.file) return;
  
    const formData = new FormData();
    formData.append('event', message.event);
    formData.append('sender', message.sender);
    formData.append('text', message.text);
    if (message.file) {
      formData.append('file', message.file);
    }
  
    console.log("sending", formData);
    sendMessage(id, formData, token, setMessages);
    setMessage({
      ...message,
      text: "",
      file: "",
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
          <Header setOpen={setOpen} eventTitle={eventTitle}/>
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
