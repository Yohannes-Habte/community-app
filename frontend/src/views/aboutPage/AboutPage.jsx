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
        <title>About Us | Eritrean Catholic Church Hamburg</title>
        <meta
          name="description"
          content="Learn about the Eritrean Catholic Church's mission, leadership, and strategic vision. Meet our Parish Priest and explore active committees in Hamburg."
        />
        <meta
          name="keywords"
          content="Eritrean Catholic Church Hamburg, Parish Mission, Parish Leadership, Parish Priest, Church Committees"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        <meta
          property="og:title"
          content="About Us | Eritrean Catholic Church Hamburg"
        />
        <meta
          property="og:description"
          content="Discover our mission, meet our leadership, and learn about the committees that build our community in Hamburg."
        />
        <meta property="og:url" content="https://yourwebsite.com/about" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/about-page.jpg"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About Us | Eritrean Catholic Church Hamburg"
        />
        <meta
          name="twitter:description"
          content="Meet the Parish Priest, explore our mission, and learn about our committees."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/about-page.jpg"
        />

        <link rel="canonical" href="https://yourwebsite.com/about" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Eritrean Catholic Church Hamburg",
            url: "https://yourwebsite.com",
            logo: "https://yourwebsite.com/logo.png",
            description:
              "Explore our mission, vision, and leadership. Meet the Parish Priest and learn about the active committees of our church.",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Bei Der Reitbahn 3",
              addressLocality: "Hamburg",
              postalCode: "22763",
              addressCountry: "Germany",
            },
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+49-123-456-789",
              contactType: "General Inquiry",
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
