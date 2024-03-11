import { Button } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import ConfettiExplosion from "react-confetti-explosion";
import CircularProgress from "@mui/material/CircularProgress";
import { motion } from "framer-motion";

const BottomBar = ({
  formStep,
  setFormStep,
  formData,
  isExploding,
  handleSubmit,
}) => {
  const backButtonDisabled = () => {
    return formStep === -2;
  };

  const nextButtonDisabled = () => {
    if (formStep === -2 && !formData.title) return true;
    if (
      formStep === -1 &&
      (!formData.date ||
        !formData.time ||
        !formData.location ||
        formData.time?.invalid?.reason === "unparsable")
    )
      return true;
  };

  const createEventDisabled = () => {
    if (formStep === 1 && !formData.image) return true;
  };

  const handleNext = () => {
    if (formStep < 1) {
      setFormStep(formStep + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (formStep > -2) {
      setFormStep(formStep - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  return (
    <motion.div
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      className="bottom-bar"
    >
      <Button
        disabled={backButtonDisabled()}
        type="button"
        onClick={handlePrev}
        sx={buttonStyle}
      >
        Back
      </Button>
      {formStep < 1 && (
        <Button
          disabled={nextButtonDisabled()}
          type="button"
          onClick={handleNext}
          sx={buttonStyle}
        >
          Next
        </Button>
      )}
      {formStep === 1 && (
        <Button
          className="create-event-btn"
          type="submit"
          onClick={handleSubmit}
          disabled={isExploding || createEventDisabled()}
          sx={{
            animation:
              isExploding || createEventDisabled() ? "none" : "pulse 2s infinite",
          }}
        >
          {isExploding ? "Creating event..." : "Create Event"}
          {isExploding && (
            <CircularProgress
              size={24}
              sx={{
                color: "var(--primary-color)",
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-12px",
                marginLeft: "-12px",
              }}
            />
          )}
        </Button>
      )}
      <div className="explosion">{isExploding && <ConfettiExplosion />}</div>
    </motion.div>
  );
};

export default BottomBar;
