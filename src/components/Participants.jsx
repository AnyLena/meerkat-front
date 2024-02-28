import {
  Modal,
  Box,
  Typography,
  MenuItem,
  Chip,
  Select,
  OutlinedInput,
} from "@mui/material";
import { motion } from "framer-motion";
import "../styles/participants.css";
import { useAuth } from "../context/useAuth";
import { useEffect, useState } from "react";

const Participants = ({ open, setOpen, participants, ownerId }) => {
  const { user } = useAuth();
  const [participantsId, setParticipantsId] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  const [selected, setSelected] = useState([]);
  const [names, setNames] = useState([]);
  const [contacts, setContacts] = useState({});

  const style = {
    backgroundColor: "white",
    height: "100vh",
    overflow: "scroll",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChipChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelected(typeof value === "string" ? value.split(",") : value);
  };

  const handleUpdate = () => {
    //  const response = await axios.pur(`${SERVER}/events/${event._id}`, data);
  };

  const filterContacts = () => {
    const filteredContacts = user.contacts.filter(
      (contact) =>
        !participants.some((participant) => participant._id === contact._id)
    );
    setContacts(filteredContacts);
  };

  const getParticipantsId = () => {
    const ids = participants.map((participant) => participant._id);
    setParticipantsId(ids);
  };

  useEffect(() => {
    // console.log("selected", selected);
    // console.log("contacts", contacts);
    // console.log("participants", participants);
    console.log("participantsID", participantsId);
  }, [selected, contacts]);

  useEffect(() => {
    filterContacts();
    getParticipantsId();
  }, []);

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
                  {participants.map((participant) => (
                    <div
                      className="participant-container"
                      key={participant._id}
                    >
                      <img src={participant.picture} alt="" />
                      <div>{participant.name}</div>
                      {ownerId === user._id ? (
                        <button onClick={handleUpdate} id="remove-btn">
                          remove
                        </button>
                      ) : null}
                    </div>
                  ))}
                </section>

                {ownerId === user._id ? (
                  <>
                    <h2>Invite Meerkats</h2>
                    {contacts.length > 0 ? (
                      <section className="participants">
                        <Select
                          labelId="demo-multiple-chip-label"
                          id="invite-multiple-chip"
                          multiple
                          value={selected}
                          onChange={handleChipChange}
                          input={
                            <OutlinedInput
                              id="select-multiple-chip"
                              label="Participants"
                            />
                          }
                          renderValue={(selected) => (
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: 0.5,
                                width: "100%",
                              }}
                            >
                              {selected.map((value) => (
                                <Chip key={value} label={value} />
                              ))}
                            </Box>
                          )}
                        >
                          {contacts.map((contact) => (
                            <MenuItem key={contact._id} value={contact.name}>
                              {contact.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <button id="invite-btn" onClick={handleUpdate}>
                          Invite
                        </button>
                      </section>
                    ) : (
                      <p className="all-invited">
                        You have invited the whole pack!
                      </p>
                    )}
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
