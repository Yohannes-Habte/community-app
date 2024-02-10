import axios from 'axios';
import React, { useContext, useRef, useState } from 'react';
import './ContactForm.scss';
import { toast } from 'react-toastify';
import { ACTION } from '../../../contexts/user/UserReducer';
import { UserContext } from '../../../contexts/user/UserProvider';
import { MdEmail } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import { BsCardText } from 'react-icons/bs';

const ContactForm = () => {
  // Global state variables
  const { user, loading, error, dispatch } = useContext(UserContext);

  // State variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [comments, setComments] = useState([]);

  // Validation of the state variables
  const [fullNameValidation, setfullNameValidation] = useState(false);
  const [emailValidation, setEmailValidation] = useState(false);
  const [messageValidation, setMessageValidation] = useState(false);

  // useRef to store the email input
  const emailRef = useRef();
  const messageLength = useRef();

  // Function to check if the email is valid
  const checkEmailFormat = () => {
    if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
      emailRef.current.className = 'errorInvisible';
    } else {
      emailRef.current.className = 'errorVisible';
    }
  };

  // Function to update data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'fullName':
        setFullName(event.target.value);
        setfullNameValidation(true);
        break;
      case 'email':
        setEmail(event.target.value);
        setEmailValidation(true);
        break;
      case 'textarea':
        setMessage(event.target.value);
        setMessageValidation(true);
        break;
      default:
        break;
    }
  };

  // Function to reset all the state variables to initial value
  const reset = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setfullNameValidation(false);
    setEmailValidation(false);
    setMessageValidation(false);
  };

  // Login and Submit Function
  const submitComment = async (event) => {
    event.preventDefault();

    dispatch({ type: ACTION.COMMENT_SEND_START });

    try {
      // The body
      const newComment = {
        fullName: fullName,
        email: email,
        message: message,
      };
      const { data } = await axios.post(
        'http://localhost:4000/api/comments/new-comment',
        newComment
      );

      dispatch({ type: ACTION.COMMENT_SEND_SUCCESS, payload: data });

      localStorage.setItem('comment', JSON.stringify(data));
      reset();
    } catch (err) {
      dispatch({
        type: ACTION.COMMENT_SEND_FAIL,
        payload: toast.error(err.response.data.message),
      });
    }
  };
  return (
    <section className="contact-page-form">
      <h2 className="contact-page-form-title">How can we help?</h2>
      <fieldset className="contact-form-fieldset">
        <legend className="contact-form-legent">
          Please leave us a message.
        </legend>

        <form onSubmit={submitComment} className="contact-form">
          {/* Full Name input field */}
          <div className="contact-form-input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={updateData}
              placeholder="First Name, Last Name"
              className="input-field"
            />

            <label htmlFor="fullName" className="input-label">
              Full Name
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Name Validation */}
          <div
            className={
              fullNameValidation && fullName.trim().length === 0
                ? 'errorVisible'
                : 'errorInvisible'
            }
          >
            {' '}
            Please enter your name{' '}
          </div>

          {/* Email address input field */}
          <div className="contact-form-input-container">
            <MdEmail className="input-icon" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={updateData}
              onBlur={checkEmailFormat}
              placeholder="Enter Valid Email"
              className="input-field"
            />

            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Email Validation */}
          <div
            className={
              emailValidation && email.trim().length === 0
                ? 'errorVisible'
                : 'errorInvisible'
            }
          >
            Email is required{' '}
          </div>
          <div className="errorInvisible" ref={emailRef}>
            Incorrect email format!
          </div>

          {/* Textarea input field */}
          <div className="contact-form-input-container">
            <BsCardText className="input-icon" />
            <textarea
              name="textarea"
              id="textarea"
              cols="30"
              rows="10"
              value={message}
              onChange={updateData}
              placeholder="We Value Your Message"
              className="input-field"
            />

            <label htmlFor="textarea" className="input-label">
              Text Message
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Text Validation */}
          <div
            className={
              messageValidation && message.trim().length === 0
                ? 'errorVisible'
                : 'errorInvisible'
            }
          >
            Please write us message{' '}
          </div>
          <div className="error-message">
            {message.length === 0 ? (
              ''
            ) : (
              <div className="errorVisible" ref={messageLength}>
                {100 - message.trim().length > 0
                  ? `${100 - message.trim().length} characters needed`
                  : ''}
              </div>
            )}
          </div>

          <button className="contact-form-btn">Submit</button>
        </form>
      </fieldset>
    </section>
  );
};

export default ContactForm;
