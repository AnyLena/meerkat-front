import { LuSendHorizonal } from "react-icons/lu";
import { useEffect, useRef } from "react";

const MessageInput = ({ setMessage, sendMessageData, message }) => {
  const handleChange = (e) => {
    setMessage((prev) => ({
      ...prev,
      message: { text: e.target.value, file: "" },
    }));
  };

  return (
    <div className="message-input">
      <form onSubmit={(e) => sendMessageData(e)}>
        <input
          onChange={handleChange}
          value={message.message.text}
          type="text"
          placeholder="Type a message..."
        />
        <button type="submit">
          <LuSendHorizonal />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
