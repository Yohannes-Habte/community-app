import "./AddEvent.scss";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {
  FaCalendarAlt,
  FaUsers,
  FaChalkboardTeacher,
  FaMapMarkerAlt,
  FaRegClock,
  FaFileAlt,
} from "react-icons/fa";

import { toast } from "react-toastify";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import {
  postServiceRequestFailure,
  postServiceRequestStart,
  postServiceRequestSuccess,
} from "../../../redux/reducers/service/serviceReducer";
import { API } from "../../../utile/security/secreteKey";

const initialState = {
  eventName: "",
  eventPurpose: "",
  eventOrganizer: "",
  eventFacilitator: "",
  eventAddress: "",
  eventDate: "",
};

const AddEvent = () => {
  const dispatch = useDispatch();

  // Local state for event data and loading status
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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

    setErrors({ ...errors, [name]: "" });
  };

  // Validate form inputs
  const validate = () => {
    const newErrors = {};
    if (!eventName) newErrors.eventName = "Event name is required";
    if (!eventPurpose) newErrors.eventPurpose = "Event purpose is required";
    if (!eventOrganizer)
      newErrors.eventOrganizer = "Event organizer is required";

    if (!eventFacilitator)
      newErrors.eventFacilitator = "Event facilitator is required";

    if (!eventAddress) newErrors.eventAddress = "Event address is required";
    if (!eventDate) newErrors.eventDate = "Event date is required";

    return newErrors;
  };

  // Reset form after submission
  const resetForm = () => {
    setFormData(initialState);
  };

  // Form validation for event date
  const isValidDate = () => {
    const today = new Date();
    const selectedDate = new Date(eventDate);
    return selectedDate > today; // Ensure event date is in the future or today
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (!isValidDate()) {
      toast.error("Event date must be in the future.");
      return;
    }

    setLoading(true);
    dispatch(postServiceRequestStart());
    try {
      const { data } = await axios.post(`${API}/events/new-event`, formData, {
        withCredentials: true,
      });

      dispatch(postServiceRequestSuccess(data.event));
      toast.success("Event created successfully.");
      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create event. Please try again.";
      dispatch(postServiceRequestFailure(errorMessage));
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="event-form-wrapper">
      <h3 className="event-form-title">Add New Event</h3>

      <form onSubmit={handleSubmit} className="event-form">
        <div className="inputs-wrapper">
          {/* Event Name */}
          <div className="input-container">
            <FaCalendarAlt className="input-icon" />
            <input
              type="text"
              name="eventName"
              value={eventName}
              onChange={handleInputChange}
              placeholder="Enter Event Name"
              className="input-field"
              aria-label="Event Name"
            />
            <label htmlFor="eventName" className="input-label">
              Event Name
            </label>
            {errors.eventName && (
              <p className="input-error">{errors.eventName}</p>
            )}
          </div>

          {/* Event Organizer */}
          <div className="input-container">
            <FaUsers className="input-icon" />
            <input
              type="text"
              name="eventOrganizer"
              value={eventOrganizer}
              onChange={handleInputChange}
              placeholder="Enter Event Organizer"
              className="input-field"
              aria-label="Event Organizer"
            />
            <label htmlFor="eventOrganizer" className="input-label">
              Event Organizer
            </label>

            {errors.eventOrganizer && (
              <p className="input-error">{errors.eventOrganizer}</p>
            )}
          </div>

          {/* Event Facilitator */}
          <div className="input-container">
            <FaChalkboardTeacher className="input-icon" />
            <input
              type="text"
              name="eventFacilitator"
              value={eventFacilitator}
              onChange={handleInputChange}
              placeholder="Enter Event Facilitator"
              className="input-field"
              aria-label="Event Facilitator"
            />
            <label htmlFor="eventFacilitator" className="input-label">
              Event Facilitator
            </label>

            {errors.eventFacilitator && (
              <p className="input-error">{errors.eventFacilitator}</p>
            )}
          </div>
        </div>

        <div className="event-address-and-date">
          {/* Event Address */}
          <div className="input-container">
            <FaMapMarkerAlt className="input-icon" />
            <input
              type="text"
              name="eventAddress"
              value={eventAddress}
              onChange={handleInputChange}
              placeholder="Enter Event Address"
              className="input-field"
              aria-label="Event Address"
            />
            <label htmlFor="eventAddress" className="input-label">
              Event Address
            </label>

            {errors.eventAddress && (
              <p className="input-error">{errors.eventAddress}</p>
            )}
          </div>

          {/* Event Date */}
          <div className="input-container">
            <FaRegClock className="input-icon" />
            <input
              type="date"
              name="eventDate"
              value={eventDate}
              onChange={handleInputChange}
              className="input-field"
              aria-label="Event Date"
            />
            <label htmlFor="eventDate" className="input-label">
              Event Date
            </label>

            {errors.eventDate && (
              <p className="input-error">{errors.eventDate}</p>
            )}
          </div>
        </div>

        {/* Event Purpose */}
        <div className="input-container">
          <FaFileAlt className="input-icon" />
          <textarea
            name="eventPurpose"
            value={eventPurpose}
            onChange={handleInputChange}
            placeholder="Describe the purpose of the event"
            className="input-field textarea-field"
            rows="6"
            aria-label="Event Purpose"
          />
          <label htmlFor="eventPurpose" className="input-label">
            Event Purpose
          </label>

          {errors.eventPurpose && (
            <p className="input-error">{errors.eventPurpose}</p>
          )}
        </div>

        {/* Submit Button with loading state */}
        <button className="add-event-btn" type="submit" disabled={loading}>
          {loading ? <ButtonLoader isLoading={loading} /> : "Create Event"}
        </button>
      </form>
    </section>
  );
};

export default AddEvent;
