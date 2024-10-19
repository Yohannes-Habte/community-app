// frontend/src/components/NotificationForm.js
import { useState } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import "./SubscriberNotification.scss";
import { RiMessage2Fill } from "react-icons/ri";
import { MdSubject } from "react-icons/md";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";

const initialState = {
  subject: "",
  text: "",
};

const initialErrors = {
  subject: "",
  text: "",
};

const SubscriberNotification = () => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState(initialErrors);
  const [loading, setLoading] = useState(false);
  const { subject, text } = formData;

  // Helper to reset form state
  const resetForm = () => {
    setFormData(initialState);
    setErrors(initialErrors);
  };

  // Handle form input changes and clear specific error message
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear specific field error on change
    }));
  };

  // Input validation function
  const validateInputs = () => {
    const newErrors = {};
    if (!subject.trim()) newErrors.subject = "Subject is required.";
    if (!text.trim()) newErrors.text = "Notification text is required.";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs and set error state
    const validationErrors = validateInputs();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API}/subscribers/notify`, {
        subject,
        text,
      });

      setLoading(false);
      toast.success(response.data.message);
      resetForm();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message ||
        "Failed to send notification. Please try again later.";

      toast.error(errorMessage);

      setLoading(false);
      setErrors((prevErrors) => ({
        ...prevErrors,
        form: "Failed to send notification. Please try again later.",
      }));
    }
  };

  return (
    <section className="subscribers-notification-wrapper">
      <h2 className="subscribers-notification-title">
        Notify Subscribed ERCCH Members
      </h2>

      <form onSubmit={handleSubmit} className="subscribers-notification-form">
        {/* Subject Field */}
        <div className="input-container">
          <label htmlFor="subject">Subject:</label>
          <MdSubject className="icon" />
          <input
            type="text"
            name="subject"
            value={subject}
            onChange={handleChange}
            placeholder="Enter notification subject"
            className="input-field"
            aria-label="Notification Subject"
          />
          {errors.subject && <p className="input-error">{errors.subject}</p>}
        </div>

        {/* Notification Text Field */}
        <div className="input-container">
          <label htmlFor="text">Notification Text Message:</label>
          <RiMessage2Fill className="icon" />
          <textarea
            name="text"
            value={text}
            onChange={handleChange}
            placeholder="Enter your notification message here..."
            cols={30}
            rows={10}
            className="input-field"
            aria-label="Notification Text"
          ></textarea>
          {errors.text && <p className="input-error">{errors.text}</p>}
        </div>

        {/* Submit Button */}
        <button
          className="subscriber-notification-btn"
          type="submit"
          disabled={loading}
        >
          {loading ? <ButtonLoader isLoading={loading} /> : "Send Notification"}
        </button>

        {/* Global Error Message */}
        {errors.form && <Alert>{errors.form}</Alert>}
      </form>
    </section>
  );
};

export default SubscriberNotification;
