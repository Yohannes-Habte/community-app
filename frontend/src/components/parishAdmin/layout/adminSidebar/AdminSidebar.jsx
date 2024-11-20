import "./AdminSidebar.scss";
import { FaUsers } from "react-icons/fa";
import { GiHamburgerMenu, GiSunPriest } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdDashboard, MdOutlineClose } from "react-icons/md";
import { SiEventstore } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { FaServicestack } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { FaChurch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { FaVideo } from "react-icons/fa";
import { MdInsertComment } from "react-icons/md";
import { FaMoneyCheck } from "react-icons/fa";
import Logout from "../../../../utile/globalFunctions/Logout";
import { useState } from "react";

const AdminSidebar = ({ isActive, setIsActive }) => {
  // Global state variables
  const { signOut } = Logout();

  const [openAdminDashboardMenu, setOpenAdminDashboardMenu] = useState(false);

  const handleOpenAdminDashboardMenu = () => {
    setOpenAdminDashboardMenu(!openAdminDashboardMenu);
  };

  // Handle logout
  const handleLogout = async () => {
    await signOut(); // This will trigger the logout process
  };

  return (
    <div
      className={`admin-dashboard-sidebar-wrapper ${
        openAdminDashboardMenu ? "admin-hamburger-menu-opened" : ""
      }`}
    >
      {/* Hamburger icon for small screens */}
      <div
        className="admin-hamburger-menu"
        onClick={handleOpenAdminDashboardMenu}
      >
        {openAdminDashboardMenu ? <MdOutlineClose /> : <GiHamburgerMenu />}
      </div>
      <section className="admin-dashboard-menu-container">
        <h2 className="admin-dashboard-sidebar-title">Dashboard</h2>

        {/* Summary of Admin Dashboard */}
        <aside
          onClick={() => setIsActive(1) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <MdDashboard
            title="Dashboard Overview"
            className={isActive === 1 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
            Overview
          </h4>
        </aside>

        {/* Members */}
        <aside
          onClick={() => setIsActive(2) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <FaUsers
            title="Members"
            className={isActive === 2 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 2 ? "active-text" : "passive-text"}>
            Members
          </h4>
        </aside>

        {/* Committees */}
        <aside
          onClick={() => setIsActive(3) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <RiAdminFill
            title="Committee"
            className={isActive === 3 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 3 ? "active-text" : "passive-text"}>
            Committees
          </h4>
        </aside>

        {/* Specific Committee */}
        <aside
          onClick={() => setIsActive(4) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <RiAdminFill
            title="Committee"
            className={isActive === 4 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
            Committee
          </h4>
        </aside>

        {/* Masses */}

        <aside
          onClick={() => setIsActive(5) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <FaChurch
            title="Mass Schedule"
            className={isActive === 5 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 5 ? "active-text" : "passive-text"}>
            Masses
          </h4>
        </aside>

        {/* Delegations */}

        <aside
          onClick={() => setIsActive(6) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <GiSunPriest
            title="Delegation"
            className={isActive === 6 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
            Delegations
          </h4>
        </aside>

        {/* Events */}

        <aside
          onClick={() => setIsActive(7) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <SiEventstore
            title="Events"
            className={isActive === 7 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
            Events
          </h4>
        </aside>

        {/* Service Categories */}

        <aside
          onClick={() => setIsActive(8) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <BiCategory
            title="Service Categories"
            className={isActive === 8 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
            Service Categories
          </h4>
        </aside>

        {/* Services */}

        <aside
          onClick={() => setIsActive(9) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <FaServicestack
            title="Services"
            className={isActive === 9 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 9 ? "active-text" : "passive-text"}>
            Services
          </h4>
        </aside>

        {/* Notifications */}
        <aside
          onClick={() => setIsActive(10) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <IoIosNotifications
            title="Notifications"
            className={isActive === 10 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 10 ? "active-text" : "passive-text"}>
            Notifications
          </h4>
        </aside>

        {/* Upload Video Form */}
        <aside
          onClick={() => setIsActive(11) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <FaVideo
            title="Add Video"
            className={isActive === 11 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 11 ? "active-text" : "passive-text"}>
            Add Video
          </h4>
        </aside>

        {/* All user comments */}
        <aside
          onClick={() => setIsActive(12) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <MdInsertComment
            title="All Comments"
            className={isActive === 12 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 12 ? "active-text" : "passive-text"}>
            Comments
          </h4>
        </aside>

        {/* Annual Budget */}
        <aside
          onClick={() => setIsActive(13) || setOpenAdminDashboardMenu(false)}
          className="admin-dashboard-sidebar-item"
        >
          <FaMoneyCheck
            title="Budget"
            className={isActive === 13 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 13 ? "active-text" : "passive-text"}>
            Budget
          </h4>
        </aside>

        {/* Settings */}

        <Link to={"/user/profile"} className="admin-dashboard-sidebar-item">
          <IoSettings
            title="Settings"
            className={isActive === 14 ? "active-icon" : "passive-icon"}
          />

          <h4 className={isActive === 14 ? "active-text" : "passive-text"}>
            Settings
          </h4>
        </Link>

        {/* Log Out */}

        <aside className="admin-dashboard-sidebar-item">
          <IoMdLogOut
            title="Log Out"
            className={isActive === 14 ? "active-icon" : "passive-icon"}
          />

          <h4 onClick={handleLogout} className="passive-text">
            Log Out
          </h4>
        </aside>
      </section>
    </div>
  );
};

export default AdminSidebar;
