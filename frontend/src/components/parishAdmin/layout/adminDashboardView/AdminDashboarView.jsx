
import "./AdminDashboarView.scss";
import AdminDashboardSummary from "../../adminDashboardSummary/AdminDashboardSummary";
import Members from "../../members/Members";
import Committee from "../../committee/Committee";
import Events from "../../events/Events";
import Delegations from "../../delegations/Delegations";
import AdminInBox from "../../inbox/AdminInBox";
import MembersContribution from "../../membersContribution/MembersContribution";
import Register from "../../../registerForm/Register";

const AdminDashboarView = ({ isActive }) => {
  return (
    <article className="admin-dashboard-right-box-wrapper">
      {isActive === 1 && <AdminDashboardSummary />}

      {isActive === 2 && <Members />}

      {isActive === 3 && <Committee />}

      {isActive === 4 && <MembersContribution />}

      {isActive === 5 && <Events />}

      {isActive === 6 && <Delegations />}

      {isActive === 7 && <AdminInBox />}

      {isActive === 10 && <Register />}
    </article>
  );
};

export default AdminDashboarView;
