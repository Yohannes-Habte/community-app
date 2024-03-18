import React, { useState } from 'react';
import './PriestDelegation.scss';
import { FaUserNurse } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { MdOutlineSmartphone } from 'react-icons/md';
import { BsCalendarDateFill } from 'react-icons/bs';
import { MdMessage } from 'react-icons/md';
import { toast } from 'react-toastify';
import { validEmail } from '../../../utiles/validation/validate';
import { useDispatch, useSelector } from 'react-redux';
import {
  priestDeligateFailure,
  priestDeligateStart,
  priestDeligateSuccess,
} from '../../../redux/reducers/priestReducer';
import axios from 'axios';
import { API } from '../../../utiles/securitiy/secreteKey';

const PriestDelegation = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.priest);
  const dispatch = useDispatch();

  // Local state variables
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [serviceDate, setServiceDate] = useState('');
  const [textMessage, setTextMessage] = useState('');

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'fullName':
        setFullName(e.target.value);
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

  // Reset variables
  const resetVariables = () => {
    setFullName('');
    setEmail('');
    setPhoneNumber('');
    setServiceDate('');
    setTextMessage('');
  };

  // Submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    if (!setFullName) {
      toast.error('Please enter full name!');
    }

    if (!email) {
      toast.error('Please enter your email!');
    }

    if (!validEmail(email)) {
      return toast.error('Please enter a valid email');
    }

    if (!setPhoneNumber) {
      toast.error('Please enter valid phone number!');
    }

    if (!serviceDate) {
      toast.error('Please select date!');
    }

    if (!textMessage) {
      toast.error('Please write a text message!');
    }

    try {
      dispatch(priestDeligateStart());
      const newPriest = {
        fullName: fullName,
        email: email,
        phoneNumber: phoneNumber,
        serviceDate: serviceDate,
        textMessage: textMessage,
      };

      const { data } = await axios.post(
        `${API}/priests/${currentUser._id}/delegate`,
        newPriest
      );

      dispatch(priestDeligateSuccess(data.delegate));
      toast.success(data.message);
      resetVariables();
    } catch (error) {
      dispatch(priestDeligateFailure(error.response.data.message));
    }
  };

  return (
    <section className="new-priest-delegation-wrapper">
      <h2 className="new-priest-delegation-title">New Priest Delegation</h2>
      {error ? <p className="error-message"> {error} </p> : null}

      <form
        action=""
        onSubmit={submitHandler}
        className="new-priest-delegation-form"
      >
        <div className="priest-delegation-form-inputs-wrapper">
          {/* Full Name */}
          <div className="input-container">
            <FaUserNurse className="icon" />
            <input
              type="text"
              name={'fullName'}
              id={'fullName'}
              autoComplete="fullName"
              value={fullName}
              onChange={updateChange}
              placeholder="Enter Full Name"
              className="input-field"
            />

            <label htmlFor={'firstName'} className="input-label">
              Full Name
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
        </div>

        {/* Text Message */}
        <div className="textarea-container">
          <MdMessage className="textarea-icon" />

          <textarea
            name="textMessage"
            id="textMessage"
            autoComplete="serviceDate"
            value={textMessage}
            onChange={updateChange}
            cols="30"
            rows="10"
            placeholder="Enter Service Date"
            className="textarea-field"
          ></textarea>

          <label htmlFor={'textMessage'} className="textarea-label">
            Text message
          </label>
          <span className="textarea-highlight"></span>
        </div>

        <button className="priest-delegation-btn"> Submit </button>
      </form>
    </section>
  );
};

export default PriestDelegation;
