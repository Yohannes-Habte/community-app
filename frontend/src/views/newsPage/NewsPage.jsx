import "./NewsPage.scss";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import MassList from "../../components/news/masses/MassList";
import LatestEvent from "../../components/latestEvent/LatestEvent";

const NewsPage = () => {
  return (
    <main className="report-page">
      <Header />
      <section className="report-page-container">
        <h1 className="report-title">Latest Parish Information</h1>

        <MassList />

        <LatestEvent id="latest-event" />
      </section>

      <Footer />
    </main>
  );
};

export default NewsPage;
