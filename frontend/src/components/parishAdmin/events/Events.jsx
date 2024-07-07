import  { useState } from "react";
import "./Events.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  eventPostFailure,
  eventPostStart,
  eventPostSuccess,
} from "../../../redux/reducers/eventReducer";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";

const Events = () => {
  // Global state variables
  const { error } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  // Local state variables
  const [eventName, setEventName] = useState("");
  const [eventPurpose, setEventPurpose] = useState("");
  const [eventOrganizer, setEventOrganizer] = useState("");
  const [eventFacilitator, setEventFacilitator] = useState("");
  const [eventAddress, setEventAddress] = useState("");
  const [eventDate, setEventDate] = useState("");

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case "eventName":
        setEventName(event.target.value);
        break;
      case "eventPurpose":
        setEventPurpose(event.target.value);
        break;
      case "eventOrganizer":
        setEventOrganizer(event.target.value);
        break;
      case "eventFacilitator":
        setEventFacilitator(event.target.value);
        break;
      case "eventAddress":
        setEventAddress(event.target.value);
        break;
      case "eventDate":
        setEventDate(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setEventName("");
    setEventPurpose("");
    setEventOrganizer("");
    setEventFacilitator("");
    setEventAddress("");
    setEventDate("");
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(eventPostStart);
      // body
      const newEvent = {
        eventName: eventName,
        eventPurpose: eventPurpose,
        eventOrganizer: eventOrganizer,
        eventFacilitator: eventFacilitator,
        eventAddress: eventAddress,
        eventDate: eventDate,
      };
      const { data } = await axios.post(`${API}/events/new-event`, newEvent);

      dispatch(eventPostSuccess(data.event));
      toast.success(data.message);

      reset();
    } catch (error) {
      dispatch(eventPostFailure(error.response.data.message));
    }
  };

  return (
    <section className="events-section-wrapper">
      <h3 className="events-section-title"> General Events</h3>
      <fieldset className="event--fieldset">
        <legend className="event-legend">Add Events</legend>

        <form onSubmit={handleSubmit} action="" className="event-form">
          <div className="inputs-wrapper">
            {/* Event Name */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="eventName"
                id="eventName"
                value={eventName}
                onChange={updateData}
                placeholder="Enter Event Name"
                className="input-field"
              />

              <label htmlFor="eventName" className="input-label">
                Event Name
              </label>
            </div>

            {/* Event Purpose */}
            <div className="input-container">
              <RiLockPasswordFill className="input-icon" />
              <input
                type="text"
                name="eventPurpose"
                id="eventPurpose"
                value={eventPurpose}
                onChange={updateData}
                placeholder="Enter Event Purpose"
                className="input-field"
              />

              <label htmlFor="eventPurpose" className="input-label">
                Event Purpose
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Event Organizer */}
            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="text"
                name="eventOrganizer"
                id="eventOrganizer"
                value={eventOrganizer}
                onChange={updateData}
                placeholder="Enter Event Organizer"
                className="input-field"
              />

              <label htmlFor="eventOrganizer" className="input-label">
                Event Organizer
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Event Facilitator */}
            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="text"
                name="eventFacilitator"
                id="eventFacilitator"
                value={eventFacilitator}
                onChange={updateData}
                placeholder="Enter Event Facilitator"
                className="input-field"
              />

              <label htmlFor="eventFacilitator" className="input-label">
                Event Facilitator
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Event Address */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="eventAddress"
                id="eventAddress"
                value={eventAddress}
                onChange={updateData}
                placeholder="Enter Event Address"
                className="input-field"
              />

              <label htmlFor="eventAddress" className="input-label">
                Event Address
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Event Date */}
            <div className="input-container">
              <RiAdminFill className="input-icon" />
              <input
                type="date"
                name="eventDate"
                id="eventDate"
                value={eventDate}
                onChange={updateData}
                placeholder="Enter Title"
                className="input-field"
              />

              <label htmlFor="eventDate" className="input-label">
                Event Date
              </label>

              <span className="input-highlight"></span>
            </div>
          </div>

          {/* User Consent */}
          <div className="input-consent">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              className="consent-checkbox"
            />
            <label htmlFor="agree" className="accept">
              I accept
            </label>

            <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
          </div>

          <button className="add-event-btn">Send</button>
        </form>
      </fieldset>
    </section>
  );
};

export default Events;
