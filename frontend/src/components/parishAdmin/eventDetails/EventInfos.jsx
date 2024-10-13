import { useDispatch, useSelector } from "react-redux";
import "./EventInfos.scss";
import { useEffect, useState, useMemo } from "react";
import {
  clearAllEventErrors,
  fetchAllEvents,
} from "../../../redux/actions/event/eventAction";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { Alert } from "@mui/material";

const EventInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events = [], loading, error } = useSelector((state) => state.event);
  const [year, setYear] = useState(new Date().getFullYear());
  const [inputError, setInputError] = useState("");
  const [buttonLoading, setButtonLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEvents());

    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  const handleViewEvents = () => {
    navigate("/admin/dashboard");
    setIsActive(7);
  };

  // Function to count events by their year and status
  const countEventsByYear = (eventsList, selectedYear) => {
    const filteredEvents = eventsList.filter(
      (event) =>
        new Date(event?.eventDate).getFullYear() === parseInt(selectedYear)
    );

    const pastEvents = filteredEvents.filter(
      (event) => event?.eventStatus === "past"
    ).length;

    const upcomingEvents = filteredEvents.filter(
      (event) => event?.eventStatus === "upcoming"
    ).length;

    const cancelledEvents = filteredEvents.filter(
      (event) => event?.eventStatus === "cancelled"
    ).length;

    return {
      pastEvents,
      upcomingEvents,
      cancelledEvents,
      totalEvents: filteredEvents.length,
    };
  };

  // Get the counts of different types of events
  const { pastEvents, upcomingEvents, cancelledEvents, totalEvents } =
    countEventsByYear(events, year);

  const eventFacilitators = useMemo(() => {
    return events.filter(
      (event) => new Date(event?.eventDate).getFullYear() === parseInt(year)
    );
  }, [events, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setButtonLoading(true);
    setInputError("");

    const selectedYear = e.target.elements.year.value;
    const currentYear = new Date().getFullYear();

    // Validate the selected year input
    if (
      isNaN(selectedYear) ||
      selectedYear < 2022 ||
      selectedYear > currentYear
    ) {
      setInputError(
        `Please enter a valid year between 2022 and ${currentYear}`
      );
      setButtonLoading(false);
    } else {
      setYear(selectedYear);
      setButtonLoading(false);
    }
  };

  return (
    <section className="events-information-container">
      <h4 className="event-information-title">
        Event Services for the Year {year}
      </h4>

      <form onSubmit={handleSubmit} className="event-year-form">
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year"
          className="input-field"
          aria-label="Enter year for event services"
          min="2022"
          max={new Date().getFullYear()}
        />
        <button className="year-form-btn" disabled={buttonLoading}>
          {buttonLoading ? (
            <ButtonLoader isLoading={buttonLoading} message="" size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Display input validation error */}
      {inputError && <Alert className="error-message">{inputError}</Alert>}

      <article className="event-infos-wrapper">
        <h4 className="event-title">Events in {year}</h4>
        <div className="event-box">
          <aside className="left-event-box">
            <p className="event-status">
              Past Events: <span className="span">{pastEvents}</span>
            </p>
            <p className="event-status">
              Cancelled Events: <span className="span">{cancelledEvents}</span>
            </p>
            <p className="event-status">
              Upcoming Events: <span className="span">{upcomingEvents}</span>
            </p>
            <p className="event-status">
              Total Events: <span className="span">{totalEvents}</span>
            </p>

            <h4 className="event-link">
              <button onClick={handleViewEvents} className="view">
                View Events
              </button>
            </h4>
          </aside>

          {/* Loader when loading events */}
          {loading && <PageLoader isLoading={loading} message="" size={80} />}

          {/* Display error message if there's an error */}
          {error && (
            <Alert className="error-message">An error occurred: {error}</Alert>
          )}

          {/* Display when no events are found */}
          {!loading && !error && events && events.length === 0 && (
            <Alert>No events found for the year {year}</Alert>
          )}

          {/* Right-side event facilitators */}
          {!loading && !error && events && events.length > 0 && (
            <aside className="right-event-box">
              {eventFacilitators.length > 0 ? (
                eventFacilitators.map((event, index) => (
                  <ul key={index} className="event-facilitators-list">
                    <li className="event-facilitator">
                      {event.eventName}:{" "}
                      <span className="facilitator">
                        {event.eventFacilitator}
                      </span>
                    </li>
                  </ul>
                ))
              ) : (
                <h4 className="no-facilitators">
                  No facilitators available for the selected {year}
                </h4>
              )}
            </aside>
          )}
        </div>
      </article>
    </section>
  );
};

export default EventInfos;
