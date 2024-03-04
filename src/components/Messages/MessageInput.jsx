import { LuSendHorizonal } from "react-icons/lu";
import { FiPaperclip } from "react-icons/fi";

const MessageInput = ({ setMessage, sendMessageData, message }) => {
  const handleChange = (key, value) => {
    setMessage((prev) => ({
      ...prev,
      [key]: value,
    }));
    console.log(message);
  };

  return (
    <div className="message-input">
      <form onSubmit={(e) => sendMessageData(e)}>
        <input
          type="file"
          name="file"
          id="file"
          className="inputfile"
          onChange={(e) => handleChange("file", e.target.files[0])}
        />
        <label htmlFor="file" className="fileLabel">
          <FiPaperclip />
        </label>
        <input
          onChange={(e) => handleChange("text", e.target.value)}
          value={message.text}
          type="text"
          className="inputtext"
          name="text"
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
