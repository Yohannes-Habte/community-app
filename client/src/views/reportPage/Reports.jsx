import React from 'react';
import './Reports.scss';
import FetchData from '../../utiles/GlobalClientFunction';
import FinancialReport from '../../components/tables/FinancialReport';
import SacramentReport from '../../components/tables/SacramentReport';

const Reports = () => {
  // Global Functions
  const { data, loading, error, reFetching, deleteData } = FetchData(
    'http://localhost:4500/api/users'
  );

  return (
    <main className="report-page">
      <section className="report-container">
        <h1 className="report-title"> Annual Reports </h1>

        <article className="finance-report">
          <h2 className="title">Financial Report for the Year 2022 and 2023</h2>
          <FinancialReport />
        </article>

        <article className="sacrament-report">
          <h2 className="title">Sacrament Report for the Year 2022 and 2023</h2>
          <SacramentReport />
        </article>
      </section>
    </main>
  );
};

export default Reports;
