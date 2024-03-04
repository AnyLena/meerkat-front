import { timeAgo } from "../../utils/timeAgo";
import { useRef, useEffect, useState } from "react";
import ImageModal from "./ImageModal";
import { IoDocumentTextOutline } from "react-icons/io5";

const MessageList = ({ messages, userId }) => {
  const messagesEndRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [open, setOpen] = useState(false);

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
                <div className="message-sender">{message.sender.name}</div>
                <div className="message-text">{message.text}</div>
              </div>
              <div className="file">
                {message.file && (
                  <>
                    <div className="file-container">
                      {message.file.match(/\.(jpeg|jpg|gif|png)$/) != null ? (
                        <img
                          onClick={() => setSelectedImage(message.file)}
                          src={message.file}
                          alt=""
                        />
                      ) : (
                        <IoDocumentTextOutline
                          onClick={() => window.open(message.file, "_blank")}
                          style={{
                            fontSize: "2.5rem",
                            backgroundColor: "var(--secondary-color)",
                            color: "white",
                            borderRadius: "50%",
                            padding: "0.5rem",
                          }}
                        />
                      )}
                    </div>
                    {selectedImage && (
                      <ImageModal
                        onClose={() => setSelectedImage(null)}
                        src={selectedImage}
                      />
                    )}
                  </>
                )}
              </div>
              <div className="message-date">{timeAgo(message.created)}</div>
            </div>
          </li>
        ))}
      </ul>
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
