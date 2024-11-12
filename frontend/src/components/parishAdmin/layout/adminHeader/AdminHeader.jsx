import "./AdminHeader.scss";
import { FaChurch, FaServicestack, FaUsers, FaVideo } from "react-icons/fa";
import { GiSunPriest } from "react-icons/gi";
import { SiEventstore } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { IoSettings } from "react-icons/io5";
import { IoIosNotifications, IoMdLogOut } from "react-icons/io";
import { useSelector } from "react-redux";
import { BiCategory } from "react-icons/bi";
import { Link } from "react-router-dom";
import Logout from "../../../../utile/globalFunctions/Logout";

const AdminHeader = ({ isActive, setIsActive }) => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.member);

  // Global state variables
  const { signOut } = Logout();

    // Handle logout
    const handleLogout = async () => {
      await signOut(); 
    };

  return (
    <header className="admin-dashboard-header">
      <figure className="admin-image-container">
        <img
          className="image"
          src={currentUser && currentUser?.image}
          alt={currentUser.firstName}
        />
      </figure>

      <ul className="admin-dashboard-header-items">
        <li className="admin-dashboard-header-item">
          <FaUsers
            onClick={() => setIsActive(2)}
            title="Members"
            className={
              isActive === 2
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <RiAdminFill
            onClick={() => setIsActive(4)}
            title="Committee"
            className={
              isActive === 4
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <FaChurch
            onClick={() => setIsActive(5)}
            title="Mass Schedule"
            className={
              isActive === 5
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <GiSunPriest
            onClick={() => setIsActive(6)}
            title="Delegation"
            className={
              isActive === 6
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <SiEventstore
            onClick={() => setIsActive(7)}
            title="Events"
            className={
              isActive === 7
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <BiCategory
            onClick={() => setIsActive(8)}
            title="Service Categories"
            className={
              isActive === 8
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <FaServicestack
            onClick={() => setIsActive(9)}
            title="Services"
            className={
              isActive === 9
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <IoIosNotifications
            onClick={() => setIsActive(10)}
            title="Delegation"
            className={
              isActive === 10
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <FaVideo
            onClick={() => setIsActive(11)}
            title="Add Video"
            className={
              isActive === 11
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>
        <Link to={"/user/profile"}>
          <li className="admin-dashboard-header-item">
            <IoSettings
              onClick={() => setIsActive(12)}
              title="Settings"
              className={
                isActive === 12
                  ? "active-admin-dashboard-header-icon"
                  : "passive-admin-dashboard-header-icon"
              }
            />
          </li>
        </Link>

        <li className="admin-dashboard-header-item">
          <IoMdLogOut
            onClick={handleLogout}
            title="Log Out"
            className={
              isActive === 13
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>
      </ul>
    </header>
  );
};

export default AdminHeader;
