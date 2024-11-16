import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";
import MassList from "../../components/news/masses/MassList";
import LatestEvent from "../../components/latestEvent/LatestEvent";
import "./NewsPage.scss";
import { Helmet } from "react-helmet-async";

const NewsPage = () => {
  return (
    <main className="news-page">
      <Helmet>
        {/* SEO Meta Tags */}
        <title>
          Latest News and Mass Information - Eritrean Catholic Church Hamburg
        </title>
        <meta
          name="description"
          content="Stay updated with the latest parish news, mass schedules, and upcoming events at the Eritrean Roman Catholic Church in Hamburg. Join us for worship and community activities."
        />
        <meta
          name="keywords"
          content="Parish News, Mass Schedule, Eritrean Catholic Church, Hamburg Events, Church Announcements, Catholic Worship, Mass Information"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Latest News and Mass Information - Eritrean Catholic Church Hamburg"
        />
        <meta
          property="og:description"
          content="Explore the latest mass schedules, parish news, and events from the Eritrean Roman Catholic Church in Hamburg."
        />
        <meta property="og:url" content="https://yourwebsite.com/news" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/news-page-banner.jpg"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Latest News and Mass Information - Eritrean Catholic Church Hamburg"
        />
        <meta
          name="twitter:description"
          content="Stay updated with the latest parish news and mass schedules from the Eritrean Catholic Church in Hamburg."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/news-page-banner.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/news" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "News Page",
            description:
              "Discover the latest mass schedules, parish news, and upcoming events at the Eritrean Roman Catholic Church in Hamburg.",
            url: "https://yourwebsite.com/news",
            mainEntity: {
              "@type": "Event",
              name: "Latest Parish Mass Information",
              description:
                "Stay updated with mass schedules, latest news, and upcoming events at the Eritrean Catholic Church in Hamburg.",
              startDate: "2024-11-16", // Example date; dynamically populate this field if possible
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Eritrean Roman Catholic Church Hamburg",
                address: {
                  "@type": "PostalAddress",
                  streetAddress: "Bei Der Reitbahn 3",
                  addressLocality: "Hamburg",
                  postalCode: "22763",
                  addressCountry: "Germany",
                },
              },
            },
          })}
        </script>
      </Helmet>
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
