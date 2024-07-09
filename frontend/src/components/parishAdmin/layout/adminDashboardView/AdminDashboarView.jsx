
import "./AdminDashboarView.scss";
import AdminDashboardSummary from "../../adminDashboardSummary/AdminDashboardSummary";
import Members from "../../members/Members";
import Committee from "../../committee/Committee";
import Events from "../../events/Events";
import Delegations from "../../delegations/Delegations";
import AdminInBox from "../../inbox/AdminInBox";
import MembersContribution from "../../membersContribution/MembersContribution";
import CommitteeList from "../../committees/Committees";
import ChurchCommittees from "../../committeeList/ChurchCommittees";


const AdminDashboarView = ({ isActive }) => {
  return (
    <article className="admin-dashboard-right-box-wrapper">
      {isActive === 1 && <AdminDashboardSummary />}

      {isActive === 2 && <Members />}

      {isActive === 3 && <CommitteeList />}

      {isActive === 4 && <Committee />}

      {isActive === 5 && <MembersContribution />}

      {isActive === 6 && <Events />}

      {isActive === 7 && <Delegations />}

      {isActive === 8 && <AdminInBox />}

      {isActive === 10 && <ChurchCommittees />}
    </article>
  );
};

export default AdminDashboarView;
