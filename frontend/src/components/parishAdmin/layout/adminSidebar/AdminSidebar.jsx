import "./AdminSidebar.scss";
import { FaUsers } from "react-icons/fa";
import { GiSunPriest } from "react-icons/gi";
import { IoMdLogOut } from "react-icons/io";
import { IoSettings } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { SiEventstore } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { MdSupport } from "react-icons/md";
import { SiGooglemessages } from "react-icons/si";
import { Link } from "react-router-dom";
import Logout from "../../../../utiles/globalFunctions/Logout";

const AdminSidebar = ({ isActive, setIsActive }) => {
  // Global state variables
  const { signOut } = Logout();

  // Handle logout
  const handleLogout = async () => {
    await signOut(); // This will trigger the logout process
  };

  return (
    <section className="admin-dashboard-sidebar-wrapper">
      <h2 className="admin-dashboard-sidebar-title">Dashboard</h2>

      {/* Summary of Admin Dashboard */}
      <aside
        onClick={() => setIsActive(1)}
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
        onClick={() => setIsActive(2)}
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
        onClick={() => setIsActive(3)}
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
        onClick={() => setIsActive(4)}
        className="admin-dashboard-sidebar-item"
      >
        <RiAdminFill
          title="Inbox"
          className={isActive === 4 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
          Committee
        </h4>
      </aside>

      {/* Contributions */}

      <aside
        onClick={() => setIsActive(5)}
        className="admin-dashboard-sidebar-item"
      >
        <MdSupport
          title="Contributions"
          className={isActive === 5 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 5 ? "active-text" : "passive-text"}>
          Contributions
        </h4>
      </aside>

      {/* Masses */}

      <aside
        onClick={() => setIsActive(6)}
        className="admin-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={isActive === 6 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
          Masses
        </h4>
      </aside>

      {/* Delegations */}

      <aside
        onClick={() => setIsActive(7)}
        className="admin-dashboard-sidebar-item"
      >
        <GiSunPriest
          title="Delegation"
          className={isActive === 7 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
          Delegations
        </h4>
      </aside>

      {/* Events */}

      <aside
        onClick={() => setIsActive(8)}
        className="admin-dashboard-sidebar-item"
      >
        <SiEventstore
          title="Events"
          className={isActive === 8 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
          Events
        </h4>
      </aside>

      {/* Service Categories */}

      <aside
        onClick={() => setIsActive(9)}
        className="admin-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={isActive === 9 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 9 ? "active-text" : "passive-text"}>
          Service Categories
        </h4>
      </aside>

      {/* Services */}

      <aside
        onClick={() => setIsActive(10)}
        className="admin-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={isActive === 10 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 10 ? "active-text" : "passive-text"}>
          Services
        </h4>
      </aside>

      {/* Notifications */}
      <aside
        onClick={() => setIsActive(11)}
        className="admin-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={isActive === 11 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 11 ? "active-text" : "passive-text"}>
          Notifications
        </h4>
      </aside>

      {/* Upload Video Form */}
      <aside
        onClick={() => setIsActive(12)}
        className="admin-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={isActive === 12 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 12 ? "active-text" : "passive-text"}>
          Add Video
        </h4>
      </aside>

      {/* Settings */}

      <Link to={"/user/profile"} className="admin-dashboard-sidebar-item">
        <IoSettings
          title="Settings"
          className={isActive === 13 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 13 ? "active-text" : "passive-text"}>
          Settings
        </h4>
      </Link>

      {/* Log Out */}

      <aside className="admin-dashboard-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={isActive === 14 ? "active-icon" : "passive-icon"}
        />

        <h4>
          <Link to={"/"} onClick={handleLogout}>
            Log Out
          </Link>
        </h4>
      </aside>
    </section>
  );
};

export default AdminSidebar;
