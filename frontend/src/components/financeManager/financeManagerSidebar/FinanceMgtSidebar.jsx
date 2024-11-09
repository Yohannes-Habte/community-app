import "./FinanceMgtSidebar.scss";
import { IoMdLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { SiEventstore } from "react-icons/si";
import { MdOutlineClose, MdSupport } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import Logout from "../../../utile/globalFunctions/Logout";
import { useState } from "react";

const FinanceMgtSidebar = ({ active, setActive }) => {
  // Global state variables
  const { signOut } = Logout();

  // Local state variables
  const [openFinanceManagerMenu, setOpenFinanceManagerMenu] = useState(false);

  // Handle logout
  const handleLogout = async () => {
    await signOut(); // This will trigger the logout process
  };

  // Handle open finance manager dashboard menu
  const handleOpenFinanceManagerDashboardMenu = () => {
    setOpenFinanceManagerMenu(!openFinanceManagerMenu);
  };

  return (
    <div
      className={`finance-manager-dashboard-sidebar-container ${
        openFinanceManagerMenu ? "open-finance-manager-menu" : ""
      }`}
    >
      {/* Hamburger icon for small screens */}
      <div
        className="finance-manager-hamburger-menu"
        onClick={handleOpenFinanceManagerDashboardMenu}
      >
        {openFinanceManagerMenu ? <MdOutlineClose /> : <GiHamburgerMenu />}
      </div>
      <section className="finance-manager-dashboard-sidebar-wrapper">
        <h2 className="finance-manager-dashboard-sidebar-title">Dashboard</h2>

        <aside
          onClick={() => setActive(1) || setOpenFinanceManagerMenu(false)}
          className="finance-manager-dashboard-sidebar-item"
        >
          <SiGooglemessages
            title="Inbox"
            className={active === 1 ? "active-icon" : "passive-icon"}
          />
          <h4 className={active === 1 ? "active-text" : "passive-text"}>
            Summary
          </h4>
        </aside>

        <aside
          onClick={() => setActive(2) || setOpenFinanceManagerMenu(false)}
          className="finance-manager-dashboard-sidebar-item"
        >
          <SiEventstore
            title="Events"
            className={active === 2 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 2 ? "active-text" : "passive-text"}>
            Financial Reports
          </h4>
        </aside>

        <aside
          onClick={() => setActive(3) || setOpenFinanceManagerMenu(false)}
          className="finance-manager-dashboard-sidebar-item"
        >
          <MdSupport
            title="Contributions"
            className={active === 3 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 3 ? "active-text" : "passive-text"}>
            Contributions
          </h4>
        </aside>

        <Link
          to={"/user/profile"}
          className="finance-manager-dashboard-sidebar-item"
        >
          <IoSettings
            title="Settings"
            className={active === 4 ? "active-icon" : "passive-icon"}
          />

          <h4 className={active === 4 ? "active-text" : "passive-text"}>
            Settings
          </h4>
        </Link>

        <aside className="finance-manager-dashboard-sidebar-item">
          <IoMdLogOut
            title="Log Out"
            className={active === 5 ? "active-icon" : "passive-icon"}
          />

          <h4>
            <Link to={"/login"} onClick={handleLogout} className="passive-text">
              Log Out
            </Link>
          </h4>
        </aside>
      </section>
    </div>
  );
};

export default FinanceMgtSidebar;
