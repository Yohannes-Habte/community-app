import "./ReportsPage.scss";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import MassList from "../../components/news/masses/MassList";
import LatestEvent from "../../components/latestEvent/LatestEvent";

const ReportsPage = () => {
  return (
    <main className="report-page">
      <Header />
      <section className="report-page-container">
        <h1 className="report-title">Current Status Report</h1>

        <MassList />

        <LatestEvent />
      </section>

      <Footer />
    </main>
  );
};

export default ReportsPage;
