import  { useEffect, useState } from "react";
import "./Charts.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  getALLFinancialReportFailure,
  getALLFinancialReportStart,
  getALLFinancialReportSuccess,
} from "../../../redux/reducers/financeReducer";
import { API } from "../../../utiles/securitiy/secreteKey";
import axios from "axios";

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

const FinancialReportChart = () => {
  // Global state variables
  const { financialReports } = useSelector((state) => state.finance);
  const dispatch = useDispatch();

  // Local state variable
  const [year, setYear] = useState("2023");

  // Display all financial income and expenses in the table
  useEffect(() => {
    const fetchAllFinancialReportData = async () => {
      try {
        dispatch(getALLFinancialReportStart());
        const { data } = await axios.get(`${API}/reports/financial-reports`);

        dispatch(getALLFinancialReportSuccess(data.reports));
      } catch (error) {
        dispatch(getALLFinancialReportFailure(error.response.data.message));
      }
    };
    fetchAllFinancialReportData();
  }, []);

  const row = [];

  financialReports &&
    financialReports.forEach((report) => {
      if (report.date.startsWith(year)) {
        row.push({
          name: monthsMap[report?.date.slice(5, 7)],
          total: report?.total,
        });
      }
    });

  // Handle submit
  // e.target.value: Directly accesses the value of the element that triggered the event, commonly used in input or change events.
  // e.target.elements.year.value: Accesses the value of a specific named element within a form, used in form submission events to get the value of a particular input field.

  /**
   
  1. e: This represents the event object that is automatically passed to event handlers in React. In the context of a form submission, e is the event object associated with the submit event.

  2. e.target: This refers to the DOM element that triggered the event. In the case of a form submission, e.target is the form element itself.

  3. e.target.elements: This is a collection of all the form controls (input, select, textarea, etc.) within the form. It allows you to access the individual form controls by their name attribute.

  4. e.target.elements.year: This refers to the specific form control (in this case, an input element) with the name attribute set to "year". 

  5. e.target.elements.year.value: This retrieves the current value of the input element with the name "year".

  6. setYear(e.target.elements.year.value): Finally, this calls the setYear function with the value of the input element named "year", updating the state in the React component.
   */
  const handleSubmit = (e) => {
    e.preventDefault();

    setYear(e.target.elements.year.value);
  };

  return (
    <section className="chart-wrapper">
      <h3 className="chart-title">
        Monthly Financial Report chart for the year {year}{" "}
      </h3>
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

      <ResponsiveContainer width="100%" aspect={2 / 1}>
        <AreaChart
          width={730}
          height={250}
          data={row}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" stroke="gray" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" className="chart-Grid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
        </AreaChart>
       
      </ResponsiveContainer>
    </section>
  );
};

export default FinancialReportChart;
