import { useDispatch, useSelector } from "react-redux";
import "./MembersInfos.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import {
  clearAllMemberErrors,
  fetchParishioners,
} from "../../../redux/actions/user/userAction";
import { Alert } from "@mui/material";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const MembersInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parishioners, loading, error } = useSelector((state) => state.member);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [isButtonLoading, setIsButtonLoading] = useState(false);
  const [formError, setFormError] = useState(null);


  useEffect(() => {
    dispatch(fetchParishioners());

    return () => {
      dispatch(clearAllMemberErrors());
    };
  }, [dispatch]);

  // Filter parishioners by the selected year
  const parishionersForSelectedYear = useMemo(() => {
    return parishioners?.filter(
      (member) => new Date(member.createdAt).getFullYear().toString() === year
    );
  }, [parishioners, year]);

  // Count members based on criteria
  const countByCriteria = (arr, criteria) => arr.filter(criteria).length;

  const totalMembers = parishionersForSelectedYear?.length || 0;
  const singleMembers = countByCriteria(
    parishionersForSelectedYear,
    (member) => member.maritalStatus === "single"
  );
  const marriedMembers = countByCriteria(
    parishionersForSelectedYear,
    (member) => member.maritalStatus === "married"
  );
  const divorcedMembers = countByCriteria(
    parishionersForSelectedYear,
    (member) => member.maritalStatus === "divorced"
  );
  const widowedMembers = countByCriteria(
    parishionersForSelectedYear,
    (member) => member.maritalStatus === "widowed"
  );

  const zeroContribution = countByCriteria(
    parishionersForSelectedYear,
    (member) => member.monthlyContributions?.length === 0
  );
  const contributionLessThanOrEqualToThree = countByCriteria(
    parishionersForSelectedYear,
    (member) =>
      member.monthlyContributions?.length > 0 &&
      member.monthlyContributions.length <= 2
  );
  const contributionGreaterThanThreeAndLessOrEqualToSix = countByCriteria(
    parishionersForSelectedYear,
    (member) =>
      member.monthlyContributions?.length >= 3 &&
      member.monthlyContributions.length <= 5
  );
  const contributionGreaterThanSixAndLessOrEqualToNine = countByCriteria(
    parishionersForSelectedYear,
    (member) =>
      member.monthlyContributions?.length >= 6 &&
      member.monthlyContributions.length <= 8
  );
  const contributionGreaterThanNine = countByCriteria(
    parishionersForSelectedYear,
    (member) => member.monthlyContributions?.length >= 9
  );

  // Validate the form submission year
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(null); // Reset any previous errors

    const selectedYear = e.target.elements.year.value;
    const currentYear = new Date().getFullYear();

    if (
      isNaN(selectedYear) ||
      selectedYear < 2022 ||
      selectedYear > currentYear
    ) {
      setFormError(`Please enter a valid year between 2022 and ${currentYear}`);
    } else {
      setYear(selectedYear);
    }
  };

  // Navigate to the dashboard and set the active tab
  const handleViewMembers = () => {
    setIsButtonLoading(true);
    navigate("/admin/dashboard");
    setIsActive(2);
    setIsButtonLoading(false);
  };

  return (
    <section className="parishioners-information-container">
      <h4 className="parishioners-information-title">
        Parishioners Information - {year}
      </h4>

      <form onSubmit={handleSubmit} className="parishioners-year-form">
        <label htmlFor="year" className="label">
          Enter Year
        </label>
        <input
          type="number"
          id="year"
          name="year"
          defaultValue={year}
          placeholder="Enter Year"
          className="input-field"
          aria-label="Enter year for parishioners information"
        />
        <button
          type="submit"
          className="year-form-btn"
          disabled={isButtonLoading}
        >
          {isButtonLoading ? (
            <ButtonLoader isLoading={isButtonLoading} message="" />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {formError && (
        <Alert severity="error" className="error-message">
          {formError}
        </Alert>
      )}

      {/* Loading and Error States */}
      {loading && <PageLoader isLoading={loading} message="" size={80} />}
      {error && (
        <Alert className="error-message" role="alert">
          An error occurred: {error}
        </Alert>
      )}

      <div className="parishioners-infos-wrapper">
        <aside className="parishioners-status-container">
          <h4 className="parishioners-status-title">Parishioners</h4>
          <p className="parishioners-status">
            Single: <span className="span-count">{singleMembers}</span>
          </p>
          <p className="parishioners-status">
            Married: <span className="span-count">{marriedMembers}</span>
          </p>
          <p className="parishioners-status">
            Divorced: <span className="span-count">{divorcedMembers}</span>
          </p>
          <p className="parishioners-status">
            Widowed: <span className="span-count">{widowedMembers}</span>
          </p>
          <p className="parishioners-status">
            Total: <span className="span-count">{totalMembers}</span>
          </p>
          <p className="parishioners-link">
            <button
              onClick={handleViewMembers}
              className="view"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? "Loading..." : "View Parishioners"}
            </button>
          </p>
        </aside>

        {/* Contribution Information */}
        <aside className="parishioners-status-container">
          <h4 className="parishioners-status-title">Contributed Members</h4>
          <p className="parishioners-status">
            0 - Month: <span className="span-count">{zeroContribution}</span>
          </p>
          <p className="parishioners-status">
            1 - 3 Months:{" "}
            <span className="span-count">
              {contributionLessThanOrEqualToThree}
            </span>
          </p>
          <p className="parishioners-status">
            4 - 6 Months:{" "}
            <span className="span-count">
              {contributionGreaterThanThreeAndLessOrEqualToSix}
            </span>
          </p>
          <p className="parishioners-status">
            7 - 9 Months:{" "}
            <span className="span-count">
              {contributionGreaterThanSixAndLessOrEqualToNine}
            </span>
          </p>
          <p className="parishioners-status">
            10 - 12 Months:{" "}
            <span className="span-count">{contributionGreaterThanNine}</span>
          </p>
          <p className="parishioners-link">
            <button
              onClick={handleViewMembers}
              className="view"
              disabled={isButtonLoading}
            >
              {isButtonLoading ? "Loading..." : "View Contributions"}
            </button>
          </p>
        </aside>
      </div>
    </section>
  );
};

export default MembersInfos;
