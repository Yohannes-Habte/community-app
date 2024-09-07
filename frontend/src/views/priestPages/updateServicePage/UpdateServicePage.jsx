import UpdateService from "../../../components/forms/updateService/UpdateService";
import Header from "../../../components/user/layout/header/Header";
import "./UpdateServicePage.scss";

const UpdateServicePage = () => {
  return (
    <main className="service-update-page">
      <Header />
      <section className="service-update-page-container">
      <h1 className="service-update-title"> Update Service </h1>
        <UpdateService />
      </section>
    </main>
  );
};

export default UpdateServicePage;
