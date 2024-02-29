import { Modal, Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import "../styles/participants.css";
import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";
import { getUserNames } from "../api/users.js";
import { addParticipant, removeParticipant } from "../api/events.js";

const Participants = ({ open, setOpen, setEventData, eventData }) => {
  const { user, token } = useAuth();
  const [contactsFilter, setContactsFilter] = useState({});
  const [contacts, setContacts] = useState({});

  const style = {
    backgroundColor: "white",
    height: "100vh",
    overflow: "scroll",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = (e) => {
    const participantId = e.target.id;
    addParticipant(participantId, token, eventData._id, setEventData);
  };

  const handleRemove = async (e) => {
    const participantId = e.target.id;
    removeParticipant(participantId, token, eventData._id, setEventData);
  };

  const filterContacts = () => {
    const filteredContacts = user.contacts.filter(
      (contact) =>
        !eventData.participants.some(
          (participant) => participant._id === contact
        )
    );
    setContactsFilter(filteredContacts);
  };

  useEffect(() => {
    filterContacts();
  }, [eventData]);

  useEffect(() => {
    getUserNames(contactsFilter, token, setContacts);
  }, [contactsFilter]);

  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Box sx={style}>
            <div className="participant-modal">
              <div className="button-container">
                <button id="participants-btn" onClick={handleClose}>
                  close
                </button>
              </div>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                <h2>Participants</h2>
                <section className="participant-modal">
                  {eventData.participants.map((participant) => (
                    <div
                      className="participant-container"
                      key={participant._id}
                    >
                      <img src={participant.picture} alt="" />
                      <div>{participant.name}</div>
                      {eventData.owner === user._id ? (
                        <button
                          onClick={handleRemove}
                          id={participant._id}
                          className="remove-btn"
                        >
                          remove
                        </button>
                      ) : null}
                    </div>
                  ))}
                </section>

                {eventData.owner === user._id ? (
                  <>
                    <h2>Invite Meerkats</h2>
                    <section className="participant-modal">
                      {Object.keys(contacts).length > 0
                        ? contacts.map((participant) => (
                            <div
                              className="participant-container"
                              key={participant._id}
                            >
                              <img src={participant.picture} alt="" />
                              <div>{participant.name}</div>
                              {eventData.owner === user._id ? (
                                <button
                                  onClick={handleAdd}
                                  id={participant._id}
                                  className="remove-btn"
                                >
                                  add
                                </button>
                              ) : null}
                            </div>
                          ))
                        : null}
                    </section>
                  </>
                ) : null}
              </Typography>
            </div>
          </Box>
        </motion.div>
      </Modal>
    </>
  );
};

export default Participants;