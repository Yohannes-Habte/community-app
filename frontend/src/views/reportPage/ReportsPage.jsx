import "./ReportsPage.scss";
import FinancialReport from "../../components/reportTables/FinancialReport";
import SacramentReport from "../../components/reportTables/SacramentReport";
import PrayerReport from "../../components/reportTables/PrayerReport";
import Header from "../../components/user/layout/header/Header";

const ReportsPage = () => {
  return (
    <main className="report-page">
      <Header />
      <section className="report-page-container">
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

export default ReportsPage;
