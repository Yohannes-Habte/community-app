import { useDispatch, useSelector } from "react-redux";
import "./MassCard.scss";
import { Link } from "react-router-dom";
import {
  deleteMass,
  fetchAllMasses,
} from "../../../redux/actions/mass/massAction";

const MassCard = ({ mass }) => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.member);

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

  // Delete Mass
  const handleDeleteMass = async () => {
    if (window.confirm(`Are you sure you want to delete this mass?`)) {
      await dispatch(deleteMass(mass._id));

      dispatch(fetchAllMasses());
    }
  };

  return (
    <section className="mass-card-container">
      <h4 className="mass-card-title">
        {location.name} - Mass Service Information
      </h4>
      <div className="mass-details-wrapper">
        <aside className="detail-box">
          <h4 className="mass-card-subtitle">
            Address:{" "}
            <small className="church-mass-infos-small">
              {location.address}
            </small>
          </h4>
          <p className="mass-card-info">
            Date:{" "}
            <small className="church-mass-infos-small">{formattedDate}</small>{" "}
          </p>
          <p className="mass-card-info">
            Time: <small className="church-mass-infos-small">{time}</small>{" "}
          </p>
          <p className="mass-card-info">
            Day: <small className="church-mass-infos-small">{type}</small>{" "}
          </p>
          <p className="mass-card-info">
            Status:{" "}
            <small className="church-mass-infos-small">{massStatus}</small>{" "}
          </p>
        </aside>

        <aside className="detail-box">
          <h4 className="mass-card-subtitle">Pre-Mass Service Details</h4>
          <p className="mass-card-info">
            Officiant:{" "}
            <small className="church-mass-infos-small">{officiant}</small>
          </p>
          <p className="mass-card-info">
            Participants:{" "}
            <small className="church-mass-infos-small">{participants}</small>
          </p>
          <p className="mass-card-info">
            {" "}
            Confession:{" "}
            <small className="church-mass-infos-small">{confession}</small>
          </p>
          <p className="mass-card-info">
            {" "}
            Pre-Mass Prayer: <small>{preMassPrayer}</small>
          </p>
        </aside>

        <aside className="detail-box">
          <h4 className="mass-card-subtitle">Readings:</h4>
          <p className="mass-card-info">
            First Reading:{" "}
            <small className="church-mass-infos-small">
              {readings.firstReading}
            </small>
          </p>
          <p className="mass-card-info">
            {" "}
            Psalm:{" "}
            <small className="church-mass-infos-small"> {readings.psalm}</small>
          </p>
          <p className="mass-card-info">
            Second Reading:{" "}
            <small className="church-mass-infos-small">
              {readings.secondReading}
            </small>
          </p>
          <p className="mass-card-info">
            {" "}
            Gospel:{" "}
            <small className="church-mass-infos-small">{readings.gospel}</small>
          </p>
        </aside>
      </div>
      <p className="mass-description"> {description}</p>

      {currentUser?.role === "admin" && (
        <div className="mass-action-buttons-wrapper">
          <Link to={`/masses/${mass._id}`} className="update-mass-btn">
            Update{" "}
          </Link>

          <button className="delete-mass-btn" onClick={handleDeleteMass}>
            Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default MassCard;
