import "./Header.scss";
import Navbar from "../navbar/Navbar";
import { headerImages } from "../../../data/Data";

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">
        Eritrean Roman Catholic Church in Hamburg (ERCCH)
      </h1>

      <figure className="logo-container">
        <img src={headerImages?.logo} alt="Logo" className="logo" />

        <img
          src={headerImages?.divineMercy}
          alt="Logo"
          className="divine-mercy"
        />
      </figure>

      <Navbar />
    </header>
  );
};

export default Header;
