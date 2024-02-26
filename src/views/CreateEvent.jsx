import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Chip from "@mui/material/Chip";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { CiLocationOn } from "react-icons/ci"; 

import { motion } from "framer-motion";
import "../styles/create-event.css";

const Form = () => {
  const [formStep, setFormStep] = useState(-2);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    participants: [],
    image: "",
  });
  const [personName, setPersonName] = useState([]);
  const navigate = useNavigate();

  const names = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Doe" },
    { id: 3, name: "John Smith" },
    { id: 4, name: "Jane Smith" },
    { id: 5, name: "John Johnson" },
    { id: 6, name: "Jane Johnson" },
  ];

  const handleNext = () => {
    setFormStep((step) => step + 1);
  };

  const handleBack = () => {
    setFormStep((step) => step - 1);
  };

  const handleChipChange = (event) => {
    const {
      target: { value },
    } = event;
    const uniqueParticipants = value.filter(
      (participant, index, self) =>
        index === self.findIndex((p) => p.id === participant.id)
    );
    setPersonName(uniqueParticipants);
    console.log(personName);
    setFormData({
      ...formData,
      participants: uniqueParticipants.map((v) => v.id),
    });
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        {/* STEP 1 */}
        <Button className='back-btn' onClick={()=>navigate(-1)}>Back</Button>
        <h1>Create an event</h1>
        <motion.div
          className="multi-step-form"
          initial={{ y: 600, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <motion.div
            initial={{ x: -100 * formStep + "%" }}
            animate={{ x: -100 * formStep + "%" }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="form-step title"
          >
            <InputLabel id="demo-multiple-chip-label">
              What is it about?
            </InputLabel>

            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-basic"
                label="Title"
                required
                variant="outlined"
                onChange={(e) => handleChange("title", e.target.value)}
              />

              <TextField
                id="outlined-multiline-static"
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                style={{ marginTop: "2rem" }}
                onChange={(e) => handleChange("description", e.target.value)}
              />
            </Box>

            <Button
              disabled={!formData.title}
              type="button"
              onClick={handleNext}
            >
              Next
            </Button>
          </motion.div>

          {/* STEP 2 */}
          <motion.div
            initial={{ x: -100 * formStep + "%" }}
            animate={{ x: -100 * formStep + "%" }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="form-step date"
          >
            <InputLabel id="demo-multiple-chip-label">
              When and where?
            </InputLabel>

            <DateCalendar
              label="Date"
              onChange={(newValue) => handleChange("date", newValue)}
            />
            <TimePicker
              label="Time"
              onChange={(newValue) => handleChange("time", newValue)}
              style={{}}
            />
            <TextField
              id="outlined-basic"
              label="Location"
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <CiLocationOn
                    style={{ fontSize: "2rem", color: "darkGrey" }}
                  />
                ),
              }}
              onChange={(e) => handleChange("location", e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "4rem",
              }}
            >
              <Button type="button" onClick={handleBack}>
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
              >
                Next
              </Button>
            </Box>
          </motion.div>

          {/* STEP 3 */}
          <motion.div
            initial={{ x: -100 * formStep + "%" }}
            animate={{ x: -100 * formStep + "%" }}
            transition={{ ease: "easeInOut", duration: 0.3 }}
            className="form-step participants"
          >
            <InputLabel id="demo-multiple-chip-label">Who's coming?</InputLabel>
            <Select
              labelId="demo-multiple-chip-label"
              id="demo-multiple-chip"
              multiple
              value={personName}
              onChange={handleChipChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip key={value.id} label={value.name} />
                  ))}
                </Box>
              )}
            >
              {names.map((name) => (
                <MenuItem key={name.id} value={name}>
                  {name.name}
                </MenuItem>
              ))}
            </Select>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: "4rem",
              }}
            >
              <Button type="button" onClick={handleBack}>
                Back
              </Button>
              <Button type="button" onClick={handleNext}>
                Next
              </Button>
            </Box>
          </motion.div>

          {/* STEP 4 */}
          <motion.div
            initial={{ x: -100 * formStep + "%" }}
            animate={{ x: -100 * formStep + "%" }}
            transition={{ ease: "easeOut", duration: 0.3 }}
            className="form-step image"
          >
            <InputLabel id="demo-multiple-chip-label">
              Select an image and you're done!
            </InputLabel>
            <Button type="button" onClick={handleBack}>
              Back
            </Button>
            <Button type="submit" onClick={handleSubmit}>
              Create Event
            </Button>
          </motion.div>

          <motion.div
            initial={{ x: 100 * formStep + "%" }}
            animate={{ x: -100 * formStep + "%" }}
            className="form-step extra"
          ></motion.div>
        </motion.div>
      </LocalizationProvider>
    </>
  );
};

export default Form;
