import "./CommitteeCard.scss";

const CommitteeCard = ({ data }) => {
  return (
    <section className="committee-card-container">
      <figure className="image-container">
        <img className="image" src={data.image} alt={data.fullName} />
      </figure>
      <aside className="user-details">
        <h3 className="user-title"> Full Name: <strong>{data.fullName} </strong></h3>
        <p className="user-info"> Service Title: <strong>{data.title}</strong> </p>
        <p className="user-info"> Email Address: <strong>{data.email}</strong> </p>
        <p className="user-info"> Phone Number: <strong>{data.phone} </strong></p>
        <p className="user-info">
          Service Time: <strong>From January {data.startingTime.slice(0, 4)} to December
          {data.endingTime.slice(0, 4)}{" "}</strong>
        </p>
      </aside>
    </section>
  );
};

export default CommitteeCard;
