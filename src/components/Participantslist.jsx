import Profile from "../assets/decorations/traveler.jpg";
const Participantslist = ({ participants }) => {
    console.log(participants)
  return (
    <>
      <section className="participants">
        <div className="flex-container">
          <div className="grid-container">
            {participants.slice(0, 4).map((participant, index) => (
           
           participant.picture ? 
           <img src={participant.picture} alt="" /> :
           <img src={Profile} alt="" />
           
            ))}
            {participants.length > 4 ? (
              <div className="profile-img">+{participants.length - 4} </div>
            ) : null}
          </div>
          <p><a href="#">see all participants</a></p>
        </div>
      </section>
    </>
  );
};

export default Participantslist;
