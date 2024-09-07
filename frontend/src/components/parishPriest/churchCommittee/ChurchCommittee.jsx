import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
// import { useNavigate } from "react-router-dom";
import CommitteeCard from "../../parishAdmin/committeeCard/CommitteeCard";
import "./ChurchCommittee.scss";

const ChurchCommittee = () => {
  const [yearRanges, setYearRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState("");
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [error, setError] = useState("");
  // const navigate = useNavigate();

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
        // navigate(`/admin/dashboard?startYear=${startYear}&endYear=${endYear}`);
      } else {
        setError("No committee members found for the selected year range");
      }
    } catch (error) {
      setError("Error fetching committee members");
    }
  };

  return (
    <section className="committees-container">
      <h3 className="committees-title">Committee Members</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}

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
        {committeeMembers && committeeMembers.length > 0 ? (
          committeeMembers.map((member) => {
            return <CommitteeCard key={member._id} data={member} />;
          })
        ) : (
          <p>No members found</p>
        )}
      </section>
    </section>
  );
};

export default ChurchCommittee;
