import { useEffect, useState, useCallback } from "react";
import "./EventsLineChart.scss";
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
  clearAllEventErrors,
  fetchEntireEvents,
} from "../../../../redux/actions/event/eventAction";
import { Link, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";
import PageLoader from "../../../../utile/loader/pageLoader/PageLoader";

const EventsLineChart = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);
  const [eventData, setEventData] = useState([]);

  // Fetch all events on mount and clear errors on unmount
  useEffect(() => {
    dispatch(fetchEntireEvents());
    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  // Process the events data to prepare it for the chart
  const processData = useCallback(() => {
    const countsByYear = {};

    // Process events to count the number of events per year
    events?.forEach((event) => {
      const year = new Date(event.eventDate).getFullYear(); // Extract year from eventDate
      countsByYear[year] = (countsByYear[year] || 0) + 1; // Increment count for that year
    });

    // Convert counts into an array suitable for the chart
    return Object.keys(countsByYear)
      .map((year) => ({
        year: parseInt(year, 10),
        size: countsByYear[year],
      }))
      .sort((a, b) => a.year - b.year); // Sort by year
  }, [events]);

  // Update eventData whenever events change
  useEffect(() => {
    if (events && events.length > 0) {
      setEventData(processData());
    }
  }, [events, processData]);

  // Handle navigation to the events page
  const handleViewEvents = () => {
    navigate("/priest/dashboard");
    setActive(4);
  };

  return (
    <section className="event-line-chart-container">
      <h4 className="event-line-chart-title">
        Statistical Analysis of Church Events
      </h4>

      {loading ? (
        <PageLoader
          isLoading={loading}
          message="Loading events data..."
          size={90}
        />
      ) : error ? (
        <Alert severity="error" aria-live="assertive">
          An error occurred: {error}
        </Alert>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={eventData}>
            <XAxis
              dataKey="year"
              scale="point"
              padding={{ left: 10, right: 10 }}
              aria-label="Years"
            />
            <YAxis aria-label="Event Count" />
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
              dataKey="size"
              stroke="#82ca9d"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}

      <aside className="events-line-chart-info">
        <h4 className="event-count">
          Event Services Count:{" "}
          <mark className="mark">{events?.length || 0}</mark>
        </h4>

        <p className="more-information">
          For more information, click on{" "}
          <Link
            to="/priest/dashboard"
            onClick={handleViewEvents}
            className="view-more"
            aria-label="View More Events"
          >
            View More
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default EventsLineChart;
