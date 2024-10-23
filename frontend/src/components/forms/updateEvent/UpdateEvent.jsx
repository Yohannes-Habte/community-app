import { useDispatch, useSelector } from "react-redux";
import "./UpdateEvent.scss";
import axios from "axios";
import { API } from "../../../utile/security/secreteKey";
import { toast } from "react-toastify";
import {
  fetchEventFailure,
  fetchEventStart,
  fetchEventSuccess,
  updateEventFailure,
  updateEventStart,
  updateEventSuccess,
} from "../../../redux/reducers/event/eventReducer";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import {
  FaCalendarAlt,
  FaChalkboardTeacher,
  FaFileAlt,
  FaMapMarkerAlt,
  FaRegClock,
  FaUsers,
} from "react-icons/fa";

const UpdateEvent = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { currentEvent, loading } = useSelector((state) => state.event);
  const [formData, setFormData] = useState({
    eventName: currentEvent?.eventName || "",
    eventPurpose: currentEvent?.eventPurpose || "",
    eventOrganizer: currentEvent?.eventOrganizer || "",
    eventFacilitator: currentEvent?.eventFacilitator || "",
    eventAddress: currentEvent?.eventAddress || "",
    eventDate: currentEvent?.eventDate || "",
  });

  const {
    eventName,
    eventPurpose,
    eventOrganizer,
    eventFacilitator,
    eventAddress,
    eventDate,
  } = formData;

  // Get a single event data
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        dispatch(fetchEventStart());
        const { data } = await axios.get(`${API}/events/${id}`, {
          withCredentials: true,
        });

        dispatch(fetchEventSuccess(setFormData(data.result)));
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch event.";

        dispatch(fetchEventFailure(errorMessage));

        toast.error(errorMessage);
      }
    };

    fetchEvent();
  }, [id]);

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

    dispatch(updateEventStart());
    try {
      const { data } = await axios.put(`${API}/events/${id}`, formData, {
        withCredentials: true,
      });

      dispatch(updateEventSuccess(data.event));
      toast.success(data.message);
      resetForm();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Failed to create event. Please try again.";
      dispatch(updateEventFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="update-event-form">
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
      </div>

      {/* Submit Button with loading state */}
      <button className="update-event-btn" type="submit" disabled={loading}>
        {loading ? (
          <ButtonLoader isLoading={loading} message="" />
        ) : (
          "Create Event"
        )}
      </button>
    </form>
  );
};

export default UpdateEvent;
