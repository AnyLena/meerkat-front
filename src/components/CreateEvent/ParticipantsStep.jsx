import { motion } from "framer-motion";
import { Box, Button, Chip, MenuItem, Select } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import "../../styles/create-event.css";
import EmailInvitation from "./EmailInvitation";

const ParticipantsStep = ({
  formStep,
  handleNext,
  handleBack,
  names,
  invitations,
  setInvitations,
  emailInvitations,
  setEmailInvitations,
}) => {
  const handleInvitation = (id) => {
    if (invitations.includes(id)) {
      setInvitations(invitations.filter((invitation) => invitation !== id));
    } else {
      setInvitations([...invitations, id]);
    }
  };

  const handleInviteAll = () => {
    if (invitations.length === names.length) {
      setInvitations([]);
    } else {
      setInvitations(names.map((name) => name._id));
    }
  };
  return (
    <motion.div
      initial={{ x: -100 * formStep + "%" }}
      animate={{ x: -100 * formStep + "%" }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="form-step participants"
    >
      <label className="form-step-label">
        <p>Who's coming?</p>
      </label>
      <div className="participants-buttons">
        <div className="participants-container">
          {names.length > 0 &&
            names.map((name) => (
              <div
                onClick={() => handleInvitation(name._id)}
                key={name._id}
                className={
                  invitations.includes(name._id)
                    ? "participant participant-selected"
                    : "participant"
                }
              >
                <img src={name.picture.url} alt="profile" />
                <p>{name.name}</p>
              </div>
            ))}
          {names.length === 0 && (
            <p className="no-participants">You have no contacts yet</p>
          )}
        </div>
        {names.length > 0 && (
          <div className="invite-all-btn">
            <Button
              className={
                invitations.length === names.length
                  ? "invited-all"
                  : "invite-all"
              }
              onClick={handleInviteAll}
            >
              {invitations.length === names.length
                ? "uninvite all"
                : "invite all"}
            </Button>
          </div>
        )}
      </div>
      <EmailInvitation
        names={names}
        emailInvitations={emailInvitations}
        setEmailInvitations={setEmailInvitations}
      />
    </motion.div>
  );
};

export default ParticipantsStep;
