import "./PriestDashboardOverview.scss";
import AllParishioners from "../allParishioners/AllParishioners";
import AllChurchServices from "../allServices/AllChurchServices";
import ChurchCommittee from "../churchCommittee/ChurchCommittee";
import DashboardSummary from "../dashboardSummary/DashboardSummary";
import AllEvents from "../allEvents/AllEvents";
import AllDelegations from "../allDelegations/AllDelegations";

const PriestDashboardOverview = ({ active, setActive }) => {
  return (
    <article className="priest-dashboard-overview-wrapper">
      {active === 1 && <DashboardSummary setActive={setActive} />}

      {active === 2 && <AllParishioners />}

      {active === 3 && <AllChurchServices setActive={setActive} />}

      {active === 4 && <AllEvents />}

      {active === 5 && <AllDelegations />}

      {active === 6 && <ChurchCommittee />}
    </article>
  );
};

export default PriestDashboardOverview;
