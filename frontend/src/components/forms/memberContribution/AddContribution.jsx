import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import "./AddContribution.scss"
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";

const initialState = {
  user: "",
  amount: 5,
  date: "",
};
const AddContribution = ({ setOpen }) => {
  // const { currentUser } = useSelector((state) => state.user);
  const [contributionInfos, setContributionInfos] = useState(initialState);
  const [userNames, setUserNames] = useState([]);
  const { user, amount, date } = contributionInfos;

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${API}/members//search/user`);
      setUserNames(data.members);
    };
    getUser();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContributionInfos({ ...contributionInfos, [name]: value });
  };

  // Handle reset
  const handleReset = () => {
    setContributionInfos({
      user: "",
      amount: 5,
      date: "",
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newContribution = {
        user: user,
        amount: amount,
        date: date,
      };
      const { data } = await axios.post(
        `${API}/contributions/new-contribution`,
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

            <select
              name="user"
              id="user"
              value={user}
              onChange={handleChange}
              className="input-field"
            >
              <option value="default">Select User</option>
              {userNames &&
                userNames.map((userName) => {
                  console.log("single user=", userName);
                  return (
                    <option key={userName.value} value={userName.value}>
                      {userName.label}
                    </option>
                  );
                })}
            </select>

            <label htmlFor="user" className="input-label">
              User
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


export default AddContribution
