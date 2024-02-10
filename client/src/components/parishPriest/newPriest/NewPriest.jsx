import React, { useState } from 'react';
import './NewPriest.scss';
import { FaUserNurse } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MdOutlineSmartphone } from 'react-icons/md';
import { BsCalendarDateFill } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';

const NewPriest = () => {
  // Local state variables
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [textMessage, setTextMessage] = useState('');

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'firstName':
        setFirstName(e.target.value);
        break;
      case 'lastName':
        setLastName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'phoneNumber':
        setPhoneNumber(e.target.value);
        break;
      case 'serviceDate':
        setServiceDate(e.target.value);
        break;

      case 'textMessage':
        setTextMessage(e.target.value);
        break;
      default:
        break;
    }
  };
  return (
    <section className="new-priest-delegation-wrapper">
      <h2 className="new-priest-delegation-title">New Priest Delegation</h2>

      <form action="" className="new-priest-delegation-form">
        {/* First Name */}
        <div className="input-container">
          <FaUserNurse className="icon" />
          <input
            type="text"
            name={'firstName'}
            id={'firstName'}
            autoComplete="firstName"
            value={firstName}
            onChange={updateChange}
            placeholder="First Name"
            className="input-field"
          />

          <label htmlFor={'firstName'} className="input-label">
            First Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Last Name */}
        <div className="input-container">
          <FaUserNurse className="icon" />
          <input
            type="text"
            name={'lastName'}
            id={'lastName'}
            autoComplete="lastName"
            value={lastName}
            onChange={updateChange}
            placeholder="Last Name"
            className="input-field"
          />

          <label htmlFor={'lastName'} className="input-label">
            Last Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Email Address */}
        <div className="input-container">
          <MdEmail className="icon" />
          <input
            type="email"
            name="email"
            id="email"
            autoComplete="email"
            value={email}
            onChange={updateChange}
            placeholder="Enter Email"
            className="input-field"
          />
          <label htmlFor="email" className="input-label">
            Email Address
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Phone Number */}
        <div className="input-container">
          <MdOutlineSmartphone className="icon" />
          <input
            type="text"
            name={'phoneNumber'}
            id={'phoneNumber'}
            autoComplete="phoneNumber"
            value={phoneNumber}
            onChange={updateChange}
            placeholder="Enter Phone Number"
            className="input-field"
          />

          <label htmlFor={'phoneNumber'} className="input-label">
            Phone Number
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Service Date */}
        <div className="input-container">
          <BsCalendarDateFill className="icon" />
          <input
            type="date"
            name={'serviceDate'}
            id={'serviceDate'}
            autoComplete="serviceDate"
            value={serviceDate}
            onChange={updateChange}
            placeholder="Enter Service Date"
            className="input-field"
          />

          <label htmlFor={'serviceDate'} className="input-label">
            Service Date
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Text Message */}
        <div className="input-container">
          <MdMessage className="icon" />

          <textarea
            name="textMessage"
            id="textMessage"
            autoComplete="serviceDate"
            value={textMessage}
            onChange={updateChange}
            cols="30"
            rows="10"
            placeholder="Enter Service Date"
            className="input-field"
          ></textarea>

          <label htmlFor={'textMessage'} className="input-label">
            Text message
          </label>
          <span className="input-highlight"></span>
        </div>
      </form>
    </section>
  );
};

export default NewPriest;
