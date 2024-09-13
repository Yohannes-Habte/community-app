import "./ReportsPage.scss";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";

const ReportsPage = () => {
  return (
    <main className="report-page">
      <Header />
      <section className="report-page-container">
        <h1 className="report-title"> Annual Reports </h1>

        <article className="finance-report">
          <h2 className="title">Financial Report for the Year 2022 and 2023</h2>
        </article>

        <article className="other-report">
          <h2 className="title">
            Sacrament Service Report for the Year 2022 and 2023
          </h2>
        </article>

        <article className="other-report">
          <h2 className="title">
            Prayer Service Report for the Year 2022 and 2023
          </h2>
        </article>
      </section>

      <Footer />
    </main>
  );
};

export default ReportsPage;
