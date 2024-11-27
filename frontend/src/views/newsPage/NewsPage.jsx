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
        <title>News & Mass Schedule | Eritrean Catholic Church Hamburg</title>
        <meta
          name="description"
          content="Stay updated with the latest parish news, mass schedules, and upcoming events at the Eritrean Catholic Church in Hamburg. Join us for worship and community activities."
        />
        <meta
          name="keywords"
          content="Parish News, Mass Schedule, Eritrean Catholic Church Hamburg, Catholic Worship, Church Announcements"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        {/* Open Graph Metadata  */}

        <meta
          property="og:title"
          content="News & Mass Schedule | Eritrean Catholic Church Hamburg"
        />
        <meta
          property="og:description"
          content="Find the latest updates on mass schedules, parish news, and upcoming events at the Eritrean Catholic Church in Hamburg."
        />
        <meta property="og:url" content="https://yourwebsite.com/news" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/news-page-banner.jpg"
        />

        {/* Twitter Card Metadata */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="News & Mass Schedule | Eritrean Catholic Church Hamburg"
        />
        <meta
          name="twitter:description"
          content="Stay updated on parish news, mass schedules, and events."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/news-page-banner.jpg"
        />

        {/* Canonical link */}

        <link rel="canonical" href="https://yourwebsite.com/news" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "News Page",
            description:
              "Stay informed about parish news, mass schedules, and events at the Eritrean Catholic Church in Hamburg.",
            url: "https://yourwebsite.com/news",
            mainEntity: {
              "@type": "Event",
              name: "Latest Mass Information",
              description:
                "Get the latest mass schedules and upcoming parish events.",
              startDate: "2024-11-16",
              eventAttendanceMode:
                "https://schema.org/OfflineEventAttendanceMode",
              eventStatus: "https://schema.org/EventScheduled",
              location: {
                "@type": "Place",
                name: "Eritrean Catholic Church Hamburg",
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
