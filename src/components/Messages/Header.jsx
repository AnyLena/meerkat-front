import { Button } from "@mui/material";
import { motion } from "framer-motion";
import { IoIosClose } from "react-icons/io";

const Header = ({ setOpen }) => {
  return (
    <div className="messages-header">
      <motion.div
        initial={{ y: -600, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.5 }}
        className="messages-header-h2"
      >
        <h2>Messages</h2>
        <div className="messages-header-close">
          <Button
            className="btn-close"
            onClick={() => {
              setOpen(false);
            }}
            sx={{
              borderRadius: "50%",
              backgroundColor: "rgba(241, 241, 241)",
              color: "white",
              width: "40px",
              height: "40px",
              minWidth: "0 !important",
            }}
          >
            <IoIosClose style={{ fontSize: "1.25rem" }} />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default Header;
