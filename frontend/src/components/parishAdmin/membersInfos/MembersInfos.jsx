import { useDispatch, useSelector } from "react-redux";
import "./MembersInfos.scss";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  clearAllMemberErrors,
  fetchParishioners,
} from "../../../redux/actions/user/userAction";

const MembersInfos = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { parishioners } = useSelector((state) => state.member);

  // Local state variable to track the selected year
  const [year, setYear] = useState("2023");

  useEffect(() => {
    dispatch(fetchParishioners());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllMemberErrors());
    };
  }, [dispatch]);

  // ================================================================
  // Filter parishioners by the selected year
  // ================================================================
  const parishionersForSelectedYear = parishioners.filter(
    (member) => new Date(member.createdAt).getFullYear().toString() === year
  );

  // ================================================================
  // Count members based on their marital status
  // ================================================================
  const totalMembers = parishionersForSelectedYear.length;
  const singleMembers = parishionersForSelectedYear.filter(
    (member) => member.maritalStatus === "Single"
  ).length;
  const marriedMembers = parishionersForSelectedYear.filter(
    (member) => member.maritalStatus === "Married"
  ).length;
  const divorcedMembers = parishionersForSelectedYear.filter(
    (member) => member.maritalStatus === "Divorced"
  ).length;
  const widowedMembers = parishionersForSelectedYear.filter(
    (member) => member.maritalStatus === "Widowed"
  ).length;

  // ================================================================
  // Count members based on their contribution status
  // ================================================================
  const zeroContribution = parishionersForSelectedYear.filter(
    (member) => member.monthlyContributions.length === 0
  ).length;

  const contributionLessThanOrEqualToThree = parishionersForSelectedYear.filter(
    (member) =>
      member.monthlyContributions.length > 0 &&
      member.monthlyContributions.length <= 2
  ).length;

  const contributionGreaterThanThreeAndLessOrEqualToSix =
    parishionersForSelectedYear.filter(
      (member) =>
        member.monthlyContributions.length >= 3 &&
        member.monthlyContributions.length <= 5
    ).length;

  const contributionGreaterThanSixAndLessOrEqualToNine =
    parishionersForSelectedYear.filter(
      (member) =>
        member.monthlyContributions.length >= 6 &&
        member.monthlyContributions.length <= 8
    ).length;

  const contributionGreaterThanNine = parishionersForSelectedYear.filter(
    (member) => member.monthlyContributions.length >= 9
  ).length;

  // ================================================================
  // Function to handle view members
  // ================================================================

  const handleViewMembers = () => {
    navigate("/admin/dashboard");
    setIsActive(5);
  };

  // ================================================================
  // Function to handle form submission
  // ================================================================

  const handleSubmit = (e) => {
    e.preventDefault();
    setYear(e.target.elements.year.value); // Set the selected year
  };

  return (
    <section className="parishioners-information-container">
      <h4 className="parishioners-information-title">
        {" "}
        Parishioners Information{" "}
      </h4>

      <form action="" onSubmit={handleSubmit} className="year-form">
        <input
          type="number"
          name="year"
          defaultValue={2023}
          placeholder="Enter Year only"
          className="year-input-field"
        />
        <button className="year-form-btn">Search</button>
      </form>

      <div className="parishioners-infos-wrapper">
        <aside className="parishioners-status-container">
          <h4 className="parishioners-status-title"> Parishioners </h4>

          <p className="parishioners-status">
            Single: <span>{singleMembers}</span>
          </p>
          <p className="parishioners-status">
            Married: <span>{marriedMembers}</span>
          </p>
          <p className="parishioners-status">
            Divorced: <span>{divorcedMembers}</span>
          </p>

          <p className="parishioners-status">
            Widowed: <span>{widowedMembers}</span>
          </p>

          <p className="parishioners-status">
            Total Members: <span> {totalMembers} </span>
          </p>

          <p className="parishioners-link">
            <button onClick={handleViewMembers} className="view">
              View Parishioners
            </button>
          </p>
        </aside>

        <aside className="parishioners-status-container">
          <h4 className="parishioners-status-title"> Contributed Members </h4>
          <p className="parishioners-status">
            No Contribution: <span>{zeroContribution}</span>
          </p>

          <p className="parishioners-status">
            0 - 3 Months: <span>{contributionLessThanOrEqualToThree}</span>
          </p>
          <p className="parishioners-status">
            4 - 6 Months:{" "}
            <span>{contributionGreaterThanThreeAndLessOrEqualToSix}</span>
          </p>
          <p className="parishioners-status">
            7 - 9 Months:{" "}
            <span>{contributionGreaterThanSixAndLessOrEqualToNine}</span>
          </p>

          <p className="parishioners-status">
            10 - 12 Months: <span>{contributionGreaterThanNine}</span>
          </p>

          <p className="parishioners-link">
            <button onClick={handleViewMembers} className="view">
              View Contributions
            </button>
          </p>
        </aside>
      </div>
    </section>
  );
};

export default MembersInfos;
