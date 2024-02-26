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
import { createTheme, ThemeProvider } from "@mui/material/styles";

import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";
import { motion } from "framer-motion";
import "../styles/create-event.css";
// import backgroudn images
import bg1 from "../assets/backgrounds/1.webp";
import bg2 from "../assets/backgrounds/2.webp";
import bg3 from "../assets/backgrounds/3.webp";
import bg4 from "../assets/backgrounds/4.webp";
import bg5 from "../assets/backgrounds/5.webp";
import bg6 from "../assets/backgrounds/6.webp";
import bg7 from "../assets/backgrounds/7.webp";
import bg8 from "../assets/backgrounds/8.webp";
import bg9 from "../assets/backgrounds/9.webp";
import bg10 from "../assets/backgrounds/10.webp";
import bg11 from "../assets/backgrounds/11.webp";
import bg12 from "../assets/backgrounds/12.webp";

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

  const images = [
    bg1,
    bg2,
    bg3,
    bg4,
    bg5,
    bg6,
    bg7,
    bg8,
    bg9,
    bg10,
    bg11,
    bg12,
  ];

  const theme = createTheme({
    typography: {
      fontFamily: "--var(--body-font)",
    },
  });

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
  const handleSelectImage = (key, value) => {
    setFormData({ ...formData, [key]: value });
    const images = document.querySelectorAll(".image");
    images.forEach((image) => {
      image.style.border = "none";
    });
    const selectedImage = document.querySelector(`[style*="${value}"]`);
    selectedImage.style.border = "4px solid var(--primary-color)";
    console.log(formData);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
    console.log(formData);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <div className="create-event">
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterLuxon}>
          <motion.div
            initial={{ y: -600, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="create-event-header"
          >
            <Button className="back-btn" onClick={() => navigate(-1)}>
              <IoIosArrowBack />
            </Button>
            <h2>Create an event</h2>
          </motion.div>

          {/* STEP 1 */}
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
              <InputLabel className="form-step-label">
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
              <InputLabel className="form-step-label">
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
                ampm={false}
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
              <InputLabel className="form-step-label">Who's coming?</InputLabel>
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
              <InputLabel className="form-step-label">
                Select an image and you're done!
              </InputLabel>

              <div className="image-container">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="image"
                    style={{
                      backgroundImage: `url(${image})`,
                    }}
                    onClick={() => handleSelectImage("image", image)}
                  ></motion.div>
                ))}
              </div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: "4rem",
                  marginBottom: "10rem",
                }}
              >
                <Button type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button type="submit" onClick={handleSubmit}>
                  Create Event
                </Button>
              </Box>
            </motion.div>

            {/* extra step */}
            <motion.div
              initial={{ x: 100 * formStep + "%" }}
              animate={{ x: -100 * formStep + "%" }}
              className="form-step extra"
            ></motion.div>
          </motion.div>
        </LocalizationProvider>
      </ThemeProvider>
    </div>
  );
};

export default Form;
