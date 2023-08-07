import React from 'react';
import './Reports.scss';
import FetchData from '../../utiles/GlobalClientFunction';

const Reports = () => {
  const { data } = FetchData(
    'http://localhost:4500/api/users/ideee'
  );

  return (
    <main className="report-page">
      <section className="report-container">
        <h1 className="report-title"> Annual Report </h1>
        <p> {data} </p>
      </section>
    </main>
  );
};

export default Reports;
