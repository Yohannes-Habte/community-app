import "./PriestDashboardSidebar.scss";
import { MdDashboard, MdOutlineClose } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import "./PriestDashboardSidebar.scss";
import { FaCross } from "react-icons/fa";
import { SiEventstore } from "react-icons/si";
import { IoSettings } from "react-icons/io5";
import { GiHamburgerMenu, GiSunPriest } from "react-icons/gi";
import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
import Logout from "../../../../utile/globalFunctions/Logout";
import { useState } from "react";

const PriestDashboardSidebar = ({ active, setActive }) => {
  // Global state variables
  const { signOut } = Logout();

  // Local state variables
  const [openPriestSidebar, setOpenPriestSidebar] = useState(false); // For dropdown visibility

  const handlePriestSidebar = () => {
    setOpenPriestSidebar(!openPriestSidebar);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut(); // This will trigger the logout process
  };

  return (
    <div
      className={`parish-priest-dashboard-sidebar-container ${
        openPriestSidebar ? "open-priest-dashboard-sidebar-menu" : ""
      }`}
    >
      {/* Hamburger icon for mobile screens */}
      <div
        className="priest-sidebar-hamburger-menu"
        onClick={handlePriestSidebar}
      >
        {openPriestSidebar ? <MdOutlineClose /> : <GiHamburgerMenu />}
      </div>

      <section className={`parish-priest-dashboard-sidebar-wrapper`}>
        <h1 className="parish-priest-dashboard-sidebar-title">Dashboard</h1>

        <aside
          onClick={() => setActive(1) || setOpenPriestSidebar(false)}
          className="parish-priest-dashboard-sidebar-item"
        >
          <MdDashboard
            title="Dashboar Overview"
            className={active === 1 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 1 ? "active-text" : "passive-text"}>
            Summary
          </h4>
        </aside>

        <aside
          onClick={() => setActive(2) || setOpenPriestSidebar(false)}
          className="parish-priest-dashboard-sidebar-item"
        >
          <FaUsers
            title="Parishioners"
            className={active === 2 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 2 ? "active-text" : "passive-text"}>
            Parishioners
          </h4>
        </aside>

        <aside
          onClick={() => setActive(3) || setOpenPriestSidebar(false)}
          className="parish-priest-dashboard-sidebar-item"
        >
          <FaCross
            title="Services"
            className={active === 3 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 3 ? "active-text" : "passive-text"}>
            Services
          </h4>
        </aside>

        <aside
          onClick={() => setActive(4) || setOpenPriestSidebar(false)}
          className="parish-priest-dashboard-sidebar-item"
        >
          <SiEventstore
            title="Events"
            className={active === 4 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 4 ? "active-text" : "passive-text"}>
            Events
          </h4>
        </aside>

        <aside
          onClick={() => setActive(5) || setOpenPriestSidebar(false)}
          className="parish-priest-dashboard-sidebar-item"
        >
          <GiSunPriest
            title="New Priest"
            className={active === 5 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 5 ? "active-text" : "passive-text"}>
            Delegations
          </h4>
        </aside>

        <aside
          onClick={() => setActive(6) || setOpenPriestSidebar(false)}
          className="parish-priest-dashboard-sidebar-item"
        >
          <ImUsers
            title="Church Committee"
            className={active === 6 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 6 ? "active-text" : "passive-text"}>
            Committees
          </h4>
        </aside>

        <Link
          to={"/user/profile"}
          className="parish-priest-dashboard-sidebar-item"
        >
          <IoSettings
            title="Settings"
            className={active === 7 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 7 ? "active-text" : "passive-text"}>
            Settings
          </h4>
        </Link>

        <aside className="parish-priest-dashboard-sidebar-item">
          <IoMdLogOut
            title="Log Out"
            className={active === 8 ? "active-icon" : "passive-icon"}
          />

          <h4>
            <Link to={"/login"} onClick={handleLogout}>
              Log Out
            </Link>
          </h4>
        </aside>
      </section>
    </div>
  );
};

export default PriestDashboardSidebar;
