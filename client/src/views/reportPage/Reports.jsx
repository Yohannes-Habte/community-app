import React from 'react';
import './Reports.scss';
import FetchData from '../../utiles/GlobalClientFunction';
import FinancialReport from '../../components/reportTables/FinancialReport';
import SacramentReport from '../../components/reportTables/SacramentReport';
import PrayerReport from '../../components/reportTables/PrayerReport';
import SpiritualDevelopmentReport from '../../components/reportTables/SpiritualDevelopmentReport';

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

        <article className="other-report">
          <h2 className="title">
            Sacrament Service Report for the Year 2022 and 2023
          </h2>
          <SacramentReport />
        </article>

        <article className="other-report">
          <h2 className="title">
            Prayer Service Report for the Year 2022 and 2023
          </h2>
          <PrayerReport />
        </article>
      </section>
    </main>
  );
};

export default Reports;
