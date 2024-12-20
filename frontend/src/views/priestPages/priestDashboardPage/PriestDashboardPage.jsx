import { useState } from 'react';
import './PriestDashboardPage.scss';
import PriestDashboardHeader from '../../../components/parishPriest/layout/priestHeader/PriestDashboardHeader';
import PriestDashboardSidebar from '../../../components/parishPriest/layout/priestSidebar/PriestDashboardSidebar';
import PriestDashboardOverview from '../../../components/parishPriest/priestDashboardOverview/PriestDashboardOverview';
import Footer from '../../../components/layout/footer/Footer';

const PriestDashboardPage = () => {
  const [active, setActive] = useState(1);

  return (
    <main className="parish-priest-dashboard-page">
      <PriestDashboardHeader active={active} setActive={setActive} />

      <section className="parish-priest-dashboard-page-container">
        <h1 className="parish-priest-dashboard-page-title">
          Parish Priest Dashboard
        </h1>

        <div className="parish-priest-dashboard-wrapper">
          <PriestDashboardSidebar active={active} setActive={setActive} />
          <PriestDashboardOverview active={active} setActive={setActive} />
        </div>
      </section>
      <Footer />  
    </main>
  );
};

export default PriestDashboardPage;
