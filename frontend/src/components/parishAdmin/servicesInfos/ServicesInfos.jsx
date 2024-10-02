import { useNavigate } from "react-router-dom";
import "./ServicesInfos.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  allServices,
  clearAllErrors,
} from "../../../redux/actions/service/serviceAction";

const ServicesInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  // Local state variable for the selected year
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    dispatch(allServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  /// Helper function to categorize services by status and year
  const categorizeServicesByYear = (category) => {
    return services.filter((service) => {
      const serviceYear = new Date(service.serviceDate).getFullYear();
      return (
        service.serviceCategory.category === category &&
        serviceYear === parseInt(year)
      );
    });
  };

  // Services by categories
  const sacraments = categorizeServicesByYear("Sacraments");
  const spiritualDevelopment = categorizeServicesByYear(
    "Spiritual development"
  );
  const soulPrayers = categorizeServicesByYear("Soul prayer");

  // Helper function to count service status
  const countServicesByStatus = (category, status) => {
    return category.filter((service) => service.serviceStatus === status)
      .length;
  };

  // Helper function to style service status with font weight bold
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { color: "green", fontWeight: "bold", marginLeft: "1rem" };
      case "cancelled":
        return { color: "red", fontWeight: "bold", marginLeft: "1rem" };
      case "pending":
        return { color: "orange", fontWeight: "bold", marginLeft: "1rem" };
      default:
        return { fontWeight: "bold" }; // Default bold if status doesn't match
    }
  };

  const handleViewServices = () => {
    navigate("/admin/dashboard");
    setIsActive(10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(e.target.elements.year.value);
  };

  return (
    <section className="services-information-container">
      <h3 className="services-information-title">Church Services for the Year {year}</h3>

      <form action="" onSubmit={handleSubmit} className="services-year-form">
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year only"
          className="input-field"
        />
        <button className="year-form-btn">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {services && services.length === 0 && <p>No services found</p>}

      {!loading && !error && services && services.length !== 0 && (
        <div className="services-infos-wrapper">
          {/* Sacraments Summary */}
          <article className="service-article">
            <h4 className="service-title">Sacramental Services </h4>

            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(sacraments, "completed")}{" "}
              </span>
            </p>
            <p className="service-status">
              <strong> Pending:</strong>
              <span style={getStatusStyle("pending")}>
                {countServicesByStatus(sacraments, "pending")}
              </span>
            </p>
            <p className="service-status">
              <strong>Cancelled:</strong>
              <span style={getStatusStyle("cancelled")}>
                {countServicesByStatus(sacraments, "cancelled")}
              </span>
            </p>

            <p className="service-status">
              <strong>Total: </strong>
              <span>{sacraments.length}</span>
            </p>

            <p className="more-infos">
              For more information click on{" "}
              <button onClick={handleViewServices} className="view">
                View
              </button>{" "}
            </p>
          </article>

          {/* Spiritual Development Summary */}
          <article className="service-article">
            <h4 className="service-title">Spiritual Development Services </h4>

            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(spiritualDevelopment, "completed")}
              </span>
            </p>
            <p className="service-status">
              <strong> Pending:</strong>
              <span style={getStatusStyle("pending")}>
                {countServicesByStatus(spiritualDevelopment, "pending")}
              </span>
            </p>
            <p className="service-status">
              <strong>Cancelled:</strong>
              <span style={getStatusStyle("cancelled")}>
                {countServicesByStatus(spiritualDevelopment, "cancelled")}
              </span>
            </p>

            <p className="service-status">
              <strong>Total: </strong>
              <span>{spiritualDevelopment.length}</span>
            </p>

            <p className="more-infos">
              For more information click on{" "}
              <button onClick={handleViewServices} className="view">
                View
              </button>{" "}
            </p>
          </article>

          {/* Soul Prayers Summary */}
          <article className="service-article">
            <h4 className="service-title">Soul Prayers Services</h4>

            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(soulPrayers, "completed")}
              </span>
            </p>
            <p className="service-status">
              <strong> Pending:</strong>
              <span style={getStatusStyle("pending")}>
                {countServicesByStatus(soulPrayers, "pending")}
              </span>
            </p>
            <p className="service-status">
              <strong>Cancelled:</strong>
              <span style={getStatusStyle("cancelled")}>
                {countServicesByStatus(soulPrayers, "cancelled")}
              </span>
            </p>

            <p className="service-status">
              <strong>Total: </strong>
              <span> {soulPrayers.length}</span>
            </p>
            <p className="more-infos">
              For more information click on{" "}
              <button onClick={handleViewServices} className="view">
                View
              </button>{" "}
            </p>
          </article>
        </div>
      )}
    </section>
  );
};

export default ServicesInfos;
