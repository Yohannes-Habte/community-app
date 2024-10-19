import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/actions/user/userAction";
import Logout from "../../../utiles/globalFunctions/Logout";

const Navbar = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const { signOut } = Logout();

  // Local state variable
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // Handle logout
  const handleLogout = async () => {
    await signOut(); // This will trigger the logout process
  };

  // Handle click
  const handleClick = () => {
    setOpen(!open);
  };

  // Styling NavLink
  const navbarNavLink = ({ isActive }) =>
    isActive ? "active-navbar-item" : "passive-navbar-item";

  return (
    <nav className="header-navbar">
      {/* Church logo */}
      <NavLink to={"/"} className={"short-logo"}>
        <h1>ERCCH</h1>
      </NavLink>

      {/* Navigation bar */}
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to={"/"} className={navbarNavLink}>
            Home
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/about"} className={navbarNavLink}>
            About
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/news"} className={navbarNavLink}>
            News
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={"/contact"} className={navbarNavLink}>
            Contact
          </NavLink>
        </li>
      </ul>
      {currentUser ? (
        <aside className="logged-in-user-info" onClick={handleClick}>
          <img
            className="logged-in-user-image "
            src={currentUser.image}
            alt={currentUser.firstName}
          />
          <h4 className="logged-in-user-name"> {currentUser.firstName} </h4>
          {open && (
            <ul className="logged-in-user-menu">
              {currentUser && currentUser.role === "priest" && (
                <li className="menu-item">
                  <NavLink to={"/priest/dashboard"} className={"link"}>
                    Priest Dashboard
                  </NavLink>
                </li>
              )}
              {currentUser && currentUser.role === "admin" && (
                <li className="menu-item">
                  <NavLink to={"/admin/dashboard"} className={"link"}>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}

              {currentUser && currentUser.role === "financeManager" && (
                <li className="menu-item">
                  <NavLink to={"/finance/dashboard"} className={"link"}>
                    Finance Dashboard
                  </NavLink>
                </li>
              )}

              <li className="menu-item">
                <NavLink to={"/user/profile"} className={"link"}>
                  User Profile
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink
                  to={"/login"}
                  onClick={handleLogout}
                  className={"link"}
                >
                  Log Out
                </NavLink>
              </li>
            </ul>
          )}
        </aside>
      ) : (
        <ul className="register-login">
          <li className="navbar-item">
            <NavLink to={"/signup"} className="link register">
              Register
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to={"/login"} className="link login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
