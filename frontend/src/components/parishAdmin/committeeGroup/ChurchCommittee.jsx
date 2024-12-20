import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ChurchCommittee.scss";
import CommitteeCard from "../../committees/committeeCard/CommitteeCard";
import { Alert } from "@mui/material";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { API } from "../../../utile/security/secreteKey";

const ChurchCommittees = () => {
  const navigate = useNavigate();
  const [yearRanges, setYearRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchYearRanges = async () => {
      try {
        const { data } = await axios.get(`${API}/committees/years`);
        setYearRanges(data.result);
      } catch (error) {
        setError("Error fetching year ranges");
      }
    };

    fetchYearRanges();
  }, []);

  const fetchCommitteeMembers = async (e) => {
    e.preventDefault();
    setCommitteeMembers([]);

    if (!selectedRange) {
      setError("Please select a year range");
      return;
    }

    const [startYear, endYear] = selectedRange.split("-");
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/committees/members/service?startYear=${startYear}&endYear=${endYear}`
      );

      if (data.success) {
        setCommitteeMembers(data.result);
        navigate(`/admin/dashboard?startYear=${startYear}&endYear=${endYear}`);
      } else {
        setError("No committee members found for the selected year range");
      }

      setLoading(false);
    } catch (error) {
      setError("Error fetching committee members");
      setLoading(false);
    }
  };

  return (
    <section className="committee-container">
      <h3 className="committee-title">Committee Members</h3>
      {error && <Alert style={{ color: "red" }}>{error}</Alert>}

      <p className="user-information">
        Kindly select a year range from the options below to view the list of
        committee members who served within the specified period. This will
        allow you to identify individuals who were active during the selected
        years, offering a more focused view of their tenure and contributions.{" "}
      </p>

      <form onSubmit={fetchCommitteeMembers} className="committee-query-form">
        <div className="select-container">
          <select
            id="yearRange"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="select-field"
            aria-label="Year Range Selection"
          >
            <option value="">--Select Year Range--</option>
            {yearRanges.map((range, index) => (
              <option key={index} value={range} className="select-option">
                {range}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="committees-btn" disabled={loading}>
          {loading ? (
            <ButtonLoader isLoading={loading} message="" size={24} />
          ) : (
            "Search"
          )}
        </button>
      </form>

      <section className="committee-card-wrapper">
        {committeeMembers &&
          committeeMembers.length > 0 &&
          committeeMembers.map((member) => {
            return <CommitteeCard key={member._id} data={member} />;
          })}
      </section>
    </section>
  );
};

export default ChurchCommittees;
