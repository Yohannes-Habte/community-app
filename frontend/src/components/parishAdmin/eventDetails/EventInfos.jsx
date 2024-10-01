import { useDispatch, useSelector } from "react-redux";
import "./EventInfos.scss";
import { useEffect, useState } from "react";
import {
  clearAllEventErrors,
  fetchAllEvents,
} from "../../../redux/actions/event/eventAction";
import { useNavigate } from "react-router-dom";

const EventInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.event);

  // Local state variable to track the selected year
  const [year, setYear] = useState("2023");

  useEffect(() => {
    dispatch(fetchAllEvents());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  const handleViewEvents = () => {
    navigate("/admin/dashboard");
    setIsActive(8);
  };

  // ================================================================
  // Function to count events by status and year
  // ================================================================
  const countEventsByYear = (events, selectedYear) => {
    const filteredEvents = events.filter(
      (event) =>
        new Date(event.eventDate).getFullYear() === parseInt(selectedYear)
    );

    const pastEvents = filteredEvents.filter(
      (event) => event.eventStatus === "past"
    ).length;

    const upcomingEvents = filteredEvents.filter(
      (event) => event.eventStatus === "upcoming"
    ).length;

    const cancelledEvents = filteredEvents.filter(
      (event) => event.eventStatus === "cancelled"
    ).length;
    
    const totalEvents = filteredEvents.length;

    return { pastEvents, upcomingEvents, cancelledEvents, totalEvents };
  };

  // ================================================================
  // Function to count events by status and year
  // ================================================================

  const { pastEvents, upcomingEvents, cancelledEvents, totalEvents } =
    countEventsByYear(events, year);

  // ================================================================
  // Function to handle form submission
  // ================================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(e.target.elements.year.value); // Set the selected year
  };

  return (
    <section className="events-information-container">
      <h4 className="event-information-title">Events</h4>

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

      <article className="event-infos-wrapper">
        <h4 className="event-title">Events in {year}</h4>

        <p className="event-status">
          Past: <span>{pastEvents}</span>
        </p>
        <p className="event-status">
          Cancelled: <span>{cancelledEvents}</span>
        </p>
        <p className="event-status">
          Upcoming: <span>{upcomingEvents}</span>
        </p>
        <p className="event-status">
          Total Events: <span>{totalEvents}</span>
        </p>

        <p className="event-link">
          <button onClick={handleViewEvents} className="view">
            View Events
          </button>
        </p>
      </article>
    </section>
  );
};

export default EventInfos;
