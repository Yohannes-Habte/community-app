import "./AdminDashboarView.scss";
import AdminDashboardSummary from "../../adminDashboardSummary/AdminDashboardSummary";
import Members from "../../members/Members";
import Committee from "../../committee/Committee";
import Events from "../../events/Events";
import Delegations from "../../delegations/Delegations";
import MembersContribution from "../../membersContribution/MembersContribution";
import CommitteeList from "../../committees/Committees";
import ChurchCommittees from "../../committeeList/ChurchCommittees";
import SubscriberNotification from "../../subscribers/SubscriberNotification";
import ServiceCategories from "../../serviceCategories/ServiceCategories";
import Masses from "../../masses/Masses";
import ChurchServices from "../../services/ChurchServices";

const AdminDashboarView = ({ isActive, setIsActive }) => {
  return (
    <article className="admin-dashboard-right-box-wrapper">
      {isActive === 1 && <AdminDashboardSummary setIsActive={setIsActive} />}

      {isActive === 2 && <Members setIsActive={setIsActive} />}

      {isActive === 3 && <CommitteeList />}

      {isActive === 4 && <Committee />}

      {isActive === 5 && <MembersContribution />}

      {isActive === 6 && <Events setIsActive={setIsActive} />}

      {isActive === 7 && <Delegations />}

      {isActive === 9 && <SubscriberNotification />}

      {isActive === 10 && <ChurchCommittees />}

      {isActive === 11 && <ServiceCategories />}

      {isActive === 12 && <ChurchServices />}

      {isActive === 13 && <Masses />}
    </article>
  );
};

export default AdminDashboarView;
