import "./UserProfileSidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaAddressCard } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdMedicalServices } from "react-icons/md";
import { RiAdminFill } from "react-icons/ri";
import { RiMoneyEuroBoxFill } from "react-icons/ri";
import { IoMdLogOut } from "react-icons/io";
import { MdOutlineMessage } from "react-icons/md";
import { GiSunPriest } from "react-icons/gi";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from "../../../redux/reducers/userReducer";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";

const UserProfileSidebar = ({ isActive, setIsActive }) => {
  // Navigate
  const navigate = useNavigate();
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Sign out Function
  const logoutUser = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(`${API}/auth/logout`);

      if (data.success) {
        dispatch(userLogoutSuccess(data.message));
        toast.success(data.message);
        localStorage.removeItem("user");
        window.location.reload();
        navigate("/login");
      } else {
        toast.error("User could not logout");
      }
    } catch (error) {
      dispatch(userLogoutFailure(error.response.data.message));
    }
  };

  return (
    <section className="user-profile-sidebar-wrapper">
      <h2 className="user-profile-sidebar-title">Dashboard</h2>

      <aside
        onClick={() => setIsActive(1)}
        className="user-profile-sidebar-item"
      >
        <FaUser
          title="User Profile"
          className={isActive === 1 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 1 ? "active-text" : "passive-text"}>
          User Profile
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(2)}
        className="user-profile-sidebar-item"
      >
        <FaAddressCard
          title="User Address"
          className={isActive === 2 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 2 ? "active-text" : "passive-text"}>
          User Address
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(3)}
        className="user-profile-sidebar-item"
      >
        <FaAddressCard
          title="Change Password"
          className={isActive === 3 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 3 ? "active-text" : "passive-text"}>
          Change Password
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(4)}
        className="user-profile-sidebar-item"
      >
        <RiLockPasswordFill
          title="Monthly Contribution"
          className={isActive === 4 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 4 ? "active-text" : "passive-text"}>
          Monthly Contribution
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(5)}
        className="user-profile-sidebar-item"
      >
        <RiMoneyEuroBoxFill
          title="Service Request"
          className={isActive === 5 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 5 ? "active-text" : "passive-text"}>
          Service Request
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(6)}
        className="user-profile-sidebar-item"
      >
        <MdMedicalServices
          title="Offered Services"
          className={isActive === 6 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 6 ? "active-text" : "passive-text"}>
          Offered Services
        </h4>
      </aside>

      <aside
        onClick={() => setIsActive(7)}
        className="user-profile-sidebar-item"
      >
        <MdOutlineMessage
          title="User Inbox"
          className={isActive === 7 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 7 ? "active-text" : "passive-text"}>
          User Inbox
        </h4>
      </aside>

      {currentUser.role === "priest" && (
        <Link to={"/priest/dashboard"}>
          <aside
            onClick={() => setIsActive(8)}
            className="user-profile-sidebar-item"
          >
            <GiSunPriest
              title="Parish Priest"
              className={isActive === 8 ? "active-icon" : "passive-icon"}
            />

            <h4 className={isActive === 8 ? "active-text" : "passive-text"}>
              Parish Priest
            </h4>
          </aside>
        </Link>
      )}

      {currentUser.role === "admin" && (
        <Link to={"/admin/dashboard"}>
          <aside
            onClick={() => setIsActive(9)}
            className="user-profile-sidebar-item"
          >
            <RiMoneyEuroBoxFill
              title="Parish Admin"
              className={isActive === 9 ? "active-icon" : "passive-icon"}
            />

            <h4 className={isActive === 9 ? "active-text" : "passive-text"}>
              Parish Admin
            </h4>
          </aside>
        </Link>
      )}

      {currentUser.role === "financeManager" && (
        <Link to={"/finance/dashboard"}>
          <aside
            onClick={() => setIsActive(10)}
            className="user-profile-sidebar-item"
          >
            <RiAdminFill
              title="Parish Admin"
              className={isActive === 10 ? "active-icon" : "passive-icon"}
            />

            <h4 className={isActive === 10 ? "active-text" : "passive-text"}>
              Finance Manager
            </h4>
          </aside>
        </Link>
      )}

      <aside onClick={logoutUser} className="user-profile-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={isActive === 12 ? "active-icon" : "passive-icon"}
        />

        <h4 className={isActive === 12 ? "active-text" : "passive-text"}>
          Log Out
        </h4>
      </aside>
    </section>
  );
};

export default UserProfileSidebar;
