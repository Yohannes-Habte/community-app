import "./AboutPage.scss";
import Header from "../../components/user/layout/header/Header";
import StrategicIntent from "../../components/about/strategicIntent/StrategicIntent";
import Committees from "../../components/about/committees/Committees";
import ParishPriest from "../../components/about/parishPriest/ParishPriest";
const AboutPage = () => {
  return (
    <main className="about-page">
      <Header />
      <section className="about-page-container">
        <StrategicIntent />

        <ParishPriest />

        <Committees />
      </section>
    </main>
  );
};

export default AboutPage;
