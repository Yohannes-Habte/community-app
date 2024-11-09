import { useState } from 'react';
import './FinanceManagerPage.scss';
import FinanceMgtSidebar from '../../../components/financeManager/financeManagerSidebar/FinanceMgtSidebar';
import FinanceMgtContent from '../../../components/financeManager/financeMgtContent/FinanceMgtContent';
import Footer from '../../../components/layout/footer/Footer';

const FinanceManagerPage = () => {
  const [active, setActive] = useState(1);

  return (
    <main className="financial-manager-page">
      <section className="financial-manager-page-container">
        <h1 className="financial-manager-page-title">Finance Manager Dashboard</h1>

        <div className="financial-manager-contents-wrapper">
          <FinanceMgtSidebar active={active} setActive={setActive} />
          <FinanceMgtContent active={active} />
        </div>
      </section>
      <Footer />  
    </main>
  );
};

export default FinanceManagerPage;
