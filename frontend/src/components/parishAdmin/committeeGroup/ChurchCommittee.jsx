import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { useNavigate } from "react-router-dom";
import "./ChurchCommittee.scss";
import CommitteeCard from "../../committees/committeeCard/CommitteeCard";

const ChurchCommittees = () => {
  const [yearRanges, setYearRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

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
      const { data } = await axios.get(
        `${API}/committees/members/service?startYear=${startYear}&endYear=${endYear}`
      );

      if (data.success) {
        setCommitteeMembers(data.result);
        navigate(`/admin/dashboard?startYear=${startYear}&endYear=${endYear}`);
      } else {
        setError("No committee members found for the selected year range");
      }
    } catch (error) {
      setError("Error fetching committee members");
    }
  };

  return (
    <section className="committee-container">
      <h3 className="committee-title">Committee Members</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <p className="user-information">
        Kindly select a year range from the options below to view the list of
        committee members who served within the specified period. This will
        allow you to identify individuals who were active during the selected
        years, offering a more focused view of their tenure and contributions.{" "}
      </p>

      <form onSubmit={fetchCommitteeMembers} className="committee-query-form">
        <div className="input-container">
          <label htmlFor="yearRange">Select Year Range:</label>
          <select
            id="yearRange"
            value={selectedRange}
            onChange={(e) => setSelectedRange(e.target.value)}
            className="select-field"
          >
            <option value="">--Select Year Range--</option>
            {yearRanges.map((range, index) => (
              <option key={index} value={range}>
                {range}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="committees-btn">
          Search
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
