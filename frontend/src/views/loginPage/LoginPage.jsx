import { Helmet } from "react-helmet-async";

import "./LoginPage.scss";
import Footer from "../../components/layout/footer/Footer";
import LoginForm from "../../components/forms/login/LoginForm";

const LoginPage = () => {
  return (
    <main className="login-page">
      {/* <Helmet>
        <title>{isAuth ? "sign out" : "Sign In"} </title>
      </Helmet> */}

      <Helmet>
        <title> Sign In </title>
      </Helmet>

      <section className="login-page-container">
        <h1 className="login-page-title"> Welcome To Your Account </h1>
        <LoginForm />
      </section>

      <Footer />
    </main>
  );
};

export default LoginPage;
