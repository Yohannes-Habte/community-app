import "./PriestDashboardOverview.scss";
import AllParishioners from "../allParishioners/AllParishioners";
import AllChurchServices from "../allServices/AllChurchServices";
import ChurchCommittee from "../churchCommittee/ChurchCommittee";
import PriestDelegation from "../priestDelegation/PriestDelegation";
import DashboardSummary from "../dashboardSummary/DashboardSummary";
import AllEvents from "../allEvents/AllEvents";

const PriestDashboardOverview = ({ active }) => {
  return (
    <article className="priest-dashboard-overview-wrapper">
      {active === 1 && <DashboardSummary />}

      {active === 2 && <AllParishioners />}

      {active === 3 && <AllChurchServices />}

      {active === 4 && <AllEvents />}

      {active === 5 && <PriestDelegation />}

      {active === 6 && <ChurchCommittee />}
    </article>
  );
};

export default PriestDashboardOverview;
