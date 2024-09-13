import Register from "../../components/forms/registerForm/Register";
import Footer from "../../components/layout/footer/Footer";
import "./UserSignupPage.scss";
import { Helmet } from "react-helmet-async";

const UserSignupPage = () => {
  
  return (
    <main className="register-page">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <section className="register-container">
        <h1 className="user-signup-title"> Create an Account for Free</h1>

        <Register signUp={"sign Up"} />
      </section>

      <Footer />
    </main>
  );
};

export default UserSignupPage;
