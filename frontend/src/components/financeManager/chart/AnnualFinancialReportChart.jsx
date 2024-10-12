import { useEffect, useState, useMemo } from "react";
import "./AnnualFinancialReportChart.scss";
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
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader"; // Import ButtonLoader
import {
  clearFinancialReportErrors,
  fetchAllFinancialReports,
} from "../../../redux/actions/finance/financeAction";

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

const AnnualFinancialReportChart = () => {
  // Global state variables from Redux
  const { financialReports, loading, error } = useSelector(
    (state) => state.finance
  );
  const dispatch = useDispatch();

  // Local state for the selected year and button loading state
  const [year, setYear] = useState("2022");
  const [buttonLoading, setButtonLoading] = useState(false); // State for button loading

  // Fetch financial reports on component mount
  useEffect(() => {
    dispatch(fetchAllFinancialReports());

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputYear = e.target.elements.year.value.trim();

    // Validate the input year
    const currentYear = new Date().getFullYear();
    if (!inputYear || inputYear < 2022 || inputYear > currentYear) {
      alert(`Please enter a valid year between 2022 and ${currentYear}`);
      return;
    }

    setButtonLoading(true); // Set button loading state

    setYear(inputYear);

    // Simulate data fetch (or perform real fetch)
    await dispatch(fetchAllFinancialReports()); // Fetch the reports after year change
    setButtonLoading(false); // Reset button loading state after data is fetched
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
        <button
          className="year-form-btn"
          aria-label="Search financial reports"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <ButtonLoader isLoading={buttonLoading} message="" size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Show PageLoader when the entire page is loading */}
      {loading && <PageLoader isLoading={loading} message="" />}
      {error && <p className="error-message">Error: {error}</p>}

      {/* Render the chart only if there are no errors and the data is available */}
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
        !loading && (
          <h3 className="no-reports-message">
            No financial reports found for the year {year}
          </h3>
        )
      )}
    </section>
  );
};

export default AnnualFinancialReportChart;
