import { useEffect, useState } from "react";
import "./PopularServices.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utile/security/secreteKey";

const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    const fetchPopularServices = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API}/services/popular/categories`);
        setServices(response.data.result);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred while fetching data.";
        toast.error(errorMessage);
        setError(errorMessage); // Set error message
      } finally {
        setLoading(false);
      }
    };

    fetchPopularServices();
  }, []);

  return (
    <section className="popular-services-wrapper">
      <h1 className="popular-services-title">Popular Services</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div className="services-list">
          {services.map((service, index) => (
            <article key={index} className="service-details">
              <h3 className="service-title">
                Service Name:{" "}
                <small className="small-element">{service?.serviceName}</small>
              </h3>
              <p className="service-size">
                Total Size:{" "}
                <small className="small-element"> {service?.count} </small>
              </p>

              <p className="service-infos">
                Message:{" "}
                <small className="small-element">
                  {service?.details?.message}
                </small>
              </p>
              <p className="service-status">
                Status:{" "}
                <small className="completed">
                  {service.details?.serviceStatus}
                </small>
              </p>
              <p className="service-date">
                Service Date:{" "}
                <small className="small-element">
                  {new Date(service?.details?.serviceDate).toDateString()}
                </small>
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularServices;
