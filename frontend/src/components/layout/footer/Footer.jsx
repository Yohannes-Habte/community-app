import { Link } from "react-router-dom";
import Subscribe from "../../forms/subscribe/Subscribe";
import "./Footer.scss";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-details-wrapper">
        <section className="footer-direction">
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

          <ul className="footer-ul">
            <li className="footer-ul-li">
              <Link className="footer-ul-li-link" to={"/about"}>
                Priest
              </Link>
            </li>
            <li className="footer-ul-li">
              <Link className="footer-ul-li-link" to={"/about"}>
                Committee
              </Link>
            </li>
            <li className="footer-ul-li">
              <Link className="footer-ul-li-link" to={"/home"}>
                New Event
              </Link>
            </li>
            <li className="footer-ul-li">
              <Link className="footer-ul-li-link" to={"/report"}>
                Report
              </Link>
            </li>
          </ul>

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
        <Subscribe />
      </div>

      <section className="copyright">@2024 ERCCH</section>
    </footer>
  );
};

export default Footer;