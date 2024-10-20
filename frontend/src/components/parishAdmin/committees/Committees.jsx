import { useState, useEffect } from "react";
import axios from "axios";
import { GiCalendarHalfYear } from "react-icons/gi";
import "./Committees.scss";
import { useNavigate } from "react-router-dom";
import CommitteeCard from "../../committees/committeeCard/CommitteeCard";
import AddCommittee from "../../forms/committee/AddCommittee";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { Alert } from "@mui/material";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { API } from "../../../utile/security/secreteKey";

const CommitteeList = () => {
  const navigate = useNavigate();
  const [committees, setCommittees] = useState([]);
  const [startYear, setStartYear] = useState(2022);
  const [endYear, setEndYear] = useState(2023);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCommittee, setOpenCommittee] = useState(false);

  // display all committees
  useEffect(() => {
    fetchCommittees();
  }, []);

  // Fetch committees when startYear or endYear changes
  useEffect(() => {
    fetchCommittees();
  }, [startYear, endYear]);

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `${API}/committees/committee?startYear=${startYear}&endYear=${endYear}`
      );
      setCommittees(response.data);
    } catch (error) {
      if (error.response) {
        setError(`Error: ${error.response.status} - ${error.response.data}`);
      } else if (error.request) {
        setError("Error: No response from the server. Please try again.");
      } else {
        setError(`Error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // Validate year inputs before fetching committees
  const handleSubmit = (e) => {
    e.preventDefault();

    // Year validation
    if (startYear > endYear) {
      setError("Error: Start year cannot be later than end year.");
      return;
    }

    if (startYear < 2022 || endYear > new Date().getFullYear() + 1) {
      setError("Error: Please enter a valid year range.");
      return;
    }

    fetchCommittees();
    navigate(`/admin/dashboard?startYear=${startYear}&endYear=${endYear}`);
  };

  return (
    <article className="committees-container">
      <h2 className="committees-title">Committee Lists</h2>

      <aside className="add-committee-aside">
        <h3 className="add-committee-aside-title">Add New Committee Member</h3>
        <button
          onClick={() => setOpenCommittee(true)}
          className="add-committee-btn"
        >
          Add New
        </button>
      </aside>

      <p className="instruction">
        Please complete the two input fields to access a comprehensive list of
        committee members. This functionality enables you to explore in-depth
        information about the individuals who served, providing valuable
        insights into their roles, length of service, and overall contributions.
      </p>

      <form onSubmit={handleSubmit} className="committee-query-form" noValidate>
        <div className="input-container">
          <GiCalendarHalfYear className="icon" />
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            placeholder="Starting Service Year"
            className="input-field"
            min="2022"
            max={new Date().getFullYear()}
            required
            aria-label="Start Year"
          />
          <label htmlFor="startYear" className="input-label">
            Starting Year
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <GiCalendarHalfYear className="icon" />
          <input
            type="number"
            value={endYear}
            onChange={(e) => setEndYear(parseInt(e.target.value))}
            placeholder="Ending Service Year"
            className="input-field"
            min="2023"
            max={new Date().getFullYear() + 1}
            required
            aria-label="End Year"
          />
          <label htmlFor="endYear" className="input-label">
            Ending Year
          </label>
          <span className="input-highlight"></span>
        </div>

        <button type="submit" className="committees-btn">
          {loading ? (
            <ButtonLoader isLoading={loading} message="" size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Error Message */}
      {error && <Alert className="error-message">{error}</Alert>}

      {/* Loading Spinner */}
      {loading && <PageLoader isLoading={loading} message="" size={80} />}

      {/* Display committees */}
      {!loading && !error && committees.length > 0 && (
        <section className="committee-card-wrapper">
          {committees.map((committee) => (
            <CommitteeCard key={committee._id} data={committee} />
          ))}
        </section>
      )}

      {/* Add Committee Popup */}
      {openCommittee && <AddCommittee setOpenCommittee={setOpenCommittee} />}
    </article>
  );
};

export default CommitteeList;
