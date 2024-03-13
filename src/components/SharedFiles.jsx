import React, { useState } from "react";
import ImageModal from "./Messages/ImageModal";
import { IoDocumentTextOutline } from "react-icons/io5";
import "../styles/shared-files.css";
import "../styles/event.css";
const SharedFiles = ({ messages }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <>
      {messages && messages.find((mes) => mes.file !== null) && (
        <div className="shared-files">
          <div className="event-heading">
            <h2>Shared files</h2>
          </div>
          <div className="files">
            {messages.map((message, index) =>
              message.file && (
                <div key={index}>
                  {message.file?.match(/\.(jpeg|jpg|gif|png|webp)$/) != null ? (
                    <img
                      onClick={() => setSelectedImage(message.file)}
                      src={message.file}
                      alt=""
                    />
                  ) : message.file != null ? (
                    <div
                      className="file-icon"
                      onClick={() => window.open(message.file, "_blank")}
                    >
                      <IoDocumentTextOutline className="icon" />

                      <p>
                        <span>
                          {message.file
                            .slice(message.file.lastIndexOf(".") + 1)
                            .toUpperCase()}
                        </span>{" "}
                        file
                      </p>
                      <p>
                        shared by <span>{message.sender.name}</span>
                      </p>
                      <p>on {message.created.slice(0, 10)}</p>
                    </div>
                  ) : null}
                  {selectedImage && (
                    <ImageModal
                      onClose={() => setSelectedImage(null)}
                      src={selectedImage}
                    />
                  )}
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default SharedFiles;
