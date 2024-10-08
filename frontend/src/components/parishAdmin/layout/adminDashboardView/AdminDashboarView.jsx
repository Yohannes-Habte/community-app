import "./AdminDashboarView.scss";
import AdminDashboardSummary from "../../adminDashboardSummary/AdminDashboardSummary";
import Members from "../../members/Members";
import Events from "../../events/Events";
import Delegations from "../../delegations/Delegations";
import MembersContribution from "../../membersContribution/MembersContribution";
import CommitteeList from "../../committees/Committees";
import ChurchCommittee from "../../committeeGroup/ChurchCommittee";
import SubscriberNotification from "../../subscribers/SubscriberNotification";
import ServiceCategories from "../../serviceCategories/ServiceCategories";
import Masses from "../../masses/Masses";
import ChurchServices from "../../services/ChurchServices";
import VideoUpload from "../../videoUpload/VideoUpload";

const AdminDashboarView = ({ isActive, setIsActive }) => {
  return (
    <article className="admin-dashboard-right-box-wrapper">
      {isActive === 1 && <AdminDashboardSummary setIsActive={setIsActive} />}

      {isActive === 2 && <Members setIsActive={setIsActive} />}

      {isActive === 3 && <CommitteeList />}

      {isActive === 4 && <ChurchCommittee />}

      {isActive === 5 && <MembersContribution />}

      {isActive === 6 && <Masses />}

      {isActive === 7 && <Delegations />}

      {isActive === 8 && <Events setIsActive={setIsActive} />}

      {isActive === 9 && <ServiceCategories />}

      {isActive === 10 && <ChurchServices setIsActive={setIsActive} />}

      {isActive === 11 && <SubscriberNotification />}

      {isActive === 12 && <VideoUpload />}
    </article>
  );
};

export default AdminDashboarView;
