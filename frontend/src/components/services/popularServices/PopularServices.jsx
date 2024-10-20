import { useEffect, useState } from "react";
import "./PopularServices.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utile/security/secreteKey";


const PopularServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  console.log("popular services =", services);

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
        setLoading(false); // Stop loading after data is fetched
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
              <h3 className="service-name">
                Service Name: <strong>{service?.serviceName}</strong>
              </h3>
              <p className="count">
                Count: <span> {service?.count} </span>
              </p>

              <p className="message">
                Message: <span>{service?.details?.message}</span>
              </p>
              <p className="status">
                Status: <span>{service.details?.serviceStatus}</span>
              </p>
              <p className="date">
                Service Date:{" "}
                <span>
                  {new Date(service?.details?.serviceDate).toDateString()}
                </span>
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularServices;
