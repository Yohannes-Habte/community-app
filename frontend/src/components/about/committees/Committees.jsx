import { useEffect, useState } from "react";
import "./Committees.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import CommitteeCard from "../../committees/committeeCard/CommitteeCard";
import { API } from "../../../utile/security/secreteKey";

const Committees = () => {
  // Local variables
  const [yearRanges, setYearRanges] = useState([]);
  const [selectedRange, setSelectedRange] = useState("2022-2023"); // Set default value
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch year ranges on component mount
  useEffect(() => {
    const fetchYearRanges = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/committees/years`);
        setYearRanges(data.result);
        setLoading(false);
      } catch (error) {
        setError("Error fetching year ranges");
        toast.error(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    fetchYearRanges();
  }, []);

  // Fetch committee members based on selected or default year range
  const fetchCommitteeMembers = async (range) => {
    setCommitteeMembers([]);
    setError(""); // Clear any previous error

    const [startYear, endYear] = range.split("-");
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${API}/committees/members/service?startYear=${startYear}&endYear=${endYear}`
      );

      if (data.success) {
        setCommitteeMembers(data.result);
        navigate(`/about?startYear=${startYear}&endYear=${endYear}`);
      } else {
        setError("No committee members found for the selected year range");
      }
    } catch (error) {
      setError("Error fetching committee members");
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Always set loading to false at the end
    }
  };

  // Fetch committee members when the component loads and when the year range changes
  useEffect(() => {
    if (selectedRange) {
      fetchCommitteeMembers(selectedRange); // Automatically fetch for default or selected year
    }
  }, [selectedRange]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedRange) {
      await fetchCommitteeMembers(selectedRange); // Fetch based on selected range
    }
  };

  return (
    <article className="committee-members">
      <h3 className="committee-title">Committee Members</h3>

      <p className="select-year-range-information">
        To view information about the ERCCH committee members, please select a
        year range from the options provided. Upon selection, detailed
        information regarding the committee members for the chosen year will be
        displayed.
      </p>

      <section className="select-year-range-form-container">
        <h3 className="year-range-title">Select Year Range</h3>

        <form onSubmit={handleSubmit} className="select-year-range-form">
          <div className="input-container">
            <label htmlFor="yearRange">Select Year Range:</label>
            <select
              id="yearRange"
              value={selectedRange}
              onChange={(e) => setSelectedRange(e.target.value)}
              className="input-field"
            >
              <option value="">--Select Year Range--</option>
              {yearRanges.map((range, index) => (
                <option key={index} value={range}>
                  {range}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="fetch-committee-btn">
            Search
          </button>
        </form>
      </section>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && committeeMembers.length !== 0 && (
        <section className="committees-card-wrapper">
          {committeeMembers && committeeMembers.length > 0 ? (
            committeeMembers.map((member) => {
              return <CommitteeCard key={member._id} data={member} />;
            })
          ) : (
            <p>No members found</p>
          )}
        </section>
      )}
    </article>
  );
};

export default Committees;
