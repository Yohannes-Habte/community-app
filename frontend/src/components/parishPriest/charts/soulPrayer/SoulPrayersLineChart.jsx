import "./SoulPrayersLineChart.scss";
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

const SoulPrayersLineChart = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const [soulPrayersData, setSoulPrayersData] = useState([]);

  // Fetch all services on component mount and clear errors on unmount
  useEffect(() => {
    dispatch(fetchAllServices());

    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Process the services data and count the number of soul prayers for each year
  const processData = useCallback(() => {
    const countsByYear = {};

    // Loop through services and count soul prayer services per year
    services?.forEach((service) => {
      const serviceYear = new Date(service.serviceDate).getFullYear();
      if (service.serviceCategory.category === "Soul prayer") {
        // Increment the count for the corresponding year
        countsByYear[serviceYear] = (countsByYear[serviceYear] || 0) + 1;
      }
    });

    // Convert the countsByYear object into an array suitable for the line chart
    const soulPrayersCounts = Object.keys(countsByYear).map((year) => ({
      year: parseInt(year, 10), // Ensure the year is a number
      "Soul Prayer": countsByYear[year],
    }));

    // Sort by year to ensure proper ordering
    return soulPrayersCounts.sort((a, b) => a.year - b.year);
  }, [services]);

  useEffect(() => {
    if (services) {
      setSoulPrayersData(processData());
    }
  }, [services, processData]);

  // Handle navigation to the services page
  const handleViewServices = () => {
    navigate("/priest/dashboard");
    setActive(3);
  };

  return (
    <section className="soul-prayer-line-chart-container">
      <h4 className="soul-prayer-line-chart-title">
        Statistical Insights on Soul Prayer Services
      </h4>

      {loading ? (
        <PageLoader isLoading={loading} message="" size={90} />
      ) : error ? (
        <Alert severity="error" aria-live="assertive">
          An error occurred: {error}
        </Alert>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={soulPrayersData}>
            <XAxis
              dataKey="year"
              scale="point"
              padding={{ left: 10, right: 10 }}
              aria-label="Years"
            />
            <YAxis aria-label="Soul Prayer Count" />
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
              dataKey="Soul Prayer"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <aside className="soul-prayer-line-chart-info">
        <h4 className="soul-prayer-count">
          Total Soul Prayer Services Count:{" "}
          <mark className="mark">
            {services &&
              services.length > 0 &&
              services.filter(
                (service) => service.serviceCategory.category === "Soul prayer"
              ).length}
          </mark>
        </h4>

        <p className="more-information">
          For more information, click on{" "}
          <Link
            to={"/priest/dashboard"}
            onClick={handleViewServices}
            className="view-more"
            aria-label="View Soul Prayer Services"
          >
            View More
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default SoulPrayersLineChart;
