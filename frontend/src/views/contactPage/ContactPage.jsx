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
        <title>Contact</title>
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
