import "./ServicesRequest.scss";

import AddServiceRequest from "../../forms/newServiceRequest/AddServiceRequest";

const ServicesRequest = () => {
  return (
    <section className="user-service-request-container">
      <h1 className="user-service-request-title">What are you looking for? </h1>

      <p className="service-paragraph">
        Jesus asked the women “What are you looking for?” In this spirit, Holy
        Saviour will serve parishioners in all sacramental services, in prayer
        on special occasions and in spiritual development. If you would like to
        use at least one of these services, please complete the form below.
      </p>

      <AddServiceRequest />
    </section>
  );
};

export default ServicesRequest;
