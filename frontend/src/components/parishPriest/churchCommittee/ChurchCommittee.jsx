import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import "./ChurchCommittee.scss";
import CommitteeCard from "../../committees/committeeCard/CommitteeCard";
import { Alert } from "@mui/material";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { API } from "../../../utile/security/secreteKey";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const ChurchCommittee = () => {
  // State variables
  const [yearRanges, setYearRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch available year ranges on component mount
  useEffect(() => {
    const fetchYearRanges = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/committees/years`, {
          withCredentials: true,
        });
        setYearRanges(data.result);
      } catch (err) {
        setError("Error fetching year ranges. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchYearRanges();
  }, []);

  // Fetch committee members based on the selected year range
  const fetchCommitteeMembers = useCallback(
    async (e) => {
      e.preventDefault();
      setError("");
      setCommitteeMembers([]);

      if (!selectedRange) {
        setError("Please select a valid year range.");
        return;
      }

      const [startYear, endYear] = selectedRange.split("-");
      setLoading(true);

      try {
        const { data } = await axios.get(
          `${API}/committees/members/service?startYear=${startYear}&endYear=${endYear}`,
          { withCredentials: true } // Ensure secure API requests
        );

        if (data.success && data.result.length > 0) {
          setCommitteeMembers(data.result);
        } else {
          setError("No committee members found for the selected year range.");
        }
      } catch (err) {
        setError("Error fetching committee members. Please try again.");
      } finally {
        setLoading(false);
      }
    },
    [selectedRange]
  );

  return (
    <section className="committees-container">
      <h3 className="committees-title">Committee Members</h3>

      {/* Display error messages */}
      {error && (
        <Alert severity="error" className="error-message">
          {error}
        </Alert>
      )}

      {/* Description for user guidance */}
      <p className="access-information">
        Kindly select a year range from the options below to view the list of
        committee members who served within the specified period. This will
        allow you to identify individuals who were active during the selected
        years, offering a more focused view of their tenure and contributions.
      </p>

      {/* Form to select a year range */}
      <form onSubmit={fetchCommitteeMembers} className="committee-query-form">
        <div className="input-container">
          <label htmlFor="yearRange">Select Year Range:</label>
          <select
            id="yearRange"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="select-field"
            disabled={loading} // Disable input while loading
          >
            <option value="">--Select Year Range--</option>
            {yearRanges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="committees-btn"
          disabled={loading || !selectedRange}
        >
          {loading ? (
            <ButtonLoader isLoading={loading} message="" size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Loader when fetching data */}
      {loading && (
        <PageLoader isLoading={loading} message="Loading..." size={60} />
      )}

      {/* Display committee members */}
      <section className="committee-card-wrapper">
        {committeeMembers.length > 0
          ? committeeMembers.map((member) => (
              <CommitteeCard key={member._id} data={member} />
            ))
          : !loading && (
              <p className="no-data-message">No committee members found.</p>
            )}
      </section>
    </section>
  );
};

export default ChurchCommittee;
