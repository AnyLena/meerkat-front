import { IoIosClose } from "react-icons/io";
import "../../styles/image-modal.css";
import { motion } from "framer-motion";

const ImageModal = ({ src, onClose }) => {
  return (
    <motion.div
      className="image-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <div className="modal-content">
        <div className="modal-header">
          <button
            onClick={(e) => {
              onClose();
            }}
            className="btn-close"
          >
            <IoIosClose style={{ fontSize: "1.25rem" }} />
          </button>
        </div>
        <div className="modal-body" onClick={(e) => e.stopPropagation()}>
          <img src={src} alt="" />
        </div>
      </div>
    </motion.div>
  );
};

export default ImageModal;
