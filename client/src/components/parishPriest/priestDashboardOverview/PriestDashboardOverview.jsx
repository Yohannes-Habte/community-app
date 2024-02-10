import React from 'react';
import AllParishioners from '../allParishioners/AllParishioners';
import AllChurchServices from '../allServices/AllChurchServices';
import NewPriest from '../newPriest/NewPriest';
import AllChurchEvents from '../allChurchEvents/AllChurchEvents';
import ChurchCommittee from '../churchCommittee/ChurchCommittee';

const PriestDashboardOverview = ({ active }) => {
  return (
    <article>
      {active === 1 && (
        <section className="parish-priest-dashboard-overview">
          <h1>Parish Priest Dashboard Overview</h1>
        </section>
      )}

      {active === 2 && <AllParishioners />}

      {active === 3 && <AllChurchServices />}

      {active === 4 && <NewPriest />}

      {active === 5 && <AllChurchEvents />}

      {active === 6 && <ChurchCommittee />}
    </article>
  );
};

export default PriestDashboardOverview;
