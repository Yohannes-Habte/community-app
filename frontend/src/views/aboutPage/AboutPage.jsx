import "./AboutPage.scss";
import StrategicIntent from "../../components/about/strategicIntent/StrategicIntent";
import Committees from "../../components/about/committees/Committees";
import ParishPriest from "../../components/about/parishPriest/ParishPriest";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
const AboutPage = () => {
  return (
    <main className="about-page">
      <Header />
      <section className="about-page-container">
        <StrategicIntent />

        <ParishPriest />

        <Committees />
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
