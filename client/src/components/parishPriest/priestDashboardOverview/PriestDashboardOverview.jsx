import React from 'react';
import './PriestDashboardOverview.scss';
import AllParishioners from '../allParishioners/AllParishioners';
import AllChurchServices from '../allServices/AllChurchServices';
import AllChurchEvents from '../allChurchEvents/AllChurchEvents';
import ChurchCommittee from '../churchCommittee/ChurchCommittee';
import PriestDelegation from '../priestDelegation/PriestDelegation';
import DashboardSummary from '../dashboardSummary/DashboardSummary';

const PriestDashboardOverview = ({ active }) => {
  return (
    <article className="priest-dashboard-overview-wrapper">
      {active === 1 && <DashboardSummary />}

      {active === 2 && <AllParishioners />}

      {active === 3 && <AllChurchServices />}

      {active === 4 && <PriestDelegation />}

      {active === 5 && <AllChurchEvents />}

      {active === 6 && <ChurchCommittee />}
    </article>
  );
};

export default PriestDashboardOverview;
