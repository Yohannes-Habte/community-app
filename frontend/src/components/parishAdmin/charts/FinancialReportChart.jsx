import { useEffect, useState, useMemo } from "react";
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
  clearFinancialReportErrors,
  fetchAllFinancialReportsForAdmin,
} from "../../../redux/actions/finance/financeAction";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

// Map for months (for cleaner readability)
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
  // Global state variables from Redux
  const { financialReports, loading, error } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  // Local state for the selected year
  const [year, setYear] = useState("2022");

  // Fetch financial reports on component mount
  useEffect(() => {
    dispatch(fetchAllFinancialReportsForAdmin());

    // Clear errors when the component unmounts
    return () => {
      dispatch(clearFinancialReportErrors());
    };
  }, [dispatch]);

  // Memoized calculation for monthly financial data to optimize rendering
  const row = useMemo(() => {
    return financialReports.reduce((acc, report) => {
      if (report.date.startsWith(year)) {
        acc.push({
          name: monthsMap[report?.date.slice(5, 7)], // Extract month
          total: report?.total, // Total amount
        });
      }
      return acc;
    }, []);
  }, [financialReports, year]);

  // Handle form submission for changing the year
  const handleSubmit = (e) => {
    e.preventDefault();
    const inputYear = e.target.elements.year.value.trim();

    // Validate the input year
    const currentYear = new Date().getFullYear();
    if (!inputYear || inputYear < 2022 || inputYear > currentYear) {
      alert(`Please enter a valid year between 2022 and ${currentYear}`);
      return;
    }

    setYear(inputYear);
  };

  return (
    <section className="chart-wrapper">
      <h3 className="chart-title">
        Monthly Financial Report for the Year {year}
      </h3>

      <form
        aria-label="Financial year selection"
        onSubmit={handleSubmit}
        className="financial-year-form"
      >
        <label htmlFor="year" className="year-input-label">
          Select Year:
        </label>
        <input
          type="number"
          id="year"
          name="year"
          defaultValue={year}
          placeholder="Enter Year"
          className="input-field"
          aria-label="Year input field"
        />
        <button className="year-form-btn" aria-label="Search financial reports">
          Search
        </button>
      </form>

      {loading && (
        <PageLoader
          isLoading={loading}
          message={"Loading reports..."}
          size={80}
        />
      )}
      {error && <p className="error-message">Error: {error}</p>}

      {!loading && !error && row.length > 0 ? (
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
      ) : (
        <h3 className="no-reports-message">
          No financial reports found for the year {year}
        </h3>
      )}
    </section>
  );
};

export default FinancialReportChart;
