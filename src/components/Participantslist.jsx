import Profile from "../assets/decorations/traveler.jpg";
import { useState } from "react";
import Participants from "./Participants";

const Participantslist = ({ participants, ownerId }) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <section className="participants">
        <div className="flex-container">
          <div className="grid-container">
            {participants
              .slice(0, 4)
              .map((participant, index) =>
                participant.picture != 1 ? (
                  <img src={participant.picture} alt="" key={index} />
                ) : (
                  <img src={Profile} alt="" key={index} />
                )
              )}
            {participants.length > 4 ? (
              <div className="profile-img">+{participants.length - 4} </div>
            ) : null}
          </div>
          <button id="show-participants-btn" onClick={handleOpen}>see all participants</button>
          <Participants open={open} setOpen={setOpen} participants={participants} ownerId={ownerId}/>
        </div>
      </section>
    </>
  );
};

export default Participantslist;
