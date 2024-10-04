import "./NewsPage.scss";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import MassList from "../../components/news/masses/MassList";
import LatestEvent from "../../components/latestEvent/LatestEvent";
import { useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";

const NewsPage = () => {
  const eventRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // If the URL contains the hash #latest-event, scroll to the LatestEvent section
    if (location.hash === "#latest-event") {
      eventRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]); // Re-run when location changes

  return (
    <main className="report-page">
      <Header />
      <section className="report-page-container">
      <h1 className="report-title">Latest Parish Information</h1>

        <MassList />

        {/* Use ref to allow scrolling to this element */}
        <LatestEvent id="latest-event" ref={eventRef} />
      </section>

      <Footer />
    </main>
  );
};

export default NewsPage;
