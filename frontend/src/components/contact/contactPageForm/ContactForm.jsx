import axios from "axios";
import React, { useState } from "react";
import "./ContactForm.scss";
import { toast } from "react-toastify";
import { MdEmail } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsCardText } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  commentPostFailure,
  commentPostStart,
  commentPostSuccess,
} from "../../../redux/reducers/commentReducer";

const initialState = {
  fullName: "",
  email: "",
  message: "",
};
const ContactForm = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { comment } = useSelector((state) => state.comment);
  const dispatch = useDispatch();

  // State variables
  const [commentData, setCommentData] = useState(initialState);

  const { fullName, email, message } = commentData;

  // Handle input data change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCommentData({ ...commentData, [name]: value });
  };

  // Reset all the state variables to initial value
  const handleReset = () => {
    setCommentData({
      fullName: "",
      email: "",
      message: "",
    });
  };

  // Login and Submit Function
  const submitComment = async (event) => {
    event.preventDefault();

    try {
      dispatch(commentPostStart());
      // The body
      const newComment = {
        fullName: fullName,
        email: email,
        message: message,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/comments/${currentUser._id}/new-comment`,
        newComment
      );
      dispatch(commentPostSuccess(data.comment));
      toast.success(data.message);
      handleReset();
    } catch (err) {
      dispatch(commentPostFailure(toast.error(err.message)));
    }
  };
  return (
    <section className="contact-page-form">
      <h2 className="contact-page-form-title">How can we help?</h2>

      <form onSubmit={submitComment} className="contact-form">
        {/* Full Name input field */}
        <div className="contact-form-input-container">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="fullName"
            value={fullName}
            onChange={handleChange}
            placeholder="First Name, Last Name"
            className="input-field"
          />

          <label htmlFor="fullName" className="input-label">
            Full Name
          </label>
          <span className="input-highlight"></span>
        </div>

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
          />

          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <span className="input-highlight"></span>
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
            placeholder="We Value Your Message"
            className="input-field"
          />

          <label htmlFor="message" className="input-label">
            Text Message
          </label>
          <span className="input-highlight"></span>
        </div>

        <button className="contact-form-btn">Submit</button>
      </form>
    </section>
  );
};

export default ContactForm;
