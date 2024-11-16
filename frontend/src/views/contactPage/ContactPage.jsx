import "./ContactPage.scss";
import { Helmet } from "react-helmet-async";
import ContactTools from "../../components/contact/contactPageTools/ContactTools";
import ContactForm from "../../components/contact/contactPageForm/ContactForm";
import Header from "../../components/layout/header/Header";
import Footer from "../../components/layout/footer/Footer";

const ContactPage = () => {
  return (
    <main className="contact-page">
      <Helmet>
        {/* SEO Meta Tags */}
        <title>Contact Us - Eritrean Roman Catholic Church Hamburg</title>
        <meta
          name="description"
          content="Get in touch with the Eritrean Roman Catholic Church in Hamburg. Use our contact form or tools to reach us for inquiries, support, or prayer requests."
        />
        <meta
          name="keywords"
          content="Contact Eritrean Roman Catholic Church, Hamburg Church Contact, Church Inquiries, Prayer Requests, Community Support"
        />
        <meta name="author" content="Habtemariam Yohannes" />

        {/* Open Graph Meta Tags */}
        <meta
          property="og:title"
          content="Contact Us - Eritrean Roman Catholic Church Hamburg"
        />
        <meta
          property="og:description"
          content="Reach out to the Eritrean Roman Catholic Church in Hamburg for inquiries, support, or spiritual guidance. We're here to assist."
        />
        <meta property="og:url" content="https://yourwebsite.com/contact" />
        <meta property="og:type" content="website" />
        <meta
          property="og:image"
          content="https://yourwebsite.com/images/contact-page-banner.jpg"
        />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Contact Us - Eritrean Roman Catholic Church Hamburg"
        />
        <meta
          name="twitter:description"
          content="Get in touch with the Eritrean Roman Catholic Church in Hamburg. Use our contact form or tools to reach us."
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/images/contact-page-banner.jpg"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://yourwebsite.com/contact" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us",
            description:
              "Contact the Eritrean Roman Catholic Church in Hamburg for inquiries, prayer requests, or community support.",
            url: "https://yourwebsite.com/contact",
            mainEntity: {
              "@type": "Organization",
              name: "Eritrean Roman Catholic Church Hamburg",
              url: "https://yourwebsite.com",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+49-123-456-789",
                contactType: "Customer Service",
                areaServed: "DE",
                availableLanguage: ["English", "German", "Tigrinya"],
              },
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
      <section className="contact-page-container">
        <h1 className="contact-page-title"> {"We'd Love to Hear From You"} </h1>

        <div className="tools-form-wrapper">
          <ContactTools />
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default ContactPage;
