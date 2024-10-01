import FinancialReportChart from "../charts/FinancialReportChart";
import "./AdminDashboardSummary.scss";
import EventInfos from "../eventDetails/EventInfos";
import MembersInfos from "../membersInfos/MembersInfos";
import ServicesInfos from "../servicesInfos/ServicesInfos";

const AdminDashboardSummary = ({ setIsActive }) => {
  return (
    <section className="admin-dashboard-summary">
      <h2 className="admin-dashboard-summary-title">
        Overview of Church Performance Summary{" "}
      </h2>

      <ServicesInfos setIsActive={setIsActive} />

      <EventInfos setIsActive={setIsActive} />

      <MembersInfos setIsActive={setIsActive} />

      <FinancialReportChart />
    </section>
  );
};

export default AdminDashboardSummary;
