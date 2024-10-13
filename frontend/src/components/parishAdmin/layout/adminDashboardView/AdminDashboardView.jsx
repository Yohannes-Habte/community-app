import "./AdminDashboardView.scss";
import AdminDashboardSummary from "../../adminDashboardSummary/AdminDashboardSummary";
import Members from "../../members/Members";
import Events from "../../events/Events";
import Delegations from "../../delegations/Delegations";
import CommitteeList from "../../committees/Committees";
import ChurchCommittee from "../../committeeGroup/ChurchCommittee";
import SubscriberNotification from "../../subscribers/SubscriberNotification";
import ServiceCategories from "../../serviceCategories/ServiceCategories";
import Masses from "../../masses/Masses";
import ChurchServices from "../../services/ChurchServices";
import VideoUpload from "../../videoUpload/VideoUpload";

const AdminDashboardView = ({ isActive, setIsActive }) => {
  return (
    <article className="admin-dashboard-right-box-wrapper">
      {isActive === 1 && <AdminDashboardSummary setIsActive={setIsActive} />}

      {isActive === 2 && <Members setIsActive={setIsActive} />}

      {isActive === 3 && <CommitteeList />}

      {isActive === 4 && <ChurchCommittee />}

      {isActive === 5 && <Masses />}

      {isActive === 6 && <Delegations />}

      {isActive === 7 && <Events setIsActive={setIsActive} />}

      {isActive === 8 && <ServiceCategories />}

      {isActive === 9 && <ChurchServices setIsActive={setIsActive} />}

      {isActive === 10 && <SubscriberNotification />}

      {isActive === 11 && <VideoUpload />}
    </article>
  );
};

export default AdminDashboardView;
