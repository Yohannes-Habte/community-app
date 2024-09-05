import { useEffect, useState } from "react";
import "./Barcharts.scss";
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
} from "../../../redux/actions/service/serviceAction";

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

const ParishionersBarChart = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.service);

  // Local state variable
  const [year, setYear] = useState("2023");

  useEffect(() => {
    dispatch(fetchAllServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // =======================================================================================
  // Row data for the bar chart based on the year selected
  // =======================================================================================

  const row = [];

  services &&
    services.forEach((service) => {
      if (service.serviceDate.startsWith(year)) {
        row.push({
          month: monthsMap[service?.serviceDate.slice(5, 7)],
          total: service?.totalMonthlyServices,
        });
      }
    });

  // =======================================================================================
  // Handle submit for the all charts
  // =======================================================================================
  const handleSubmit = (e) => {
    e.preventDefault();

    setYear(e.target.elements.year.value);
  };

  const data = [
    {
      month: "January",
      baptism: 1,
      marriage: 1,
      prayer: 2,
    },
    {
      month: "February",
      baptism: 3,
      marriage: 0,
      prayer: 1,
    },
    {
      month: "March",
      baptism: 1,
      marriage: 1,
      prayer: 2,
    },
    {
      month: "April",
      baptism: 1,
      marriage: 0,
      prayer: 0,
    },
    {
      month: "June",
      baptism: 1,
      marriage: 0,
      prayer: 0,
    },
    {
      month: "July",
      baptism: 2,
      marriage: 1,
      prayer: 2,
    },

    {
      month: "August",
      baptism: 1,
      marriage: 0,
      prayer: 0,
    },

    {
      month: "September",
      baptism: 0,
      marriage: 1,
      prayer: 1,
    },

    {
      month: "October",
      baptism: 1,
      marriage: 1,
      prayer: 1,
    },

    {
      month: "November",
      baptism: 3,
      marriage: 0,
      prayer: 2,
    },

    {
      month: "December",
      baptism: 2,
      marriage: 0,
      prayer: 1,
    },
  ];

  return (
    <section className="parishioners-barchart-container">
      <h4 className="chart-title"> Parishioners Participation Bar Chart </h4>
      <form action="" onSubmit={handleSubmit} className="year-form">
        <input
          type="number"
          name="year"
          defaultValue={2023}
          placeholder="Enter Year only"
          className="year-input-field"
        />
        <button className="year-form-btn">Search</button>
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

          <Bar dataKey="baptism" fill="#8884d8" />
          <Bar dataKey="marriage" fill="#82ca9d" />
          <Bar dataKey="prayer" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </section>
  );
};

export default ParishionersBarChart;
