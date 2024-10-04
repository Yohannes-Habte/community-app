import { useEffect, useState } from "react";
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
  fetchAllEvents,
} from "../../../../redux/actions/event/eventAction";
import { Link, useNavigate } from "react-router-dom";

const EventsLineChart = ({ setActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(fetchAllEvents());

    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    if (events && events.length > 0) {
      const countsByYear = {};

      // Process the events to count the number of events per year
      events.forEach((event) => {
        const year = new Date(event.eventDate).getFullYear(); // Extract the year from eventDate
        countsByYear[year] = (countsByYear[year] || 0) + 1; // Increment the count for that year
      });

      // Convert the counts into an array suitable for the chart
      const processedData = Object.keys(countsByYear)
        .map((year) => ({
          year: parseInt(year, 10), // Convert year to number
          size: countsByYear[year], // Set the event count for that year
        }))
        .sort((a, b) => a.year - b.year); // Sort by year

      setEventData(processedData); // Update the state with the processed data
    }
  }, [events]);

  // =======================================================================================
  // Handle view events
  // =======================================================================================

  const handleViewEvents = () => {
    navigate("/priest/dashboard");
    setActive(4);
  };

  return (
    <section className="event-line-chart-container">
      <h4 className="event-line-chart-title">
        Statistical Analysis of Church Events{" "}
      </h4>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={eventData}>
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
          <Line
            type="monotone"
            dataKey="size"
            stroke="#82ca9d"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>

      <aside className="events-line-chart-info">
        <h4 className="spiritual-development-count">
          Event Services Count: <mark className="mark">{events.length}</mark>
        </h4>

        <p className="more-information">
          For more information, click on
          <Link
            to={"/priest/dashboard"}
            onClick={handleViewEvents}
            className="view-more"
          >
            View More
          </Link>
        </p>
      </aside>
    </section>
  );
};

export default EventsLineChart;
