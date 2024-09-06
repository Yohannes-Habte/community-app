import { useEffect, useState } from 'react';
import "./LineCharts.scss";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useDispatch, useSelector } from 'react-redux';
import { clearAllErrors, fetchAllEvents } from '../../../redux/actions/event/eventAction';

const EventsLineChart = () => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event); 
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    dispatch(fetchAllEvents()); 

    return () => {
      dispatch(clearAllErrors()); 
    };
  }, [dispatch]);

  useEffect(() => {
    if (events && events.length > 0) {
      const countsByYear = {};

      // Process the events to count the number of events per year
      events.forEach(event => {
        const year = new Date(event.eventDate).getFullYear(); // Extract the year from eventDate
        countsByYear[year] = (countsByYear[year] || 0) + 1; // Increment the count for that year
      });

      // Convert the counts into an array suitable for the chart
      const processedData = Object.keys(countsByYear).map(year => ({
        year: parseInt(year, 10), // Convert year to number
        size: countsByYear[year], // Set the event count for that year
      })).sort((a, b) => a.year - b.year); // Sort by year

      setEventData(processedData); // Update the state with the processed data
    }
  }, [events]);

  return (
    <section className="linechart-container">
      <h4 className="chart-title"> Church Events Line Chart </h4>
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
              backgroundColor: 'transparent',
              border: 'none',
            }}
            labelStyle={{ display: 'none' }}
            position={{ x: 10, y: 80 }}
          />
          <Line type="monotone" dataKey="size" stroke="#82ca9d" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </section>
  );
};

export default EventsLineChart;
