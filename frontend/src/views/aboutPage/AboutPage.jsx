import "./AboutPage.scss";
import StrategicIntent from "../../components/about/strategicIntent/StrategicIntent";
import ParishPriest from "../../components/about/parishPriest/ParishPriest";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Committees from "../../components/about/committees/Committees";
import { Helmet } from "react-helmet-async";
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
      <Helmet>
        {/* SEO Meta Tags */}
        <title> About Us - Eritrean Roman Catholic Church in Hamburg </title>
        <meta
          name="description"
          content="Discover the mission, vision, and leadership of the Eritrean Roman Catholic Church Parish in Hamburg. Explore our strategic intent, active committees, and meet our dedicated parish priest. Join us in fostering a strong faith-based community."
        />
        <meta
          name="keywords"
          content="Eritrean Roman Catholic Church, Parish Community, Church Mission, Strategic Intent, Church Committees, Parish Priest, Catholic Church, About Us"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Eritrean Roman Catholic Church - About Us"
        />
        <meta
          property="og:description"
          content="Learn more about our parish's mission, committees, and our priest. Join us in fostering faith and community."
        />
        <meta property="og:url" content="https://yourwebsite.com/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/about-page.jpg"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Eritrean Roman Catholic Church - About Us"
        />
        <meta
          name="twitter:description"
          content="Discover the Eritrean Roman Catholic Church Parish. Learn about our mission, committees, and leadership."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/about-page.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/about" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "About Us - Eritrean Roman Catholic Church Hamburg",
            url: "https://yourwebsite.com",
            logo: "https://yourwebsite.com/logo.png",
            description:
              "The Eritrean Roman Catholic Church Parish is committed to faith and community building through strategic initiatives and pastoral care.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Bei Der Reitbahn 3",
              addressLocality: "Hamburg",
              postalCode: "22763",
              addressCountry: "Germany",
            },
          })}
        </script>
      </Helmet>
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
