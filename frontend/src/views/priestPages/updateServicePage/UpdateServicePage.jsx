import UpdateService from "../../../components/forms/updateService/UpdateService";
import Footer from "../../../components/layout/footer/Footer";
import Header from "../../../components/layout/header/Header";
import "./UpdateServicePage.scss";

const UpdateServicePage = () => {
  return (
    <main className="service-update-page">
      <Header />
      <section className="service-update-page-container">
        <h1 className="service-update-title"> Update Service </h1>
        <UpdateService />
      </section>

      <Footer />
    </main>
  );
};

export default UpdateServicePage;
