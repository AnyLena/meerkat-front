import Profile from "../assets/profile.png";
const Participantslist = ({ participants }) => {
  return (
    <>
      <section className="participants">
        <div className="flex-container">
          <div className="grid-container">
            {participants.slice(0, 4).map((participant, index) => (
              <div className="profile-img">
                <img src={Profile} alt="" />
              </div>
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
