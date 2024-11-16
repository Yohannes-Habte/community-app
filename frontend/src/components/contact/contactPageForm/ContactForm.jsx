import axios from "axios";
import { useState } from "react";
import "./ContactForm.scss";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { BsCardText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { API } from "../../../utile/security/secreteKey";
import {
  createCommentFailure,
  createCommentRequest,
  createCommentSuccess,
} from "../../../redux/reducers/comment/commentReducer";
import { validEmail } from "../../../utile/validation/validate";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const initialState = {
  email: "",
  message: "",
};
const ContactForm = () => {
  // Global state variables
  const { loading } = useSelector((state) => state.comment);
  const { currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // State variables
  const [commentData, setCommentData] = useState(initialState);
  const [errors, setErrors] = useState({});

  const { email, message } = commentData;

  // Handle input data change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCommentData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Clear the error message
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateContactForm = () => {
    const formErrors = {};

    // Email validation
    if (!email) {
      formErrors.email = "Email is required.";
    } else if (!validEmail(email)) {
      formErrors.email = "Please enter a valid email address.";
    }

    // Message validation
    if (!message) {
      formErrors.message = "Message is required";
    } else if (message.length < 50) {
      formErrors.message = "Message must be at least 50 characters long";
    }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0; // Return true if there are no errors
  };

  // Reset all the state variables to initial value
  const handleReset = () => {
    setCommentData({
      email: "",
      message: "",
    });
  };

  // Login and Submit Function
  const submitComment = async (event) => {
    event.preventDefault();

    if (!validateContactForm()) return;

    try {
      dispatch(createCommentRequest());
      // The body
      const newComment = {
        email: email,
        message: message,
        user: currentUser._id,
      };
      const { data } = await axios.post(`${API}/comments/new`, newComment, {
        withCredentials: true,
      });
      dispatch(createCommentSuccess(data.result));
      toast.success(data.message);
      handleReset();
    } catch (err) {
      dispatch(createCommentFailure(toast.error(err.message)));
    }
  };
  return (
    <section className="contact-page-form">
      <h2 className="contact-page-form-title">How can we help?</h2>

      <form onSubmit={submitComment} className="contact-page-form">
        {/* Email address input field */}
        <div className="contact-form-input-container">
          <MdEmail className="input-icon" />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Valid Email"
            className="input-field"
            aria-label="Email Address"
          />

          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <span className="input-highlight"></span>

          {errors.email && (
            <p className="input-error-message">{errors.email}</p>
          )}
        </div>

        {/* Textarea input field */}
        <div className="contact-form-input-container">
          <BsCardText className="input-icon" />
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="10"
            value={message}
            onChange={handleChange}
            placeholder="Enter Text Message Here ..."
            className="input-field"
            aria-label="Text Message"
          />

          <label htmlFor="message" className="input-label">
            Text Message
          </label>
          <span className="input-highlight"></span>

          {errors.message && (
            <p className="input-error-message">{errors.message}</p>
          )}
        </div>
        {message.length === 0 ? (
          ""
        ) : (
          <p
            className="message-length-signal"
            aria-label="Remaining characters required"
          >
            {50 - message.trim().length > 0
              ? `At least ${
                  50 - message.trim().length
                } more characters are required to submit your message.`
              : ""}
          </p>
        )}

        <button
          className="contact-form-btn"
          aria-label="Submit the contact form"
          disabled={loading}
        >
          {loading ? (
            <ButtonLoader isLoading={loading} message="" />
          ) : (
            "Send Message"
          )}
        </button>
      </form>
    </section>
  );
};

export default ContactForm;
