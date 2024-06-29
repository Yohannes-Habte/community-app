import { useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import "./AddMemberContribution.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";
import { useSelector } from "react-redux";

const initialState = {
  userId: "",
  amount: "",
  date: "",
};
const AddMemberContribution = ({ setOpen }) => {
  const { currentUser } = useSelector((state) => state.user);
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
      amount: "",
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
      const { data } = await axios.put(
        `${API}/members/${currentUser._id}/contribution/new`,
        newContribution
      );
      toast.success(data.message);
      handleReset();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <article className="add-contribution-modal">
      <section className="member-contribution-popup-Box">
        <span onClick={() => setOpen(false)} className="close-modal">
          X
        </span>
        <h3 className="member-contribution-title">
          Member Monthly Contribution
        </h3>

        <form
          action=""
          onSubmit={handleSubmit}
          className="member-contribution-form"
        >
          {/* User ID*/}
          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              name="userId"
              value={userId}
              onChange={handleChange}
              placeholder="User ID"
              className="input-field"
            />
            <label htmlFor="fullName" className="input-label">
              User ID
            </label>
            <span className="input-highlight"></span>
          </div>

          {/*Monthly Contribution Amount*/}
          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Monthly Contribution Amount"
              className="input-field"
            />
            <label htmlFor="fullName" className="input-label">
              Monthly Contribution Amount
            </label>
            <span className="input-highlight"></span>
          </div>

          {/*Contribution Date*/}
          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              placeholder="Contribution Date"
              className="input-field"
            />
            <label htmlFor="fullName" className="input-label">
              Contribution Date
            </label>
            <span className="input-highlight"></span>
          </div>

          <button className="add-member-contribution-btn">
            Add Contribution
          </button>
        </form>
      </section>
    </article>
  );
};

export default AddMemberContribution;
