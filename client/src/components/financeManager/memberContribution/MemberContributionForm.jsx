import React, { useState } from 'react';
import './MemberContributionForm.scss';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { FaMoneyBill } from 'react-icons/fa';
import { API } from '../../../utiles/securitiy/secreteKey';
import { useDispatch, useSelector } from 'react-redux';
import {
  constributionFailure,
  constributionStart,
  constributionSuccess,
} from '../../../redux/reducers/contributionReducer';
import { toast } from 'react-toastify';

const MemberContributionForm = () => {
  // Global state variables
  const { error } = useSelector((state) => state.contributions);
  const dispatch = useDispatch();

  // Local state variables
  const [userCode, setUserCode] = useState('');
  const [donation, setDonation] = useState(5);
  const [date, setDate] = useState('');

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'userCode':
        setUserCode(event.target.value);
        break;
      case 'donation':
        setDonation(event.target.value);
        break;
      case 'date':
        setDate(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setUserCode('');
    setDonation(5);
    setDate('');
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(constributionStart());
      // body
      const newContribution = {
        userCode: userCode,
        donation: donation,
        date: date,
      };
      const { data } = await axios.post(
        `${API}/contributions/new-contribution`,
        newContribution
      );
      constributionSuccess(data.contribution);
      toast.success(data.message);
      reset();
    } catch (error) {
      dispatch(constributionFailure(error.response.data.message));
    }
  };
  return (
    <section className="member-contribution-wrapper">
      <h3 className="member-contributions-title"> Members Contribution </h3>

      {error ? <p className="error-message"> {error} </p> : null}

      <fieldset className="member-contribution-fieldset">
        <legend className="member-contribution-legend">
          Add Individual Member Contribution
        </legend>

        <form
          onSubmit={handleSubmit}
          action=""
          className="member-contribution-form"
        >
          {/* User Code */}
          <div className="input-container">
            <FaMoneyBill className="input-icon" />
            <input
              type="text"
              name="userCode"
              id="userCode"
              value={userCode}
              onChange={updateData}
              placeholder="Enter User Code"
              className="input-field"
            />

            <label htmlFor="userCode" className="input-label">
              User Code
            </label>
          </div>

          {/* Donation */}
          <div className="input-container">
            <FaMoneyBill className="input-icon" />
            <input
              type="number"
              name="donation"
              id="donation"
              value={donation}
              onChange={updateData}
              placeholder="Enter Amount"
              className="input-field"
            />

            <label htmlFor="donation" className="input-label">
              Donation
            </label>

            <span className="input-highlight"></span>
          </div>

          {/* Date */}
          <div className="input-container">
            <FaMoneyBill className="input-icon" />
            <input
              type="date"
              name="date"
              id="date"
              value={date}
              onChange={updateData}
              className="input-field"
            />

            <label htmlFor="date" className="input-label">
              Date
            </label>

            <span className="input-highlight"></span>
          </div>

          {/* User Consent */}
          <div className="input-consent">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              className="consent-checkbox"
            />
            <label htmlFor="agree" className="accept">
              I accept
            </label>

            <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
          </div>

          <button className="member-contribution-btn">Send</button>
        </form>
      </fieldset>
    </section>
  );
};

export default MemberContributionForm;
