const Location = ({location}) => {
  return (
    <section className="location">
      <h2 className="event-heading">Location</h2>
      <div className="text">
        <p>{location.description}</p>
      </div>
    </section>
  );
};

export default Location;
