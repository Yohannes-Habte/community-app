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
        <title>Eritrean Roman Catholic Church Hamburg - Welcome</title>
        <meta
          name="description"
          content="Welcome to the Eritrean Roman Catholic Church in Hamburg. Explore our vibrant community, discover popular services, watch our latest videos, and stay updated on upcoming events."
        />
        <meta
          name="keywords"
          content="Eritrean Roman Catholic Church, Hamburg, Catholic Church Hamburg, Bishops, Popular Services, Latest Events, Catholic Videos"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Eritrean Roman Catholic Church Hamburg - Welcome"
        />
        <meta
          property="og:description"
          content="Join the Eritrean Roman Catholic Church in Hamburg. Discover our services, watch inspiring videos, and learn about the heroic bishops who guide our faith."
        />
        <meta property="og:url" content="https://yourwebsite.com" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/homepage-banner.jpg"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Eritrean Roman Catholic Church Hamburg - Welcome"
        />
        <meta
          name="twitter:description"
          content="Discover the Eritrean Roman Catholic Church in Hamburg. Explore our services, events, and inspiring videos."
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
            "@type": "Organization",
            name: "Eritrean Roman Catholic Church Hamburg",
            url: "https://yourwebsite.com",
            logo: "https://yourwebsite.com/logo.png",
            description:
              "The Eritrean Roman Catholic Church in Hamburg serves as a hub for faith, community, and spiritual growth, offering services, events, and media content to all.",
            sameAs: [
              "https://facebook.com/yourpage",
              "https://twitter.com/yourpage",
              "https://instagram.com/yourpage",
            ],
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
              contactType: "Customer Service",
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
