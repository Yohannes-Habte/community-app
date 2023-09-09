import React, { useState, useRef, useContext } from 'react';
import './Contact.scss';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ContactData } from '../../data/Data';
import { UserContext } from '../../contexts/user/UserProvider';
import { ACTION } from '../../contexts/user/UserReducer';
import { toast } from 'react-toastify';
import ErrorMessage from '../../utiles/ErrorMessage';

const Contact = () => {
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
        payload: toast.error(ErrorMessage(err)),
      });
    }
  };

  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <h1 className="contact-page-title"> We'd Love to Hear From You </h1>
      <section className="contact-media">
        {ContactData.map(({ image, heading, link }, index) => {
          return (
            <article key={index} className="contact-media-items">
              <figure className="contact-meida-icon-container"> {image}</figure>
              <h3 className="contact-media-header"> {heading} </h3>
              <p className="contact-media-link-to"> {link} </p>
            </article>
          );
        })}
      </section>

      <section className="contact-page-form">
        <h2 className="contact-page-form-title">Contact Us</h2>
        <form onSubmit={submitComment} className="contact-form">
          <div className="contact-form-input-container">
            <input
              type="text"
              name="fullName"
              value={fullName}
              onChange={updateData}
              placeholder="Enter Full Name"
            />
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
          </div>

          <div className="contact-form-input-container">
            <input
              type="email"
              name="email"
              value={email}
              onChange={updateData}
              onBlur={checkEmailFormat}
              placeholder="Enter Valid Email"
            />
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
          </div>

          <div className="contact-form-input-container">
            <textarea
              name="textarea"
              cols="30"
              rows="10"
              value={message}
              onChange={updateData}
              placeholder="We Value Your Message"
            />
            <div
              className={
                messageValidation && message.trim().length === 0
                  ? 'errorVisible'
                  : 'errorInvisible'
              }
            >
              Please write us message{' '}
            </div>
            <div>
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
          </div>
          <div className="contact-form-button-container">
            <button className="contact-form-btn">Submit</button>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Contact;
