import { timeAgo } from "../../utils/timeAgo";
import { useRef, useEffect } from "react";

const MessageList = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="message-list">
      <ul>
        {messages.map((message) => (
          <li key={message._id}>
            <div
              className={
                message.sender._id === userId ? "message sender" : "message"
              }
            >
              <img
                className="profile-small"
                src={message.sender.picture.url}
                alt=""
              />
              <div className="message-content">
                <div className="message-header">
                  <div className="message-sender">{message.sender.name}</div>
                  <div className="message-date">{timeAgo(message.created)}</div>
                </div>
                <div className="message-text">{message.message.text}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
