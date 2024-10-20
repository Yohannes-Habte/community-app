import "./AboutPage.scss";
import StrategicIntent from "../../components/about/strategicIntent/StrategicIntent";
import ParishPriest from "../../components/about/parishPriest/ParishPriest";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Committees from "../../components/about/committees/Committees";
const AboutPage = () => {
  /**
 To navigate directly to the Committee or priest section on the About Page when clicking on the Committee or Priest link in the Footer Component, you can use React's useRef and useEffect hooks along with the Link component from react-router-dom. The idea is to scroll to the specific section (i.e., the Committee component) on the page after navigation.

 Steps:
      1. Set up an ID for the Committee section on the About Page to target it.
      2. Use URL hash navigation to navigate to that section when the Committee link is clicked.
      3. Scroll to the section using useRef once the page is loaded.
 */
  const committeeRef = useRef(null); // Ref for Committees section
  const priestRef = useRef(null); // Ref for Parish Priest section
  const location = useLocation(); // To get the current URL location

  useEffect(() => {
    // Scroll to the relevant section based on URL hash
    if (location.hash === "#committee") {
      committeeRef.current?.scrollIntoView({ behavior: "smooth" });
    } else if (location.hash === "#priest") {
      priestRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <main className="about-page">
      <Header />
      <section className="about-page-container">
        <StrategicIntent />

        {/* Assign ref to ParishPriest section */}
        <div ref={priestRef}>
          <ParishPriest />
        </div>

        {/* Assign ref to Committees section */}
        <div ref={committeeRef}>
          <Committees />
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AboutPage;
