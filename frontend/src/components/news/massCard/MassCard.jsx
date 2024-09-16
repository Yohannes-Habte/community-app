import "./MassCard.scss";

const MassCard = ({ mass }) => {
  const {
    readings,
    location,
    date,
    time,
    type,
    officiant,
    participants,
    confession,
    preMassPrayer,
    description,
    massStatus,
  } = mass;

  // Format the date for display
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section className="mass-card-container">
      <h4 className="mass-card-title">
        {location.name} - Mass Service Information
      </h4>
      <div className="mass-details-wrapper">
        <aside className="detail-box">
          <h4 className="mass-card-subtitle">
            Address: <span>{location.address}</span>
          </h4>
          <p className="mass-card-info">
            Date: <span>{formattedDate}</span>{" "}
          </p>
          <p className="mass-card-info">
            Time: <span>{time}</span>{" "}
          </p>
          <p className="mass-card-info">
            Day: <span>{type}</span>{" "}
          </p>
          <p className="mass-card-info">
            Status: <span>{massStatus}</span>{" "}
          </p>
        </aside>

        <aside className="detail-box">
          <h4 className="mass-card-subtitle">Pre-Mass Service Details</h4>
          <p className="mass-card-info">
            Officiant: <span>{officiant}</span>
          </p>
          <p className="mass-card-info">
            Participants: <span>{participants}</span>
          </p>
          <p className="mass-card-info">
            {" "}
            Confession: <span>{confession}</span>
          </p>
          <p className="mass-card-info">
            {" "}
            Pre-Mass Prayer: <span>{preMassPrayer}</span>
          </p>
        </aside>

        <aside className="detail-box">
          <h4 className="mass-card-subtitle">Readings:</h4>
          <p className="mass-card-info">
            First Reading: <span>{readings.firstReading}</span>
          </p>
          <p className="mass-card-info">
            {" "}
            Psalm: <span> {readings.psalm}</span>
          </p>
          <p className="mass-card-info">
            Second Reading: <span>{readings.secondReading}</span>
          </p>
          <p className="mass-card-info">
            {" "}
            Gospel: <span>{readings.gospel}</span>
          </p>
        </aside>
      </div>
      <p className="mass-description"> {description}</p>

    </section>
  );
};

export default MassCard;
