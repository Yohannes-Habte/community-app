import "./PriestDashboardHeader.scss";
import { FaCross, FaUsers } from "react-icons/fa";
import { GiSunPriest } from "react-icons/gi";
import { SiEventstore } from "react-icons/si";
import { ImUsers } from "react-icons/im";
import Logout from "../../../../utile/globalFunctions/Logout";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoSettings } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";

const PriestDashboardHeader = ({ active, setActive }) => {
  // Global state variables
  const { signOut } = Logout();
  const { currentUser } = useSelector((state) => state.member);

  // Handle logout
  const handleLogout = async () => {
    await signOut(); // This will trigger the logout process
  };

  return (
    <header className="priest-dashboard-header">
      <figure className="image-container">
        <img
          className="image"
          src={currentUser?.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
          alt={currentUser?.firstName}
          onClick={handleLogout}
        />
      </figure>

      <ul className="priest-dashboard-header-items">
        <li className="priest-dashboard-header-item">
          <FaUsers
            onClick={() => setActive(2)}
            title="Parishioners"
            className={
              active === 2
                ? "active-priest-dashboard-header-icon"
                : "passive-priest-dashboard-header-icon"
            }
          />
        </li>

        <li className="priest-dashboard-header-item">
          <FaCross
            onClick={() => setActive(3)}
            title="Services"
            className={
              active === 3
                ? "active-priest-dashboard-header-icon"
                : "passive-priest-dashboard-header-icon"
            }
          />
        </li>

        <li className="priest-dashboard-header-item">
          <SiEventstore
            onClick={() => setActive(4)}
            title="Events"
            className={
              active === 4
                ? "active-priest-dashboard-header-icon"
                : "passive-priest-dashboard-header-icon"
            }
          />
        </li>

        <li className="priest-dashboard-header-item">
          <GiSunPriest
            onClick={() => setActive(5)}
            title="New Priest"
            className={
              active === 5
                ? "active-priest-dashboard-header-icon"
                : "passive-priest-dashboard-header-icon"
            }
          />
        </li>

        <li className="priest-dashboard-header-item">
          <ImUsers
            onClick={() => setActive(6)}
            title="Church Committee"
            className={
              active === 6
                ? "active-priest-dashboard-header-icon"
                : "passive-priest-dashboard-header-icon"
            }
          />
        </li>

        <Link to="/user/profile">
          <li className="priest-dashboard-header-item">
            <IoSettings
              onClick={() => setActive(7)}
              title="Settings"
              className={
                active === 7
                  ? "active-priest-dashboard-header-icon"
                  : "passive-priest-dashboard-header-icon"
              }
            />
          </li>
        </Link>

        <li className="priest-dashboard-header-item">
          <IoMdLogOut
            onClick={handleLogout}
            title="Logout"
            className={
              active === 8
                ? "active-priest-dashboard-header-icon"
                : "passive-priest-dashboard-header-icon"
            }
          />
        </li>
      </ul>
    </header>
  );
};

export default PriestDashboardHeader;
