import React from 'react';
import './DashboardSummary.scss';

const DashboardSummary = () => {
  return (
    <section>
      <h2> Dashboard Summary</h2>
      <div className="wrapper">
        <article>
          <aside>
            <h3>Parishioners</h3>
            <p> Counts </p>
            <p>pie Chart</p>
            <p>Link to</p>
          </aside>

          <aside>
            <h3>Sacraments</h3>
            <p> Counts </p>
            <p>pie Chart</p>
            <p>pie Chart</p>
            <p>Link to</p>
          </aside>

          <aside>
            <h3>Prayers</h3>
            <p> Counts </p>
            <p>pie Chart</p>
            <p>Link to</p>
          </aside>

          <aside>
            <h3>Spiritual Development</h3>
            <p> Counts </p>
            <p>pie Chart</p>
            <p>Link to</p>
          </aside>

          <aside>
            <h3>Priest Delegation</h3>
            <p> Counts </p>
            <p>pie Chart</p>
            <p>Link to</p>
          </aside>
        </article>
      </div>
    </section>
  );
};

export default DashboardSummary;
