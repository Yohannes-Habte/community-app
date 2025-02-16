import { useEffect, useState } from "react";
import { FaUserAlt } from "react-icons/fa";
import { FaMoneyBill } from "react-icons/fa";
import { BsCalendarDateFill } from "react-icons/bs";
import "./AddContribution.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { API } from "../../../utile/security/secreteKey";
import { useDispatch } from "react-redux";
import { fetchAllContributions } from "../../../redux/actions/contributions/contributionAction";

// Initial form state
const initialState = {
  user: "",
  amount: 5,
  date: "",
};

const AddContribution = ({ setOpenAddContribution }) => {
  const dispatch = useDispatch();
  // State variables
  const [contributionInfos, setContributionInfos] = useState(initialState);
  const [userNames, setUserNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState("");

  const { user, amount, date } = contributionInfos;

  // Fetch user names on component mount
  useEffect(() => {
    const getUser = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/members/search/user`);
        console.log("Fetched Users:", data.result);
        setUserNames(data.result);
        setLoading(false);
      } catch (error) {
        const message =
          error.response?.data?.message || "Failed to fetch user data.";
        toast.error(message);
        setLoading(false);
      }
    };
    getUser(); // Trigger the user fetch
  }, []);

  // Helper function to validate MongoDB ObjectId format
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContributionInfos({ ...contributionInfos, [name]: value });
  };

  // Reset the form
  const handleReset = () => {
    setContributionInfos(initialState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the selected user
    if (!user || !isValidObjectId(user)) {
      toast.warning("Please select a valid user.");
      return;
    }

    // Validate date - should not be empty
    if (!date) {
      toast.warning("Please provide a valid contribution date.");
      return;
    }

    try {
      setFormLoading(true);

      const newContribution = {
        user,
        amount: parseFloat(amount),
        date,
      };

      // Send contribution data to server
      const { data } = await axios.post(
        `${API}/contributions/new`,
        newContribution,
        { withCredentials: true }
      );

      // Success or error handling based on server response
      if (data.success) {
        toast.success(data.message);
        handleReset();
      } else {
        toast.error(data.message);
      }

      setFormLoading(false);
      dispatch(fetchAllContributions());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An error occurred. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setFormLoading(false);
    }
  };

  return (
    <article className="add-contribution-modal">
      <section className="member-contribution-popup-box">
        {/* Close Modal */}
        <span
          onClick={() => setOpenAddContribution(false)}
          className="close-modal"
          aria-label="Close contribution form"
        >
          X
        </span>
        <h3 className="member-contribution-title">
          Member Monthly Contribution
        </h3>

        {/* Contribution Form */}
        <form
          onSubmit={handleSubmit}
          className="member-contribution-form"
          noValidate
        >
          {/* User ID Selection */}
          <div className="input-container">
            <FaUserAlt className="input-icon" aria-hidden="true" />
            <select
              name="user"
              value={user}
              onChange={handleChange}
              className="input-field"
              aria-label="User selection"
            >
              <option value="">Select User</option>

              {loading ? (
                <ButtonLoader isLoading={loading} message="" size={20} />
              ) : (
                userNames?.map((userName) => (
                  <option key={userName.value} value={userName.value}>
                    {userName.label}
                  </option>
                ))
              )}
            </select>
            <label htmlFor="user" className="input-label">
              User
            </label>
          </div>

          {/* Monthly Contribution Amount */}
          <div className="input-container">
            <FaMoneyBill className="input-icon" aria-hidden="true" />
            <input
              type="number"
              name="amount"
              value={amount}
              onChange={handleChange}
              placeholder="Monthly Contribution Amount"
              className="input-field"
              aria-label="Contribution amount"
              min="5"
              step="0.01"
            />
            <label htmlFor="amount" className="input-label">
              Monthly Contribution Amount
            </label>
          </div>

          {/* Contribution Date */}
          <div className="input-container">
            <BsCalendarDateFill className="input-icon" aria-hidden="true" />
            <input
              type="date"
              name="date"
              value={date}
              onChange={handleChange}
              placeholder="Contribution Date"
              className="input-field"
              aria-label="Contribution date"
            />
            <label htmlFor="date" className="input-label">
              Contribution Date
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="add-member-contribution-btn"
            disabled={formLoading}
            aria-label="Submit contribution"
          >
            {formLoading ? (
              <ButtonLoader isLoading={formLoading} message="" size={24} />
            ) : (
              "Add Contribution"
            )}
          </button>

          {/* Display Errors */}
          {error && (
            <Alert severity="error" style={{ marginTop: "1rem" }}>
              {error}
            </Alert>
          )}
        </form>
      </section>
    </article>
  );
};

export default AddContribution;
