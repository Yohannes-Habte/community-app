import { Link } from "react-router-dom";
import Subscribe from "../../forms/subscribe/Subscribe";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-details-wrapper">
        <div className="footer-direction">
          <section className="footer-section">
            <h3 className="footer-title">Navigation </h3>
            <ul className="footer-ul">
              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/"}>
                  Home
                </Link>
              </li>
              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/about"}>
                  About
                </Link>
              </li>
              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/reports"}>
                  Information
                </Link>
              </li>
              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/contact"}>
                  Contact
                </Link>
              </li>
            </ul>
          </section>

          <section className="footer-section">
            <h3 className="footer-title">ERCCH Information</h3>

            <ul className="footer-ul">
              {/* Link to Parish Priest section */}
              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/about#priest"}>
                  Priest
                </Link>
              </li>

              {/* Link to Committee section */}
              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/about#committee"}>
                  Committee
                </Link>
              </li>

              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to="/news#latest-event">
                  New Event
                </Link>
              </li>

              <li className="footer-ul-li">
                <Link className="footer-ul-li-link" to={"/news"}>
                  News
                </Link>
              </li>
            </ul>
          </section>

          <section className="footer-section">
            <h3 className="footer-title"> Social Media </h3>

            <ul className="footer-ul">
              <li className="footer-ul-li">
                <a className="footer-ul-li-link" href="">
                  Facebook
                </a>
              </li>
              <li className="footer-ul-li">
                <a className="footer-ul-li-link" href="">
                  Youtube
                </a>
              </li>
              <li className="footer-ul-li">
                <a className="footer-ul-li-link" href="">
                  Twitter
                </a>
              </li>
              <li className="footer-ul-li">
                <a className="footer-ul-li-link" href="">
                  Instagram
                </a>
              </li>
            </ul>
          </section>
        </div>
        <Subscribe />
      </div>

      <section className="copyright">@2024 ERCCH</section>
    </footer>
  );
};

export default Footer;
