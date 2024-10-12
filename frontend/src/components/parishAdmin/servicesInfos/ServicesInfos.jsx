import { useNavigate } from "react-router-dom";
import "./ServicesInfos.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  allServices,
  clearAllErrors,
} from "../../../redux/actions/service/serviceAction";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

const ServicesInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    dispatch(allServices());
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  const categorizeServicesByYear = (category) => {
    return services.filter((service) => {
      const serviceYear = new Date(service.serviceDate).getFullYear();
      return (
        service.serviceCategory.category === category &&
        serviceYear === parseInt(year)
      );
    });
  };

  const sacraments = useMemo(
    () => categorizeServicesByYear("Sacraments"),
    [services, year]
  );
  const spiritualDevelopment = useMemo(
    () => categorizeServicesByYear("Spiritual development"),
    [services, year]
  );
  const soulPrayers = useMemo(
    () => categorizeServicesByYear("Soul prayer"),
    [services, year]
  );

  const countServicesByStatus = (category, status) => {
    return category.filter((service) => service.serviceStatus === status)
      .length;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { color: "green", fontWeight: "bold", marginLeft: "1rem" };
      case "cancelled":
        return { color: "red", fontWeight: "bold", marginLeft: "1rem" };
      case "pending":
        return { color: "orange", fontWeight: "bold", marginLeft: "1rem" };
      default:
        return { fontWeight: "bold" };
    }
  };

  const handleViewServices = (category) => {
    navigate(`/admin/dashboard/${category}`);
    setIsActive(10);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedYear = e.target.elements.year.value;
    const currentYear = new Date().getFullYear();

    if (
      isNaN(selectedYear) ||
      selectedYear < 2022 ||
      selectedYear > currentYear
    ) {
      alert(`Please enter a valid year between 2022 and ${currentYear}`);
    } else {
      setYear(selectedYear);
    }
  };

  const totalServices =
    sacraments.length + spiritualDevelopment.length + soulPrayers.length;

  return (
    <section className="services-information-container">
      <h3 className="services-information-title">
        Church Services for the Year {year}
      </h3>

      <form onSubmit={handleSubmit} className="services-year-form">
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year only"
          className="input-field"
          aria-label="Enter year for services"
        />
        <button className="year-form-btn">Search</button>
      </form>

      <h4>
        Total Services for {year}: {totalServices}
      </h4>

      {loading && <PageLoader isLoading={loading} message={""} size={80} />}
      {error && <p className="error-message">An error occurred: {error}</p>}
      {services.length === 0 && (
        <p>No services available for the year {year}</p>
      )}

      {!loading && !error && services.length !== 0 && (
        <div className="services-infos-wrapper">
          <article className="service-article">
            <h4 className="service-title">Sacramental Services</h4>
            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(sacraments, "completed")}
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
              <strong>Total:</strong> <span>{sacraments.length}</span>
            </p>
            <p className="more-infos">
              For more information click on{" "}
              <button
                onClick={() => handleViewServices("sacraments")}
                className="view"
              >
                View
              </button>
            </p>
          </article>

          <article className="service-article">
            <h4 className="service-title">Spiritual Development Services</h4>
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
              <strong>Total:</strong> <span>{spiritualDevelopment.length}</span>
            </p>
            <p className="more-infos">
              For more information click on{" "}
              <button
                onClick={() => handleViewServices("spiritualDevelopment")}
                className="view"
              >
                View
              </button>
            </p>
          </article>

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
              <strong>Total:</strong> <span>{soulPrayers.length}</span>
            </p>
            <p className="more-infos">
              For more information click on{" "}
              <button
                onClick={() => handleViewServices("soulPrayers")}
                className="view"
              >
                View
              </button>
            </p>
          </article>
        </div>
      )}
    </section>
  );
};

export default ServicesInfos;
