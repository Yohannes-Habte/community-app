import { useState, useEffect } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { GiCalendarHalfYear } from "react-icons/gi";
import "./Committees.scss";
import CommitteeCard from "../committeeCard/CommitteeCard";

const CommitteeList = () => {
  const [committees, setCommittees] = useState([]);
  const [startYear, setStartYear] = useState(2022); // Default start year
  const [endYear, setEndYear] = useState(2023); // Default end year

  useEffect(() => {
    fetchCommittees();
  }, []); // Fetch data on initial component mount

  const fetchCommittees = async () => {
    try {
      const response = await axios.get(
        `${API}/committees/committee?startYear=${startYear}&endYear=${endYear}`
      );
      setCommittees(response.data);
    } catch (error) {
      console.error("Error fetching committees:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchCommittees();
  };

  return (
    <article className="committees-container">
      <h2 className="committees-title">Committee Lists </h2>
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
          Get Committee
        </button>
      </form>
      <section className="committee-card-wrapper">
        {committees &&
          committees.map((committee) => {
            return <CommitteeCard key={committee._id} data={committee} />;
          })}
      </section>
    </article>
  );
};

export default CommitteeList;
