import "./HomePage.scss";
import Bishops from "../../components/bishopsSlider/Bishops";
import PopularServices from "../../components/services/popularServices/PopularServices";
import BraveBishops from "../../components/braveBishops/BraveBishops";
import LatestEvent from "../../components/latestEvent/LatestEvent";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import LastVideo from "../../components/video/LastVideo";
import { Helmet } from "react-helmet-async";

const HomePage = () => {
  return (
    <main className="home-page">
      <Helmet>
        {/* SEO Meta Tags */}

        <title>
          Welcome to Eritrean Catholic Church Hamburg | Faith & Community
        </title>
        <meta
          name="description"
          content="Join the vibrant Eritrean Catholic Church community in Hamburg. Explore our services, events, inspiring videos, and mission to strengthen faith and fellowship."
        />
        <meta
          name="keywords"
          content="Eritrean Catholic Church Hamburg, Church Community, Catholic Worship, Parish Events, Inspirational Videos"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        {/* Open Graph Metadata  */}
        <meta
          property="og:title"
          content="Welcome to Eritrean Catholic Church Hamburg"
        />
        <meta
          property="og:description"
          content="Discover our vibrant community, services, and inspiring videos. Join us in building a strong faith-based community in Hamburg."
        />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/homepage-banner.jpg"
        />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Welcome to Eritrean Catholic Church Hamburg"
        />
        <meta
          name="twitter:description"
          content="Explore our services, events, and inspirational content in Hamburg."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/homepage-banner.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Home Page",
            description:
              "Discover the Eritrean Catholic Church in Hamburg. Explore our services, events, and inspiring community activities.",
            url: "https://yourwebsite.com",
            mainEntity: {
              "@type": "Organization",
              name: "Eritrean Catholic Church Hamburg",
              url: "https://yourwebsite.com",
              logo: "https://yourwebsite.com/logo.png",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Bei Der Reitbahn 3",
                addressLocality: "Hamburg",
                postalCode: "22763",
                addressCountry: "Germany",
              },
            },
          })}
        </script>
      </Helmet>

      <Header />
      <section className="home-page-container">
        <h1 className="home-page-title">
          Eritrean Roman Catholic Church in Hamburg
        </h1>
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
