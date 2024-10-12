import { useDispatch, useSelector } from "react-redux";
import "./EventInfos.scss";
import { useEffect, useState, useMemo } from "react";
import {
  clearAllEventErrors,
  fetchAllEvents,
} from "../../../redux/actions/event/eventAction";
import { useNavigate } from "react-router-dom";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

const EventInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);

  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    dispatch(fetchAllEvents());

    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  const handleViewEvents = () => {
    navigate("/admin/dashboard");
    setIsActive(8);
  };

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

    return {
      pastEvents,
      upcomingEvents,
      cancelledEvents,
      totalEvents: filteredEvents.length,
    };
  };

  const { pastEvents, upcomingEvents, cancelledEvents, totalEvents } =
    countEventsByYear(events, year);

  const eventFacilitators = useMemo(() => {
    return events.filter(
      (event) => new Date(event.eventDate).getFullYear() === parseInt(year)
    );
  }, [events, year]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const selectedYear = e.target.elements.year.value;
    if (
      isNaN(selectedYear) ||
      selectedYear < 2022 ||
      selectedYear > new Date().getFullYear()
    ) {
      alert(
        `Please enter a valid year between 2022 and ${new Date().getFullYear()}`
      );
    } else {
      setYear(selectedYear);
    }
  };

  return (
    <section className="events-information-container">
      <h4 className="event-information-title">
        Events Services for the Year {year}{" "}
      </h4>

      <form action="" onSubmit={handleSubmit} className="event-year-form">
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year only"
          className="input-field"
          aria-label="Enter Year"
        />
        <button className="year-form-btn">Search</button>
      </form>

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
          {loading && <PageLoader isLoading={loading} message={""} size={80} />}
          {error && <p>{error}</p>}
          {events && events.length === 0 && <p>No events found</p>}

          {!loading && !error && events && events.length !== 0 && (
            <aside className="right-event-box">
              {eventFacilitators.length > 0 ? (
                eventFacilitators.map((event, index) => {
                  return (
                    <ul key={index} className="event-facilitators-list">
                      <li className="event-facilitator">
                        {event.eventName}:{" "}
                        <span className="facilitator">
                          {event.eventFacilitator}
                        </span>
                      </li>
                    </ul>
                  );
                })
              ) : (
                <h4 className="no-facilitators">
                  Facilitators Unavailable for the Selected Year
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
