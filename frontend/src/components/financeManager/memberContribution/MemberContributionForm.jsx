import { useState } from "react";
import "./MemberContributionForm.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaMoneyBill } from "react-icons/fa";
import { API } from "../../../utiles/securitiy/secreteKey";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const initialState = {
  userId: "",
  amount: 5,
  date: "",
};
const MemberContributionForm = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);

  // Local state variables
  const [contributionInfos, setContributionInfos] = useState(initialState);

  const { userId, amount, date } = contributionInfos;

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContributionInfos({ ...contributionInfos, [name]: value });
  };

  // Handle reset
  const handleReset = () => {
    setContributionInfos({
      userId: "",
      amount: 5,
      date: "",
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContribution = {
        userId: userId,
        amount: amount,
        date: date,
      };
      const { data } = await axios.post(
        `${API}/contributions/${currentUser._id}/new-contribution`,
        newContribution
      );
      toast.success(data.message);
      handleReset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <section className="member-contribution-wrapper">
      <h3 className="member-contributions-title"> Members Contribution </h3>

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
              name="userId"
              value={userId}
              onChange={handleChange}
              placeholder="User ID"
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
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Monthly Contribution Amount"
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
              value={date}
              onChange={handleChange}
              placeholder="Contribution Date"
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

            <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
          </div>

          <button className="member-contribution-btn">Send</button>
        </form>
      </fieldset>
    </section>
  );
};

export default MemberContributionForm;
