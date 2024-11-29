import { useSelector } from "react-redux";
import "./CommitteeCard.scss";
import { Link } from "react-router-dom";

const CommitteeCard = ({ data }) => {
  const { currentUser } = useSelector((state) => state.member);

  return (
    <section className="committee-card-container">
      <figure className="image-container">
        <img className="image" src={data.image} alt={data.fullName} />
      </figure>
      <aside className="user-details">
        <h4 className="user-info">
          Full Name:{" "}
          <strong className="strong-element">{data.fullName} </strong>
        </h4>
        <p className="user-info">
          Service Title:{" "}
          <strong className="strong-element">{data.title}</strong>{" "}
        </p>
        <p className="user-info">
          Email Address:{" "}
          <strong className="strong-element">{data.email}</strong>{" "}
        </p>
        <p className="user-info">
          Phone Number:{" "}
          <strong className="strong-element">{data.phone} </strong>
        </p>
        <p className="user-info">
          Service Time:{" "}
          <strong className="strong-element">
            January {data.startingTime.slice(0, 4)} to December{" "}
            {data.endingTime.slice(0, 4)}{" "}
          </strong>
        </p>

        <div className="update-committee-member-btn-wrapper">
          {currentUser?.role === "admin" && (
            <Link
              to={`/committees/${data._id}`}
              className="update-committee-member-btn"
            >
              Update{" "}
            </Link>
          )}
        </div>
      </aside>
    </section>
  );
};

export default CommitteeCard;
