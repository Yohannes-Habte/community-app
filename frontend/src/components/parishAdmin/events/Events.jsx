import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill, RiAdminFill } from "react-icons/ri";
import {
  eventPostFailure,
  eventPostStart,
  eventPostSuccess,
} from "../../../redux/reducers/eventReducer";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";
import "./Events.scss";

const Events = () => {
  // Redux state and dispatch
  // const { error } = useSelector((state) => state.event);
  const dispatch = useDispatch();

  // Local state for event data
  const [formData, setFormData] = useState({
    eventName: "",
    eventPurpose: "",
    eventOrganizer: "",
    eventFacilitator: "",
    eventAddress: "",
    eventDate: "",
  });

  const {
    eventName,
    eventPurpose,
    eventOrganizer,
    eventFacilitator,
    eventAddress,
    eventDate,
  } = formData;

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData({
      eventName: "",
      eventPurpose: "",
      eventOrganizer: "",
      eventFacilitator: "",
      eventAddress: "",
      eventDate: "",
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(eventPostStart());
    try {
      const { data } = await axios.post(`${API}/events/new-event`, formData, {
        withCredentials: true,
      });

      dispatch(eventPostSuccess(data.event));
      toast.success("Event created successfully.");
      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to create event";
      dispatch(eventPostFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <section className="events-section-wrapper">
      <h3 className="events-section-title">General Events</h3>

      <fieldset className="event--fieldset">
        <legend className="event-legend">Add Event</legend>

        <form onSubmit={handleSubmit} className="event-form">
          <div className="inputs-wrapper">
            {/* Event Name */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="eventName"
                value={eventName}
                onChange={handleInputChange}
                placeholder="Enter Event Name"
                className="input-field"
                required
              />
              <label htmlFor="eventName" className="input-label">
                Event Name
              </label>
            </div>

            {/* Event Organizer */}
            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="text"
                name="eventOrganizer"
                value={eventOrganizer}
                onChange={handleInputChange}
                placeholder="Enter Event Organizer"
                className="input-field"
                required
              />
              <label htmlFor="eventOrganizer" className="input-label">
                Event Organizer
              </label>
            </div>

            {/* Event Facilitator */}
            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="text"
                name="eventFacilitator"
                value={eventFacilitator}
                onChange={handleInputChange}
                placeholder="Enter Event Facilitator"
                className="input-field"
                required
              />
              <label htmlFor="eventFacilitator" className="input-label">
                Event Facilitator
              </label>
            </div>
          </div>

          <div className="event-address-and-date">
            {/* Event Address */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="eventAddress"
                value={eventAddress}
                onChange={handleInputChange}
                placeholder="Enter Event Address"
                className="input-field"
                required
              />
              <label htmlFor="eventAddress" className="input-label">
                Event Address
              </label>
            </div>

            {/* Event Date */}
            <div className="input-container">
              <RiAdminFill className="input-icon" />
              <input
                type="date"
                name="eventDate"
                value={eventDate}
                onChange={handleInputChange}
                className="input-field"
                required
              />
              <label htmlFor="eventDate" className="input-label">
                Event Date
              </label>
            </div>
          </div>

          {/* Event Purpose */}
          <div className="input-container">
            <RiLockPasswordFill className="input-icon" />
            <textarea
              name="eventPurpose"
              value={eventPurpose}
              onChange={handleInputChange}
              placeholder="Describe the purpose of the event"
              className="input-field textarea-field"
              rows="6"
              required
            />
            <label htmlFor="eventPurpose" className="input-label">
              Event Purpose
            </label>
          </div>

          {/* Submit Button */}
          <button className="add-event-btn" type="submit">
            Create Event
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default Events;
