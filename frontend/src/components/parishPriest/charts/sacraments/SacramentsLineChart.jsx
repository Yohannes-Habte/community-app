import { useEffect, useState, useCallback } from "react";
import "./SacramentsLineChart.scss";
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

const SacramentsLineChart = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const [sacramentData, setSacramentData] = useState([]);

  // Fetch all services when the component mounts
  useEffect(() => {
    dispatch(fetchAllServices());

    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Function to process the services data and count the number of sacraments for each year
  const processData = useCallback(() => {
    const countsByYear = {};

    // Loop through services and count sacrament services per year
    services?.forEach((service) => {
      const serviceYear = new Date(service.serviceDate).getFullYear();
      if (service.serviceCategory.category === "Sacraments") {
        // Increment the count for the corresponding year
        countsByYear[serviceYear] = (countsByYear[serviceYear] || 0) + 1;
      }
    });

    // Convert the countsByYear object into an array suitable for the line chart
    const sacramentCounts = Object.keys(countsByYear).map((year) => ({
      year: parseInt(year, 10), // Ensure the year is a number
      "Sacrament Size": countsByYear[year],
    }));

    // Sort by year to ensure proper ordering
    return sacramentCounts.sort((a, b) => a.year - b.year);
  }, [services]);

  useEffect(() => {
    if (services) {
      setSacramentData(processData());
    }
  }, [services, processData]);

  // =======================================================================================
  // Handle navigation to view services
  // =======================================================================================
  const handleViewServices = () => {
    navigate("/priest/dashboard");
    setActive(3);
  };

  return (
    <section className="sacraments-line-chart-container">
      <h4 className="sacraments-line-chart-title">
        Statistical Insights on Sacrament Services
      </h4>

      {loading ? (
        <PageLoader
          isLoading={loading}
          message="Loading sacrament data..."
          size={90}
        />
      ) : error ? (
        <Alert severity="error" aria-live="assertive">
          An error occurred: {error}
        </Alert>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={sacramentData}>
            <XAxis
              dataKey="year"
              scale="point"
              padding={{ left: 10, right: 10 }}
              aria-label="Years"
            />
            <YAxis aria-label="Sacrament Count" />
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
              dataKey="Sacrament Size"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <aside className="sacrament-info-text">
        <h4 className="sacrament-count">
          Total Sacrament Services Count:{" "}
          <mark className="mark">
            {services &&
              services.length > 0 &&
              services.filter(
                (service) => service.serviceCategory.category === "Sacraments"
              ).length}
          </mark>
        </h4>

        <p className="more-information">
          For more information, click on{" "}
          <Link
            onClick={handleViewServices}
            to={"/priest/dashboard"}
            className="view-more"
            aria-label="View Sacrament Services"
          >
            View More
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default SacramentsLineChart;
