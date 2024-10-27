import { useNavigate } from "react-router-dom";
import "./ServicesInfos.scss";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useMemo } from "react";
import {
  allServices,
  clearAllErrors,
} from "../../../redux/actions/service/serviceAction";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { Alert } from "@mui/material";

const ServicesInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    services = [],
    loading,
    error,
  } = useSelector((state) => state.service); // Provide a default empty array for services.

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [buttonLoading, setButtonLoading] = useState(false);
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    dispatch(allServices());
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Categorize services by year and category
  const categorizeServicesByYear = (category) => {
    return services.filter((service) => {
      const serviceYear = new Date(service?.serviceDate)?.getFullYear();
      return (
        service.serviceCategory?.category === category &&
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
    return category.filter((service) => service?.serviceStatus === status)
      .length;
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { color: "green", fontWeight: "bold" };
      case "cancelled":
        return { color: "red", fontWeight: "bold" };
      case "pending":
        return { color: "orange", fontWeight: "bold" };
      default:
        return { fontWeight: "bold" };
    }
  };

  const handleViewServices = () => {
    navigate(`/admin/dashboard/`);
    setIsActive(9);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    setInputError(""); // Reset the error message

    const selectedYear = e.target.elements.year.value;
    const currentYear = new Date().getFullYear() + 1;

    if (
      isNaN(selectedYear) ||
      selectedYear < 2022 ||
      selectedYear > currentYear
    ) {
      setInputError(
        `Please enter a valid year between 2022 and ${currentYear}`
      );
      setButtonLoading(false);
    } else {
      setYear(selectedYear);
      setButtonLoading(false);
    }
  };

  const renderServiceCategory = (title, category) => (
    <article className="service-article">
      <h4 className="service-title">{title}</h4>
      <p className="service-status">
        <strong>Completed:</strong>
        <span style={getStatusStyle("completed")}>
          {countServicesByStatus(category, "completed")}
        </span>
      </p>
      <p className="service-status">
        <strong>Pending:</strong>
        <span style={getStatusStyle("pending")}>
          {countServicesByStatus(category, "pending")}
        </span>
      </p>
      <p className="service-status">
        <strong>Cancelled:</strong>
        <span style={getStatusStyle("cancelled")}>
          {countServicesByStatus(category, "cancelled")}
        </span>
      </p>
      <p className="service-status total">
        <strong>Total:</strong> <span>{category.length}</span>
      </p>
      <p className="more-infos">
        For more information, click on{" "}
        <button onClick={() => handleViewServices()} className="view">
          View
        </button>
      </p>
    </article>
  );

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
          placeholder="Enter Year"
          className="input-field"
          aria-label="Enter year for services"
          min="2022"
          max={new Date().getFullYear() + 1}
        />
        <button className="year-form-btn" disabled={buttonLoading}>
          {buttonLoading ? (
            <ButtonLoader isLoading={buttonLoading} message="" size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {inputError && (
        <Alert severity="error" className="error-message">
          {inputError}
        </Alert>
      )}

      <h4 className="total-year-services">
        Total Services for {year}: {totalServices}
      </h4>

      {loading && <PageLoader isLoading={loading} message="" size={80} />}
      {error && (
        <Alert severity="error" className="error-message">
          An error occurred: {error}
        </Alert>
      )}
      {!loading && !error && services.length === 0 && (
        <Alert security="info">No services available for the year {year}</Alert>
      )}

      {!loading && !error && services.length > 0 && (
        <div className="services-infos-wrapper">
          {renderServiceCategory("Sacramental Services", sacraments)}
          {renderServiceCategory(
            "Spiritual Development Services",
            spiritualDevelopment
          )}
          {renderServiceCategory("Soul Prayers Services", soulPrayers)}
        </div>
      )}
    </section>
  );
};

export default ServicesInfos;
