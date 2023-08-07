import React, { useState, useRef } from 'react';
import './Contact.scss';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { ContactData } from '../../data/Data';

const Contact = () => {
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
  const resetStateVariables = () => {
    setFullName('');
    setEmail('');
    setMessage('');
    setfullNameValidation(false);
    setEmailValidation(false);
    setMessageValidation(false);
  };

  // Function to submit user's message
  const submitMessage = async (event) => {
    event.preventDefault();

    const newMessage = {
      fullName: fullName,
      email: email,
      message: message,
    };

    const settings = {
      method: 'POST',
      body: JSON.stringify(newMessage),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch('http://localhost:5000/messages', settings);
    const messageData = await response.json();
    console.log(response);
    console.log(messageData);

    try {
      if (response.ok) {
        setMessage(messageData.comment);
        //setComments([...comments, messageData.comment])
        resetStateVariables();
      } else {
        throw new Error(messageData.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <main className="contact-page">
      <Helmet>
        <title>Contact</title>
      </Helmet>
      <h1 className="contact-page-title"> We'd Love to Hear From You </h1>
      <section className="contact-media">
        {ContactData.map(({ image, heading, link }) => {
          return (
            <article className="contact-media-items">
              <figure className="contact-meida-icon-container"> {image}</figure>
              <h3 className="contact-media-header"> {heading} </h3>
              <p className="contact-media-link-to"> {link} </p>
            </article>
          );
        })}
      </section>

      <section className="contact-page-form">
        <h2 className="contact-page-form-title">Contact Us</h2>
        <form onSubmit={submitMessage} className="contact-form">
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
