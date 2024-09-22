import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { GiCalendarHalfYear } from "react-icons/gi";
import "./Committees.scss";
import { useNavigate } from "react-router-dom";
import CommitteeCard from "../../committees/committeeCard/CommitteeCard";
import AddCommittee from "../../forms/committee/AddCommittee";

const CommitteeList = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const [committees, setCommittees] = useState([]);
  const [startYear, setStartYear] = useState(2022);
  const [endYear, setEndYear] = useState(2023);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openCommittee, setOpenCommittee] = useState(false);

  useEffect(() => {
    fetchCommittees();
  }, [startYear, endYear]);

  const fetchCommittees = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API}/committees/committee?startYear=${startYear}&endYear=${endYear}`
      );
      setCommittees(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCommittees();
    navigate(`/admin/dashboard?startYear=${startYear}&endYear=${endYear}`); // Navigate to new URL
  };

  return (
    <article className="committees-container">
      <h2 className="committees-title">Committee Lists </h2>

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
        By specifying the required details, you will gain a clearer
        understanding of the composition of committee and the impact of members
        during their tenure.
      </p>
      <form onSubmit={handleSubmit} className="committee-query-form">
        <div className="input-container">
          <GiCalendarHalfYear className="icon" />
          <input
            type="number"
            value={startYear}
            onChange={(e) => setStartYear(parseInt(e.target.value))}
            placeholder="Starting Service Year"
            className="input-field"
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
          />
          <label htmlFor="endYear" className="input-label">
            Ending Year
          </label>
          <span className="input-highlight"></span>
        </div>
        <button type="submit" className="committees-btn">
          Search
        </button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {!loading && !error && committees.length !== 0 && (
        <section className="committee-card-wrapper">
          {committees &&
            committees.map((committee) => {
              return <CommitteeCard key={committee._id} data={committee} />;
            })}
        </section>
      )}

      {openCommittee && <AddCommittee setOpenCommittee={setOpenCommittee} />}
    </article>
  );
};

export default CommitteeList;
