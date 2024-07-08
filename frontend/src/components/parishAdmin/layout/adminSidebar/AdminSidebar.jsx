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
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from "../../../../redux/reducers/userReducer";
import axios from "axios";
import { API } from "../../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";

const AdminSidebar = ({ isActive, setIsActive }) => {
  const navigate = useNavigate();
  // Global state variables
  const dispatch = useDispatch();

  // Log out user
  const logoutUser = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(`${API}/auth/logout`);

      if (data.success) {
        dispatch(userLogoutSuccess(data.message));
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error("User could not logout");
      }
    } catch (error) {
      dispatch(userLogoutFailure(error.response.data.message));
    }
  };

  return (
    <section className="admin-dashboard-sidebar-wrapper">
      <h2 className="admin-dashboard-sidebar-title">Dashboard</h2>

      <aside
        onClick={() => setIsActive(1)}
        className="admin-dashboard-sidebar-item"
      >
        <MdDashboard
          title="Dashboard Overview"
          className={isActive === 1 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
          Dashboard Overview
        </h4>
      </aside>

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

      <aside
        onClick={() => setIsActive(4)}
        className="admin-dashboard-sidebar-item"
      >
        <RiAdminFill
          title="Committee"
          className={isActive === 4 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
          Add Committee
        </h4>
      </aside>

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

      <aside
        onClick={() => setIsActive(6)}
        className="admin-dashboard-sidebar-item"
      >
        <SiEventstore
          title="Events"
          className={isActive === 6 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
          Events
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(7)}
        className="admin-dashboard-sidebar-item"
      >
        <GiSunPriest
          title="Delegation"
          className={isActive === 7 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
          Delegation
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(8)}
        className="admin-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={isActive === 8 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
          Inbox
        </h4>
      </aside>

      <Link to={"/user/profile"} className="admin-dashboard-sidebar-item">
        <IoSettings
          title="Settings"
          className={isActive === 8 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
          Settings
        </h4>
      </Link>

      <aside className="admin-dashboard-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={isActive === 9 ? "active-icon" : "passive-icon"}
        />

        <h4>
          <Link to={"/login"} onClick={logoutUser}>
            Log Out
          </Link>
        </h4>
      </aside>
    </section>
  );
};

export default AdminSidebar;
