import Profile from "../assets/decorations/traveler.jpg";
import { useState } from "react";
import Participants from "./Participants";
import Tooltip from "@mui/material/Tooltip";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Zoom from "@mui/material/Zoom";

const Participantslist = ({ setEventData, eventData }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: "1.25rem", // Increase the font size
          },
        },
      },
    },
  });
  return (
    <>
      <section className="participants">
        <div className="flex-container">
          <ThemeProvider theme={theme}>
            <Tooltip
              title={eventData.participants.map((p) => p.name).join(", ")}
              TransitionComponent={Zoom}
              arrow
              sx={{ fontSize: "1.5rem" }}
            >
              <div className="grid-container">
                {eventData.participants
                  .slice(0, 4)
                  .map((participant, index) =>
                    participant.picture != 1 ? (
                      <img src={participant.picture} alt="" key={index} />
                    ) : (
                      <img src={Profile} alt="" key={index} />
                    )
                  )}
                {eventData.participants.length > 4 ? (
                  <div className="profile-img">
                    +{eventData.participants.length - 4}{" "}
                  </div>
                ) : null}
              </div>
            </Tooltip>
          </ThemeProvider>
          <button id="show-participants-btn" onClick={handleOpen}>
            see all participants
          </button>
          <Participants
            open={open}
            setOpen={setOpen}
            setEventData={setEventData}
            eventData={eventData}
          />
        </div>
      </section>
    </>
  );
};

export default Participantslist;
