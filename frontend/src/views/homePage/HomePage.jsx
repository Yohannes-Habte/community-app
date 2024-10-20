import "./HomePage.scss";
import Bishops from "../../components/bishopsSlider/Bishops";
import PopularServices from "../../components/services/popularServices/PopularServices";
import BraveBishops from "../../components/braveBishops/BraveBishops";
import LatestEvent from "../../components/latestEvent/LatestEvent";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import LastVideo from "../../components/video/LastVideo";

const HomePage = () => {
  return (
    <main className="home-page">
      <Header />
      <section className="home-page-container">
        <h1 className="title"> Eritrean Roman Catholic Church in Hamburg </h1>
        <Bishops />

        <LastVideo />

        <PopularServices />
        <BraveBishops />
        <LatestEvent />
      </section>
      <Footer />
    </main>
  );
};

export default HomePage;
