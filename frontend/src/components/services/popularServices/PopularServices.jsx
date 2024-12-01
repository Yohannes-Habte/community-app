import { useEffect, useState } from "react";
import "./PopularServices.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utile/security/secreteKey";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";

const PopularServices = ({ setIsActive }) => {
  const navigate = useNavigate();
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

  // Navigate to service request page
  const navigateToServiceRequest = () => {
    navigate("/user/profile");
    setIsActive(5);
  };

  return (
    <section className="popular-services-wrapper">
      <h1 className="popular-services-title">Popular Services</h1>
      {loading ? (
        <PageLoader isLoading={""} message="" size={80} />
      ) : error ? (
        <Alert security="error" className="error-message">
          {error}
        </Alert>
      ) : services.length === 0 ? (
        <Alert security="info">
          New popular services are coming soon. Stay tuned for updates!
        </Alert>
      ) : (
        <div className="services-list">
          {services.map((service, index) => (
            <article key={index} className="service-details">
              <h3 className="service-title">
                Service Name:{" "}
                <small
                  onClick={navigateToServiceRequest}
                  className="small-element service-name"
                >
                  {service?.serviceName}
                </small>
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
