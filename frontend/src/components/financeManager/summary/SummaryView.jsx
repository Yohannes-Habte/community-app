import { useEffect, useState, useMemo } from "react";
import "./SummaryView.scss";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllMemberErrors,
  fetchAllParishionersForFinancialManager,
} from "../../../redux/actions/user/userAction";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import AnnualFinancialReportChart from "../chart/AnnualFinancialReportChart";

// Custom label to display percentage inside the slices
const renderCustomLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * (Math.PI / 180));
  const y = cy + radius * Math.sin(-midAngle * (Math.PI / 180));

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

// Custom legend component
const CustomLegend = ({ payload }) => (
  <ul style={{ listStyleType: "none", padding: 0 }}>
    {payload.map((entry, index) => (
      <li
        key={`item-${index}`}
        style={{ marginBottom: "1rem", display: "flex", alignItems: "center" }}
      >
        <span
          style={{
            backgroundColor: entry.color,
            width: "1rem",
            height: "1rem",
            borderRadius: "50%",
            marginRight: "0.7rem",
          }}
          aria-label={entry.value}
        />
        {entry.value}
      </li>
    ))}
  </ul>
);

const SummaryView = () => {
  const dispatch = useDispatch();
  const { parishioners, error, loading } = useSelector((state) => state.member);

  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllParishionersForFinancialManager());
    return () => {
      dispatch(clearAllMemberErrors());
    };
  }, [dispatch]);

  // Calculate membership fee counts for the selected year (Memoized)
  const data = useMemo(() => {
    if (!parishioners) return [];
    const counts = {
      unpaid: 0,
      paid1to3: 0,
      paid4to6: 0,
      paid7to9: 0,
      paid10to12: 0,
      fullyPaid: 0,
    };

    parishioners.forEach((member) => {
      const contributions = member?.monthlyContributions?.filter(
        (contribution) =>
          new Date(contribution?.date).getFullYear().toString() === year
      );

      const count = contributions?.length;

      switch (true) {
        case count === 0:
          counts.unpaid += 1;
          break;
        case count <= 3:
          counts.paid1to3 += 1;
          break;
        case count <= 6:
          counts.paid4to6 += 1;
          break;
        case count <= 9:
          counts.paid7to9 += 1;
          break;
        case count === 12:
          counts.fullyPaid += 1;
          break;
        case count < 12:
          counts.paid10to12 += 1;
          break;
        default:
          break;
      }
    });

    return [
      { name: "Unpaid members", value: counts.unpaid, fill: "#d00000" },
      {
        name: "1-3 months paid members",
        value: counts.paid1to3,
        fill: "#e85d04",
      },
      {
        name: "4-6 months paid members",
        value: counts.paid4to6,
        fill: "#faa307",
      },
      {
        name: "7-9 months paid members",
        value: counts.paid7to9,
        fill: "#9ef01a",
      },
      {
        name: "10-12 months paid members",
        value: counts.paid10to12,
        fill: "#38b000",
      },
      { name: "Fully paid members", value: counts.fullyPaid, fill: "#004b23" },
    ];
  }, [parishioners, year]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputYear = e.target.elements.year.value;

    const currentYear = new Date().getFullYear();
    if (inputYear && inputYear >= 2022 && inputYear <= currentYear) {
      setYear(inputYear);
      setButtonLoading(true);

      await dispatch(fetchAllParishionersForFinancialManager());
      setButtonLoading(false);
    } else {
      alert(`Please enter a valid year between 2022 and ${currentYear}`);
    }
  };

  return (
    <article className="finance-mgt-summary-view">
      <h1 className="finance-mgt-summary-view-title">
        Comprehensive Financial Overview
      </h1>

      <section className="members-contribution-pie-chart-container">
        <h1 className="members-contribution-pie-chart-title">
          {`Parishioners' Monthly Contributions Overview for ${year}`}
        </h1>

        <form
          onSubmit={handleSubmit}
          className="members-contribution-pie-chart-form"
        >
          <input
            type="number"
            name="year"
            defaultValue={year}
            placeholder="Enter Year only"
            className="input-field"
            aria-label="Enter the year"
          />
          <button
            type="submit"
            disabled={buttonLoading}
            className="members-contribution-pie-chart-form-btn"
          >
            {buttonLoading ? (
              <ButtonLoader isLoading={buttonLoading} message="" size={24} />
            ) : (
              "Search"
            )}
          </button>
        </form>

        {loading ? (
          <PageLoader isLoading={loading} message="" size={80} />
        ) : error ? (
          <p className="message-error">Error loading data: {error.message}</p>
        ) : (
          <ResponsiveContainer width="75%" height={500}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={data}
                outerRadius={200}
                labelLine={false}
                label={renderCustomLabel}
              />
              <Tooltip />
              <Legend
                content={<CustomLegend />}
                layout="vertical"
                align="left"
                verticalAlign="middle"
                wrapperStyle={{ className: "legend-wrapper" }}
              />
            </PieChart>
          </ResponsiveContainer>
        )}

        <p className="illustration">
          This pie chart illustrates the distribution of parishioners actively
          registered for the year <strong className="count-mark">{year}</strong>
          , with a total of{" "}
          <strong className="count-mark">{parishioners?.length || 0}</strong>{" "}
          members. The chart visually represents how frequently parishioners
          contributed financially throughout the year, categorized into distinct
          payment tiers. It offers a clear breakdown of those who contributed
          over different periods, providing an easy-to-understand snapshot of
          their financial engagement.
        </p>
      </section>

      <AnnualFinancialReportChart />
    </article>
  );
};

export default SummaryView;
