// General
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "../styles/create-event.css";
import axios from "axios";
import { useAuth } from "../context/useAuth";

// MUI
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
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../context/theme";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";

// Icons
import { CiLocationOn } from "react-icons/ci";
import { IoIosArrowBack } from "react-icons/io";

// Backgrounds
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
  const SERVER = import.meta.env.VITE_SERVER;
  const { user } = useAuth();

  const names = [
    { id: "65d8b08c0806ca2aca3837d9", name: "John Doe" },
    { id: "65d8b65ead9e5b3b3d55a311", name: "Jane Doe" },
    { id: "65d8b713ad91b47dfbc6c28c", name: "John Smith" },
    { id: "65d8d016f431be9b9227159a", name: "Jane Smith" },
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

  const handleNext = () => {
    setFormStep((step) => step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setFormStep((step) => step - 1);
    window.scrollTo(0, 0);
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
      image.classList.remove("selected");
    });
    const selectedImage = document.querySelector(`[style*="${value}"]`);
    selectedImage.classList.add("selected");

    console.log(formData);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const handleSubmit = async () => {
    const date = new Date(formData.date);
    const time = new Date(formData.time);
    const dateTime = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      time.getHours(),
      time.getMinutes()
    );
    const data = {
      title: formData.title,
      description: formData.description,
      date: { start: dateTime, end: "" },
      location: { description: formData.location, lat: 0, long: 0 },
      participants: formData.participants,
      picture: formData.image,
      owner: user.user._id,
    };

    try {
      const response = await axios.post(`${SERVER}/events`, data);
      console.log(response);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
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
            <Button
              className="back-btn"
              onClick={() => navigate(-1)}
              sx={{
                borderRadius: "50%",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
                color: "white",
                width: "40px",
                height: "40px",
                minWidth: "0 !important",
              }}
            >
              <IoIosArrowBack style={{ fontSize: "1.25rem" }} />
            </Button>
            <div className="title-container">
              <h2>Create an event</h2>
            </div>
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
              // hide scroll bar
            >
              <label className="form-step-label">
                <p>What is it about?</p>
              </label>

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
                className="next-btn"
                sx={{ width: "60px", margin: "2rem auto" }}
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
                    <CiLocationOn
                      style={{ fontSize: "2rem", color: "darkGrey" }}
                    />
                  ),
                }}
                sx={{
                  ".MuiInputBase-root": {
                    alignItems: "center", // Align the input text and the adornment vertically
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
                <Button className="back-btn" type="button" onClick={handleBack}>
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
                  className="next-btn"
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
                  justifyContent: "center",
                  gap: "4rem",
                  marginTop: "2rem",
                }}
              >
                <Button className="back-btn" type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button className="next-btn" type="button" onClick={handleNext}>
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
              <label className="form-step-label-last">
                <p>Select an image. Done!</p>
              </label>

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
                  justifyContent: "center",
                  gap: "4rem",
                  marginBottom: "8rem",
                }}
              >
                <Button className="back-btn" type="button" onClick={handleBack}>
                  Back
                </Button>
                <Button
                  className="create-event-btn"
                  type="submit"
                  onClick={handleSubmit}
                  sx={{
                    animation: "pulse 2s infinite",

                    backgroundColor: "var(--headingBG-color)",
                    color: "black",
                    "&:hover": {
                      backgroundColor: "var(--headingBG-color)",
                    },
                  }}
                >
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
