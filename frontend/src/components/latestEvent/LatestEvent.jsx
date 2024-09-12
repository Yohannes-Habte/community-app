import { useState, useEffect } from "react";
import axios from "axios";
import "./LatestEvent.scss";
import { API } from "../../utiles/securitiy/secreteKey";

const LatestEvent = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the last event when the component is mounted
  useEffect(() => {
    const fetchLastEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API}/events/last-event`);
        setEvent(response.data.result); // Set event data
      } catch (err) {
        setError("Failed to fetch event");
      } finally {
        setLoading(false);
      }
    };

    fetchLastEvent();
  }, []);

  // Display event data
  return (
    <>
      {loading ? (
        "Loading..."
      ) : error ? (
        <p>{error}</p>
      ) : (
        <section className="latest-event-container">
          <h2 className="latest-event-title">Latest Event</h2>
          <div className="event-wrapper">
            <article className="event-description">
              <h3 className="event-name">{event?.eventName}</h3>
              <p className="event-purpose">{event?.eventPurpose}</p>
            </article>

            <aside className="event-management">
              <h4>
                Event Organizer: <strong>{event?.eventOrganizer}</strong>
              </h4>
              <p>
                Event Facilitator: <strong>{event?.eventFacilitator}</strong>
              </p>
              <p>
                Event Address: <strong>{event?.eventAddress}</strong>
              </p>
              <p>
                Event Date:{" "}
                <strong>
                  {new Date(event?.eventDate).toLocaleDateString()}
                </strong>
              </p>
            </aside>
          </div>
        </section>
      )}
    </>
  );
};

export default LatestEvent;
