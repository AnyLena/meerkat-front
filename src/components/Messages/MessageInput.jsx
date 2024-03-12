import { LuSendHorizonal } from "react-icons/lu";
import { FiPaperclip } from "react-icons/fi";
import { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IoDocumentTextOutline } from "react-icons/io5";


const MessageInput = ({ setMessage, sendMessageData, message }) => {
  const [preview, setPreview] = useState(null);

  const handleChange = (key, value) => {
    setMessage((prev) => ({
      ...prev,
      [key]: value,
    }));
    if (key === "file") {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ data: reader.result, type: value.type });
      };
      reader.readAsDataURL(value);
    }
  };

  const handleSend = (e) => {
    setPreview(null);
    sendMessageData(e);
  };

  return (
    <div className="message-input">
      <form onSubmit={handleSend}>
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
        {preview && (
          <>
            {preview.type.startsWith("image/") ? (
              <div className="preview-img-message-container">
                <img
                  src={preview.data}
                  alt="Preview"
                  className="preview-img-message"
                />
                <button
                  onClick={() => setPreview(null)}
                  className="remove-preview"
                >
                  <FaRegTrashCan className="icon" />
                </button>
              </div>
            ) : (
              <div className="preview-pdf-message-container">
                <IoDocumentTextOutline className="document-icon"/>
                <button
                  onClick={() => setPreview(null)}
                  className="remove-preview"
                >
                  <FaRegTrashCan className="icon" />
                </button>
              </div>
            )}
          </>
        )}
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
