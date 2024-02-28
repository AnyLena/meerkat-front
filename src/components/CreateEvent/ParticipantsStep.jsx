import { motion } from "framer-motion";
import { Box, Button, Chip, MenuItem, Select } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import "../../styles/create-event.css";

const ParticipantsStep = ({
  formStep,
  handleNext,
  handleBack,
  personName,
  handleChipChange,
  names,
}) => {

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

      <Select
        labelId="demo-multiple-chip-label"
        id="demo-multiple-chip"
        multiple
        value={personName}
        onChange={handleChipChange}
        renderValue={(selected) => (
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
            {selected.map((value) => (
              <Chip key={value} label={value} />
            ))}
          </Box>
        )}
      >
        {names.length > 0 && (
          <MenuItem value="" disabled>
            Select Participants
          </MenuItem>
        )}
        {names.map((name) => (
          <MenuItem key={name.id} value={name.name}>
            {name.name}
          </MenuItem>
        ))}
        {names.length === 0 && (
          <MenuItem value="" disabled>
            You have no contacts yet
          </MenuItem>
        )}
      </Select>

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "4rem",
          marginTop: "2rem",
        }}
      >
        <Button sx={buttonStyle} type="button" onClick={handleBack}>
          Back
        </Button>
        <Button sx={buttonStyle} type="button" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </motion.div>
  );
};

export default ParticipantsStep;
