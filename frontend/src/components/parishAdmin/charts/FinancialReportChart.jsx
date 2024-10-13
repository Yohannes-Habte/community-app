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
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { Alert } from "@mui/material";

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
  const dispatch = useDispatch();
  const { financialReports, loading, error } = useSelector(
    (state) => state.finance
  );

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [formError, setFormError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false); // State for button loading

  useEffect(() => {
    dispatch(fetchAllFinancialReportsForAdmin());

    return () => {
      dispatch(clearFinancialReportErrors());
    };
  }, [dispatch]);

  // Memoized calculation for monthly financial data to optimize rendering
  const row = useMemo(() => {
    if (!financialReports || financialReports.length === 0) return [];

    return financialReports.reduce((acc, report) => {
      if (report.date.startsWith(year)) {
        acc.push({
          name: monthsMap[report?.date.slice(5, 7)] || "Unknown",
          total: report?.total || 0,
        });
      }
      return acc;
    }, []);
  }, [financialReports, year]);

  // Handle form submission for changing the year
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setButtonLoading(true);

    const inputYear = e.target.elements.year.value.trim();
    const currentYear = new Date().getFullYear();

    // Validate input year
    if (
      !inputYear ||
      isNaN(inputYear) ||
      inputYear < 2022 ||
      inputYear > currentYear
    ) {
      setFormError(`Please enter a valid year between 2022 and ${currentYear}`);
      setButtonLoading(false);
      return;
    }

    setYear(inputYear);
    setButtonLoading(false);
  };

  return (
    <section className="chart-wrapper">
      <h3 className="chart-title">
        Monthly Financial Report for the Year {year}
      </h3>

      {/* Year Selection Form */}
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
          min="2022"
          max={new Date().getFullYear()}
          required
        />
        <button
          type="submit"
          className="year-form-btn"
          aria-label="Search financial reports"
          disabled={buttonLoading}
        >
          {buttonLoading ? (
            <ButtonLoader isLoading={buttonLoading} message="" />
          ) : (
            "Search"
          )}{" "}
        </button>
      </form>

      {/* Form Error Handling */}
      {formError && <Alert className="form-error-message">{formError}</Alert>}

      {/* Loading, Error, and Chart Display */}
      {loading && <PageLoader isLoading={loading} message={""} size={80} />}
      {error && (
        <Alert className="error-message" role="alert">
          Error: {error}
        </Alert>
      )}

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
        !loading &&
        !error && (
          <Alert className="no-reports-message">
            No financial reports found for the year {year}
          </Alert>
        )
      )}
    </section>
  );
};

export default FinancialReportChart;
