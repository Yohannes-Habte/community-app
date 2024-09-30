import { useEffect } from "react";
import FinancialReportChart from "../charts/FinancialReportChart";
import { useDispatch, useSelector } from "react-redux";
import {
  allServices,
  clearAllErrors,
} from "../../../redux/actions/service/serviceAction";
import { useNavigate } from "react-router-dom";
import "./AdminDashboardSummary.scss";
import {
  clearAllMemberErrors,
  fetchParishioners,
} from "../../../redux/actions/user/userAction";
import {
  clearAllEventErrors,
  fetchAllEvents,
} from "../../../redux/actions/event/eventAction";

const AdminDashboardSummary = ({ setIsActive }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);
  const { parishioners } = useSelector((state) => state.member);
  const { events } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(allServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchAllEvents());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchParishioners());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllMemberErrors());
    };
  }, [dispatch]);

  /// Categorizing services
  const categorizeServices = (category) => {
    return services.filter(
      (service) => service.serviceCategory.category === category
    );
  };

  // Services by categories
  const sacraments = categorizeServices("Sacraments");
  const spiritualDevelopment = categorizeServices("Spiritual development");
  const soulPrayers = categorizeServices("Soul prayer");

  // Helper function to count service status
  const countServicesByStatus = (category, status) => {
    return category.filter((service) => service.serviceStatus === status)
      .length;
  };

  // Helper function to style service status with font weight bold
  const getStatusStyle = (status) => {
    switch (status) {
      case "completed":
        return { color: "green", fontWeight: "bold", marginLeft: "1rem" };
      case "cancelled":
        return { color: "red", fontWeight: "bold", marginLeft: "1rem" };
      case "pending":
        return { color: "orange", fontWeight: "bold", marginLeft: "1rem" };
      default:
        return { fontWeight: "bold" }; // Default bold if status doesn't match
    }
  };

  // Count events based on their status
  const totalEvents = events.length;
  const pastEvents = events.filter(
    (event) => event.eventStatus === "past"
  ).length;
  const upcomingEvents = events.filter(
    (event) => event.eventStatus === "upcoming"
  ).length;
  const cancelledEvents = events.filter(
    (event) => event.eventStatus === "cancelled"
  ).length;

  // Count members based on their marital status
  const totalMembers = parishioners.length;
  const singleMembers = parishioners.filter(
    (member) => member.maritalStatus === "Single"
  ).length;
  const marriedMembers = parishioners.filter(
    (member) => member.maritalStatus === "Married"
  ).length;
  const divorcedMembers = parishioners.filter(
    (member) => member.maritalStatus === "Divorced"
  ).length;
  const widowedMembers = parishioners.filter(
    (member) => member.maritalStatus === "Widowed"
  ).length;

  // Count members based on their contribution status
  const zeroContribution = parishioners.filter(
    (member) => member.monthlyContributions.length === 0
  ).length;
  const contributionLessThanOrEqualToThree = parishioners.filter(
    (member) =>
      member.monthlyContributions.length > 0 &&
      member.monthlyContributions.length <= 2
  ).length;

  const contributionGreaterThanThreeAndLessOrEqualToSix = parishioners.filter(
    (member) =>
      member.monthlyContributions.length >= 3 &&
      member.monthlyContributions.length <= 5
  ).length;
  const contributionGreaterThanSixAndLessOrEqualToNine = parishioners.filter(
    (member) =>
      member.monthlyContributions.length >= 6 &&
      member.monthlyContributions.length <= 8
  ).length;
  const contributionGreaterThanNine = parishioners.filter(
    (member) => member.monthlyContributions.length >= 9
  ).length;

  console.log("4-6 months =", contributionGreaterThanThreeAndLessOrEqualToSix);

  const handleViewServices = () => {
    navigate("/admin/dashboard");
    setIsActive(12);
  };

  const handleViewMembers = () => {
    navigate("/admin/dashboard");
    setIsActive(5);
  };

  const handleViewEvents = () => {
    navigate("/admin/dashboard");
    setIsActive(8);
  };

  return (
    <section className="admin-dashboard-summary">
      <h2 className="admin-dashboard-summary-title">
        Overview of Church Performance Summary{" "}
      </h2>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {services && services.length === 0 && <p>No services found</p>}
      {!loading && !error && services && services.length !== 0 && (
        <div className="summary-wrapper">
          {/* Sacraments Summary */}
          <aside className="service-aside">
            <h4 className="service-title">Sacraments</h4>
            <p className="service-total-category-count">
              <strong>Total: </strong>
              <span>{sacraments.length}</span>
              <button onClick={handleViewServices} className="view">
                View
              </button>
            </p>
            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(sacraments, "completed")}{" "}
              </span>
            </p>
            <p className="service-status">
              <strong> Pending:</strong>
              <span style={getStatusStyle("pending")}>
                {countServicesByStatus(sacraments, "pending")}
              </span>
            </p>
            <p className="service-status">
              <strong>Cancelled:</strong>
              <span style={getStatusStyle("cancelled")}>
                {countServicesByStatus(sacraments, "cancelled")}
              </span>
            </p>
          </aside>

          {/* Spiritual Development Summary */}
          <aside className="service-aside">
            <h4 className="service-title">Spiritual Development</h4>

            <p className="service-total-category-count">
              <strong>Total: </strong>
              <span>{spiritualDevelopment.length}</span>
              <button onClick={handleViewServices} className="view">
                View
              </button>
            </p>
            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(spiritualDevelopment, "completed")}
              </span>
            </p>
            <p className="service-status">
              <strong> Pending:</strong>
              <span style={getStatusStyle("pending")}>
                {countServicesByStatus(spiritualDevelopment, "pending")}
              </span>
            </p>
            <p className="service-status">
              <strong>Cancelled:</strong>
              <span style={getStatusStyle("cancelled")}>
                {countServicesByStatus(spiritualDevelopment, "cancelled")}
              </span>
            </p>
          </aside>

          {/* Soul Prayers Summary */}
          <aside className="service-aside">
            <h4 className="service-title">Soul Prayers</h4>
            <p className="service-total-category-count">
              <strong>Total: </strong>
              <span> {soulPrayers.length}</span>
              <button onClick={handleViewServices} className="view">
                View
              </button>
            </p>
            <p className="service-status">
              <strong>Completed:</strong>
              <span style={getStatusStyle("completed")}>
                {countServicesByStatus(soulPrayers, "completed")}
              </span>
            </p>
            <p className="service-status">
              <strong> Pending:</strong>
              <span style={getStatusStyle("pending")}>
                {countServicesByStatus(soulPrayers, "pending")}
              </span>
            </p>
            <p className="service-status">
              <strong>Cancelled:</strong>
              <span style={getStatusStyle("cancelled")}>
                {countServicesByStatus(soulPrayers, "cancelled")}
              </span>
            </p>
          </aside>

          <aside className="service-aside">
            <h4 className="service-title"> Church Events </h4>
            <p className="service-total-category-count">
              <strong>Total Events:</strong> {totalEvents}
            </p>
            <p className="service-status">
              Past: <span>{pastEvents}</span>
            </p>

            <p className="service-status">
              Cancelled: <span>{cancelledEvents}</span>
            </p>
            <p className="service-status">
              Upcoming: <span>{upcomingEvents}</span>
            </p>

            <p className="service-link">
              <button onClick={handleViewEvents} className="view">
                View Events
              </button>
            </p>
          </aside>

          <aside className="service-aside">
            <h4 className="service-title"> Parishioners </h4>

            <p className="service-total-category-count">
              Total Members: <span> {totalMembers} </span>
            </p>

            <p className="service-status">
              Single: <span>{singleMembers}</span>
            </p>
            <p className="service-status">
              Married: <span>{marriedMembers}</span>
            </p>
            <p className="service-status">
              Divorced: <span>{divorcedMembers}</span>
            </p>

            <p className="service-status">
              Widowed: <span>{widowedMembers}</span>
            </p>

            <p className="service-link">
              <button onClick={handleViewMembers} className="view">
                View Parishioners
              </button>
            </p>
          </aside>

          <aside className="service-aside">
            <h4 className="service-title"> Contributed Members </h4>
            <p className="service-status">
              No Contribution: <span>{zeroContribution}</span>
            </p>

            <p className="service-status">
              0 - 3 Months: <span>{contributionLessThanOrEqualToThree}</span>
            </p>
            <p className="service-status">
              4 - 6 Months:{" "}
              <span>{contributionGreaterThanThreeAndLessOrEqualToSix}</span>
            </p>
            <p className="service-status">
              7 - 9 Months:{" "}
              <span>{contributionGreaterThanSixAndLessOrEqualToNine}</span>
            </p>

            <p className="service-status">
              10 - 12 Months: <span>{contributionGreaterThanNine}</span>
            </p>

            <p className="service-link">
              <button onClick={handleViewMembers} className="view">
                View Contributions
              </button>
            </p>
          </aside>
        </div>
      )}

      <div>
        <FinancialReportChart />
      </div>
    </section>
  );
};

export default AdminDashboardSummary;
