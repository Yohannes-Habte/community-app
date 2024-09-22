import "./ServicesRequest.scss";

import AddServiceRequest from "../../forms/newServiceRequest/AddServiceRequest";

const ServicesRequest = () => {
  return (
    <section className="user-service-request-container">
      <h1 className="user-service-request-title">What are you looking for? </h1>

      <p className="service-paragraph">
        As Jesus asked the woman, “What are you looking for?” we at Holy Saviour
        strive to serve our parishioners through a range of sacramental
        services, prayer during special occasions, and opportunities for
        spiritual growth. If you would like to participate in any of these
        offerings, please complete the form below.
      </p>

      <AddServiceRequest />
    </section>
  );
};

export default ServicesRequest;
