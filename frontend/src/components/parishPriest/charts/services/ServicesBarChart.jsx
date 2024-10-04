import { useEffect, useState } from "react";
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
  // Global state variables
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  // Local state variable
  const [year, setYear] = useState(new Date().getFullYear().toString());

  useEffect(() => {
    dispatch(fetchAllServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // =======================================================================================
  // Process data for the selected year
  // =======================================================================================
  const processData = () => {
    // Initialize an object to count the services per month and category
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

    // Loop through services and count based on category and month
    services &&
      services.forEach((service) => {
        const serviceYear = service.serviceDate.split("-")[0];
        const serviceMonth = service.serviceDate.split("-")[1];
        const monthName = monthsMap[serviceMonth];

        if (serviceYear === year && monthName) {
          if (service.serviceCategory.category === "Spiritual development") {
            counts[monthName]["Spiritual Development"] += 1;
          } else if (service.serviceCategory.category === "Sacraments") {
            counts[monthName].Sacrament += 1;
          } else if (service.serviceCategory.category === "Soul prayer") {
            counts[monthName]["Soul Prayer"] += 1;
          }
        }
      });

    // Convert the counts object into an array for the BarChart
    return Object.keys(counts).map((month) => ({
      month,
      "Spiritual Development": counts[month]["Spiritual Development"],
      Sacrament: counts[month].Sacrament,
      "Soul Prayer": counts[month]["Soul Prayer"],
    }));
  };

  const data = processData();

  // =======================================================================================
  // Handle submit for the all charts
  // =======================================================================================
  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(e.target.elements.year.value);
  };

  // =======================================================================================
  // Handle view services
  // =======================================================================================

  const handleViewServices = () => {
    navigate("/priest/dashboard");
    setActive(3);
  };

  return (
    <section className="services-bar-chart-container">
      <h4 className="service-chart-title">
        Assessment of Parish Services: Year {year}
      </h4>
      <form action="" onSubmit={handleSubmit} className="service-chart-form">
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year only"
          className="input-field"
        />
        <button className="service-form-btn">Search</button>
      </form>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} barSize={15}>
          <XAxis
            dataKey="month"
            scale="point"
            padding={{ left: 10, right: 10 }}
          />
          <YAxis />
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

      <aside className="services-chart-info-text">
        <h4 className="services-count">
          Comprehensive Count of Parish Services:{" "}
          <mark> {services.length} </mark>
        </h4>
        <p className="details">
          For more details, click on{" "}
          <Link
            className="view-services"
            to={"/priest/dashboard"}
            onClick={handleViewServices}
          >
            {" "}
            View Services
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default ServicesBarChart;
