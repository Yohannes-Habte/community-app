import "./AdminHeader.scss";
import { FaUsers } from "react-icons/fa";
import { GiSunPriest } from "react-icons/gi";
import { SiEventstore, SiGooglemessages } from "react-icons/si";
import { RiAdminFill } from "react-icons/ri";
import { MdSupport } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { useSelector } from "react-redux";

const AdminHeader = ({ isActive, setIsActive }) => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.member);

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
            onClick={() => setIsActive(3)}
            title="Committee"
            className={
              isActive === 3
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <MdSupport
            onClick={() => setIsActive(4)}
            title="Contribution"
            className={
              isActive === 4
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <SiEventstore
            onClick={() => setIsActive(5)}
            title="Events"
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
          <SiGooglemessages
            onClick={() => setIsActive(7)}
            title="Delegation"
            className={
              isActive === 7
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <IoSettings
            onClick={() => setIsActive(8)}
            title="Delegation"
            className={
              isActive === 8
                ? "active-admin-dashboard-header-icon"
                : "passive-admin-dashboard-header-icon"
            }
          />
        </li>

        <li className="admin-dashboard-header-item">
          <IoMdLogOut
            onClick={() => setIsActive(9)}
            title="Delegation"
            className={
              isActive === 9
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
