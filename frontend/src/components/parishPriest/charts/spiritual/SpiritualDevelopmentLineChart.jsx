import "./SpiritualDevelopmentLineChart.scss";
import { useEffect, useState, useCallback } from "react";
import {
  LineChart,
  Line,
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
import { Alert } from "@mui/material";
import PageLoader from "../../../../utile/loader/pageLoader/PageLoader";

const SpiritualDevelopmentLineChart = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const [spiritualDevelopmentData, setSpiritualDevelopmentData] = useState([]);

  // Fetch services and clear errors when component is unmounted
  useEffect(() => {
    dispatch(fetchAllServices());

    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Memoized function to process the services data and count spiritual development services by year
  const processData = useCallback(() => {
    const countsByYear = {};

    // Loop through services and count spiritual development services per year
    services?.forEach((service) => {
      const serviceYear = new Date(service.serviceDate).getFullYear();
      if (service.serviceCategory.category === "Spiritual development") {
        countsByYear[serviceYear] = (countsByYear[serviceYear] || 0) + 1;
      }
    });

    // Convert countsByYear object into an array suitable for the line chart
    const spiritualDevelopmentCounts = Object.keys(countsByYear).map(
      (year) => ({
        year: parseInt(year, 10), // Ensure the year is a number
        "Spiritual Development": countsByYear[year],
      })
    );

    // Sort by year to ensure proper ordering
    return spiritualDevelopmentCounts.sort((a, b) => a.year - b.year);
  }, [services]);

  // Update spiritualDevelopmentData whenever services are updated
  useEffect(() => {
    if (services) {
      setSpiritualDevelopmentData(processData());
    }
  }, [services, processData]);

  // Handle navigation to the services page
  const handleViewServices = () => {
    navigate("/priest/dashboard");
    setActive(3);
  };

  return (
    <section className="spiritual-development-line-chart-container">
      <h4 className="spiritual-development-line-chart-title">
        Comprehensive Review of Spiritual Development Services
      </h4>

      {loading ? (
        <PageLoader isLoading={loading} message="Loading..." size={90} />
      ) : error ? (
        <Alert severity="error" aria-live="assertive">
          An error occurred: {error}
        </Alert>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={spiritualDevelopmentData}>
            <XAxis
              dataKey="year"
              scale="point"
              padding={{ left: 10, right: 10 }}
              aria-label="Years"
            />
            <YAxis aria-label="Spiritual Development Count" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #ccc",
                borderRadius: "5px",
              }}
              labelStyle={{ fontWeight: "bold" }}
              cursor={{ stroke: "#ccc", strokeDasharray: "5 5" }}
            />
            <Line
              type="monotone"
              dataKey="Spiritual Development"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <aside className="spiritual-development-line-chart-info">
        <h4 className="spiritual-development-count">
          Total Spiritual Development Services Count:{" "}
          <mark className="mark">
            {services &&
              services.length > 0 &&
              services.filter(
                (service) =>
                  service.serviceCategory.category === "Spiritual development"
              ).length}
          </mark>
        </h4>

        <p className="more-information">
          For more information, click on{" "}
          <Link
            to={"/priest/dashboard"}
            onClick={handleViewServices}
            className="view-more"
            aria-label="View Spiritual Development Services"
          >
            View More
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default SpiritualDevelopmentLineChart;
