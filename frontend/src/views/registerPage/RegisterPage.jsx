import Register from "../../components/forms/createAccount/Register";
import Footer from "../../components/layout/footer/Footer";
import "./RegisterPage.scss";
import { Helmet } from "react-helmet-async";

const RegisterPage = () => {
  return (
    <main className="register-page">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <section className="register-container">
        <h1 className="user-register-title"> Create an Account for Free</h1>

        <Register />
      </section>

      <Footer />
    </main>
  );
};

export default RegisterPage;
