import { useEffect, useState, useCallback } from "react";
import "./ServicesBarChart.scss";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllErrors,
  fetchAllServices,
} from "../../../../redux/actions/service/serviceAction";
import { Link, useNavigate } from "react-router-dom";
import PageLoader from "../../../../utile/loader/pageLoader/PageLoader";
import { Alert } from "@mui/material";

const monthsMap = {
  "01": "Jan",
  "02": "Feb",
  "03": "Mar",
  "04": "Apr",
  "05": "May",
  "06": "Jun",
  "07": "Jul",
  "08": "Aug",
  "09": "Sep",
  10: "Oct",
  11: "Nov",
  12: "Dec",
};

const ServicesBarChart = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [formError, setFormError] = useState("");

  // Fetch all services on component mount
  useEffect(() => {
    dispatch(fetchAllServices());

    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Helper function to process data
  const processData = useCallback(() => {
    const counts = {
      Jan: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Feb: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Mar: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Apr: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      May: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Jun: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Jul: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Aug: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Sep: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Oct: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Nov: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
      Dec: { "Spiritual Development": 0, Sacrament: 0, "Soul Prayer": 0 },
    };

    services &&
      services.forEach((service) => {
        const [serviceYear, serviceMonth] = service.serviceDate.split("-");
        const monthName = monthsMap[serviceMonth];

        if (serviceYear === year && monthName) {
          const category = service.serviceCategory.category;
          if (category === "Spiritual development") {
            counts[monthName]["Spiritual Development"] += 1;
          } else if (category === "Sacraments") {
            counts[monthName].Sacrament += 1;
          } else if (category === "Soul prayer") {
            counts[monthName]["Soul Prayer"] += 1;
          }
        }
      });

    return Object.keys(counts).map((month) => ({
      month,
      "Spiritual Development": counts[month]["Spiritual Development"],
      Sacrament: counts[month].Sacrament,
      "Soul Prayer": counts[month]["Soul Prayer"],
    }));
  }, [services, year]);

  const data = processData();

  // Handle year form submission with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputYear = e.target.elements.year.value;
    const selectedYear = new Date().getFullYear() + 1;

    if (!inputYear || inputYear < 2022 || inputYear > selectedYear) {
      setFormError(`Enter a valid year between 2022 and ${selectedYear}.`);
      return;
    }

    setYear(inputYear);
    setFormError("");
  };

  const handleViewServices = () => {
    navigate("/priest/dashboard");
    setActive(3);
  };

  return (
    <section className="services-bar-chart-container">
      <h4 className="service-chart-title">
        ERCCH Services Assessment - {year}
      </h4>

      <form
        onSubmit={handleSubmit}
        className="service-chart-form"
        aria-label="Service Year Form"
      >
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year"
          className="input-field"
          aria-label="Year Input"
        />
        <button className="service-form-btn" aria-label="Submit Year Search">
          Search
        </button>
      </form>

      {formError && (
        <Alert severity="warning" aria-live="assertive">
          {formError}
        </Alert>
      )}

      {loading ? (
        <PageLoader isLoading={loading} message="Loading data..." size={90} />
      ) : error ? (
        <Alert severity="error" aria-live="assertive">
          An error occurred: {error}
        </Alert>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} barSize={15}>
            <XAxis
              dataKey="month"
              scale="point"
              padding={{ left: 10, right: 10 }}
              aria-label="Months"
            />
            <YAxis aria-label="Service Count" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffefd5",
                borderRadius: "5px",
                color: "dark",
              }}
              labelStyle={{ display: "none" }}
              cursor={{ fill: "none" }}
            />

            <Bar dataKey="Spiritual Development" fill="#8884d8" />
            <Bar dataKey="Sacrament" fill="#82ca9d" />
            <Bar dataKey="Soul Prayer" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      )}

      <aside className="services-chart-info-text">
        <h4 className="services-count">
          Comprehensive Count of Parish Services:{" "}
          <mark>{services.length || 0}</mark>
        </h4>
        <p className="details">
          For more details, click on{" "}
          <Link
            className="view-services"
            to={"/priest/dashboard"}
            onClick={handleViewServices}
            aria-label="View Services"
          >
            View Services
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default ServicesBarChart;
