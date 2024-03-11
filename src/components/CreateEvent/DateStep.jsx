import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Box, Button, TextField } from "@mui/material";
import { buttonStyle } from "../../styles/MUI";
import "../../styles/create-event.css";
import { renderTimeViewClock } from "@mui/x-date-pickers/timeViewRenderers";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import Switch from "@mui/material/Switch";
import { InputLabel } from "@mui/material";

//Google Maps
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const DateStep = ({
  formStep,
  handleChange,
  handleNext,
  handleBack,
  formData,
}) => {
  const [markerPosition, setMarkerPosition] = useState(null);

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const center = { lat: 52.51155997777151, lng: 13.412678498930454 }; // BERLIN

  const onMapClick = (event) => {
    if (formData.map === false) return;
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    handleChange("position", {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
    console.log(markerPosition);
  };

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
        disablePast
        required
      />

      <TimePicker
        label="Time"
        required
        format="HH:mm"
        onChange={(newValue) => handleChange("time", newValue)}
        viewRenderers={{
          hours: renderTimeViewClock,
          minutes: renderTimeViewClock,
          seconds: renderTimeViewClock,
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Location"
          variant="outlined"
          required
          onChange={(e) => handleChange("location", e.target.value)}
          sx={{ flex: 1 }}
        />
        <InputLabel>
          Map
          <Switch
            onChange={(e) => handleChange("map", e.target.checked)}
            sx={{
              // thumb color when not checked
              "& .MuiSwitch-thumb": {
                backgroundColor: "darkgray",
              },
              // thumb color when checked
              "& .Mui-checked .MuiSwitch-thumb": {
                backgroundColor: "var(--headingBG-color)",
              },
              // track color when not checked
              "& .MuiSwitch-track": {
                backgroundColor: "lightgray",
              },
              // track color when checked
              "& .Mui-checked + .MuiSwitch-track": {
                backgroundColor: "#000",
              },
            }}
          />
        </InputLabel>
      </Box>
      {isLoaded && (
        <div className="map">
          <GoogleMap
            mapContainerClassName="map-container"
            center={formData.map ? markerPosition : center}
            zoom={10}
            options={{
              disableDefaultUI: true,
              zoomControl: true,
              gestureHandling: formData.map === false ? "none" : "greedy",
              styles:
                formData.map === false
                  ? [
                      {
                        featureType: "all",
                        stylers: [{ saturation: -100 }],
                      },
                    ]
                  : null,
            }}
            onClick={onMapClick}
          >
            {markerPosition && formData.map && (
              <Marker position={markerPosition} />
            )}
          </GoogleMap>
        </div>
      )}
    </motion.div>
  );
};

export default DateStep;


