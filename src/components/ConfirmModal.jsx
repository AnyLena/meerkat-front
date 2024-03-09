import "../styles/confirm-modal.css";
import { motion } from "framer-motion";
const ConfirmModal = ({ message, handleConfirm, setActive, active }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="modal-container"
    >
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4 }}
        className="confirm"
      >
        <p>{message}</p>
        <div className="buttons">
          <button onClick={handleConfirm} className="confirm-btn">
            Yes
          </button>
          <button onClick={() => setActive(!active)} className="cancel-btn">
            No
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ConfirmModal;
