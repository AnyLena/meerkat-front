// General
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../context/useAuth";
import { createEvent } from "../api/events";
import { getUserNames } from "../api/users";
import "../styles/create-event.css";

// MUI
import Button from "@mui/material/Button";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../context/theme";

// Icons
import { IoIosArrowBack } from "react-icons/io";

// Form Steps
import BottomBar from "../components/CreateEvent/BottomBar";
import TitleStep from "../components/CreateEvent/TitleStep";
import DateStep from "../components/CreateEvent/DateStep";
import ParticipantsStep from "../components/CreateEvent/ParticipantsStep";
import ImageStep from "../components/CreateEvent/ImageStep";

const Form = () => {
  const [formStep, setFormStep] = useState(-2);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    map: false,
    participants: [],
    image: "",
  });
  const navigate = useNavigate();
  const { user, token } = useAuth();
  const [names, setNames] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [invitations, setInvitations] = useState([]);
  const [emailInvitations, setEmailInvitations] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    getUserNames(user.contacts, token, setNames);
  }, []);

  const handleNext = () => {
    setFormStep((step) => step + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setFormStep((step) => step - 1);
    window.scrollTo(0, 0);
  };

  const handleSelectImage = (key, value) => {
    setFormData({ ...formData, [key]: value });
    setSelectedImage(value);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleSubmit = () => {
    createEvent(
      formData,
      user,
      token,
      invitations,
      setInvitations,
      emailInvitations
    );
    setIsExploding(true);
    setTimeout(() => {
      setIsExploding(false);
      navigate("/");
    }, 3000);
  };

  return (
    <>
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

            <motion.div
              className="multi-step-form"
              initial={{ y: 600, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ease: "easeInOut", duration: 0.5 }}
            >
              <TitleStep
                handleChange={handleChange}
                handleNext={handleNext}
                formData={formData}
                formStep={formStep}
              />

              <DateStep
                formStep={formStep}
                handleChange={handleChange}
                handleNext={handleNext}
                handleBack={handleBack}
                formData={formData}
              />

              <ParticipantsStep
                formStep={formStep}
                handleNext={handleNext}
                handleBack={handleBack}
                names={names}
                invitations={invitations}
                setInvitations={setInvitations}
                emailInvitations={emailInvitations}
                setEmailInvitations={setEmailInvitations}
              />

              <ImageStep
                formStep={formStep}
                handleBack={handleBack}
                handleSelectImage={handleSelectImage}
                handleSubmit={handleSubmit}
                isExploding={isExploding}
                selectedImage={selectedImage}
              />

              {/* extra step. DO NOT DELETE */}
              <motion.div
                initial={{ x: 100 * formStep + "%" }}
                animate={{ x: -100 * formStep + "%" }}
                className="form-step extra"
              ></motion.div>
            </motion.div>
          </LocalizationProvider>
        </ThemeProvider>
      </div>
      <BottomBar
        formStep={formStep}
        setFormStep={setFormStep}
        formData={formData}
        isExploding={isExploding}
        handleSubmit={handleSubmit}
      />
    </>
  );
};

export default Form;
