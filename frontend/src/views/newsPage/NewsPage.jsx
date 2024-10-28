
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import MassList from "../../components/news/masses/MassList";
import LatestEvent from "../../components/latestEvent/LatestEvent";
import "./NewsPage.scss";

const NewsPage = () => {
  return (
    <main className="news-page">
      <Header />
      <section className="news-page-container">
        <h1 className="news-page-title">Latest Parish Mass Information</h1>

        <MassList />

        <LatestEvent id="latest-event" />
      </section>

      <Footer />
    </main>
  );
};

export default NewsPage;
