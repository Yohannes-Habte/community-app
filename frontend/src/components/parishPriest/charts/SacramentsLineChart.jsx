import { useEffect, useState } from "react";
import "./LineCharts.scss";
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
} from "../../../redux/actions/service/serviceAction";

const SacramentsLineChart = () => {
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);
  const [sacramentData, setSacramentData] = useState([]);

  useEffect(() => {
    dispatch(fetchAllServices());

    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Function to process the services data and count the number of sacraments for each year
  const processData = () => {
    // Create an object to store event counts by year
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
  };

  useEffect(() => {
    if (services) {
      setSacramentData(processData());
    }
  }, [services]);

  return (
    <section className="linechart-container">
      <h4 className="chart-title"> Sacrament Services </h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={sacramentData}>
          <XAxis
            dataKey="year"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "transparent",
              border: "none",
            }}
            labelStyle={{ display: "none" }}
            position={{ x: 10, y: 80 }}
          />

          <Line type="monotone" dataKey="Sacrament Size" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default SacramentsLineChart;
