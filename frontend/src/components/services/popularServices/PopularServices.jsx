import { useEffect, useState } from "react";
import "./PopularServices.scss";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";

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
                Count: <strong> {service?.count} </strong>
              </p>

              <p className="message">
                Message: <strong>{service?.details?.message}</strong>
              </p>
              <p className="status">
                Status: <strong>{service.details?.serviceStatus}</strong>
              </p>
              <p className="date">
                Service Date:{" "}
                <strong>
                  {new Date(service?.details?.serviceDate).toDateString()}
                </strong>
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PopularServices;
