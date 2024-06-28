import React, { useState } from 'react';
import './FinacneManagerPage.scss';
import FinanceMgtSidebar from '../../../components/financeManager/financeManagerSidebar/FinanceMgtSidebar';
import FinanceMgtContent from '../../../components/financeManager/financeMgtContent/FinanceMgtContent';

const FinacneManagerPage = () => {
  const [active, setActive] = useState(1);

  return (
    <main className="financial-manager-wrapper">
      <section className="financial-manager-container">
        <h1 className="financial-manager-title">Finance Manager Dashboard</h1>

        <div className="financial-manager-contents">
          <FinanceMgtSidebar active={active} setActive={setActive} />
          <FinanceMgtContent active={active} />
        </div>
      </section>
    </main>
  );
};

export default FinacneManagerPage;
