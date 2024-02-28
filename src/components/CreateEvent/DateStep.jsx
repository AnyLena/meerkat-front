import React from "react";
import { motion } from "framer-motion";
import { Box, Button, TextField } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import "../../styles/create-event.css";
import { CiLocationOn } from "react-icons/ci";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";

const DateStep = ({formStep, handleChange, handleNext, handleBack, formData}) => {
  return (
    <motion.div
      initial={{ x: -100 * formStep + "%" }}
      animate={{ x: -100 * formStep + "%" }}
      transition={{ ease: "easeInOut", duration: 0.3 }}
      className="form-step date"
    >
      <label className="form-step-label">
        <p>When and where?</p>
      </label>

      <DateCalendar
        label="Date"
        onChange={(newValue) => handleChange("date", newValue)}
        className="date-picker"
        required
      />

      <TimePicker
        label="Time"
        required
        onChange={(newValue) => handleChange("time", newValue)}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
      <TextField
        id="outlined-basic"
        label="Location"
        variant="outlined"
        required
        InputProps={{
          endAdornment: (
            <CiLocationOn style={{ fontSize: "2rem", color: "darkGrey" }} />
          ),
        }}
        sx={{
          ".MuiInputBase-root": {
            alignItems: "center",
          },
        }}
        onChange={(e) => handleChange("location", e.target.value)}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "4rem",
          marginTop: "2rem",
        }}
      >
        <Button type="button" onClick={handleBack} sx={buttonStyle}>
          Back
        </Button>
        <Button
          disabled={
            formData.date === "" ||
            formData.time === "" ||
            formData.location === ""
          }
          type="button"
          onClick={handleNext}
          sx={buttonStyle}
        >
          Next
        </Button>
      </Box>
    </motion.div>
  );
};

export default DateStep;
