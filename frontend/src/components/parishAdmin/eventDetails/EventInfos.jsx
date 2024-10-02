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
  const [year, setYear] = useState(new Date().getFullYear());

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

    return {
      pastEvents,
      upcomingEvents,
      cancelledEvents,
      totalEvents,
    };
  };

  // ================================================================
  // Function to count events by status and year
  // ================================================================

  const { pastEvents, upcomingEvents, cancelledEvents, totalEvents } =
    countEventsByYear(events, year);

  // ================================================================
  // Event facilitators by year
  // ================================================================
  const eventFacilitators = events.filter(
    (event) => new Date(event.eventDate).getFullYear().toString() === year
  );



  // ================================================================
  // Function to handle form submission
  // ================================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(e.target.elements.year.value); // Set the selected year
  };

  return (
    <section className="events-information-container">
      <h4 className="event-information-title">Events Services for the Year {year} </h4>

      <form action="" onSubmit={handleSubmit} className="event-year-form">
        <input
          type="number"
          name="year"
          defaultValue={year}
          placeholder="Enter Year only"
          className="input-field"
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

          <aside className="right-event-box">
            {eventFacilitators && eventFacilitators.length > 0 ? (
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
        </div>
      </article>
    </section>
  );
};

export default EventInfos;
