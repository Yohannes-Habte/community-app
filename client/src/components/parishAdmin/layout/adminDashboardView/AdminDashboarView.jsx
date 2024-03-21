import React from 'react';
import "./AdminDashboarView.scss"
import AdminDashboardSummary from '../../adminDashboardSummary/AdminDashboardSummary';
import Members from '../../members/Members';
import Committee from '../../committee/Committee';
import Contribution from '../../contribution/Contribution';
import Events from '../../events/Events';
import Delegations from '../../delegations/Delegations';
import AdminInBox from '../../inbox/AdminInBox';

const AdminDashboarView = ({ isActive }) => {
  return (
    <article className="admin-dashboard-right-box-wrapper">
      {isActive === 1 && <AdminDashboardSummary />}

      {isActive === 2 && <Members />}

      {isActive === 3 && <Committee />}

      {isActive === 4 && <Contribution />}

      {isActive === 5 && <Events />}

      {isActive === 6 && <Delegations />}

      {isActive === 7 && <AdminInBox />}
    </article>
  );
};

export default AdminDashboarView;
