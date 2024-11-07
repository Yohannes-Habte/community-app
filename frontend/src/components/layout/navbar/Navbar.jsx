import { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../redux/actions/user/userAction";
import Logout from "../../../utile/globalFunctions/Logout";
import { GiHamburgerMenu } from "react-icons/gi";
import { MdOutlineClose } from "react-icons/md";

const Navbar = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();
  const { signOut } = Logout();

  // Local state variables
  const [open, setOpen] = useState(false); // For dropdown visibility
  const [menuOpen, setMenuOpen] = useState(false); // For hamburger menu

  // ===============================================================================================
  // Step 1: Ref to detect outside clicks
  // ===============================================================================================
  const dropdownRef = useRef(null);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  // ===============================================================================================
  // Step 2: Event listener to detect outside clicks
  // ===============================================================================================

  useEffect(() => {
    // Close dropdown if click is outside of dropdown area
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup the event listener on component unmount

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Handle logout
  const handleLogout = async () => {
    await signOut();
    setOpen(false); // Close dropdown after logout
  };

  // Toggle hamburger menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    setOpen(false); // Close user dropdown when menu opens
  };

  // Toggle dropdown for user info
  const toggleDropdown = () => {
    setOpen((prev) => !prev);
    if (menuOpen) setMenuOpen(false); // Close menu if user info is toggled
  };

  // Styling NavLink
  const navbarNavLink = ({ isActive }) =>
    isActive ? "active-navbar-item" : "passive-navbar-item";

  return (
    <nav className={`header-navbar ${menuOpen ? "menu-open" : ""}`}>
      {/* Church logo */}
      <NavLink to={"/"} className={"church-text-logo"}>
        <h1>ERCCH</h1>
      </NavLink>

      {/* Hamburger icon for mobile screens */}
      <div className="hamburger-menu" onClick={toggleMenu}>
        {menuOpen ? <MdOutlineClose /> : <GiHamburgerMenu />}
      </div>

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

      {/* Step 3: Ref to detect outside clicks */}

      {currentUser ? (
        <aside
          className="logged-in-user-info"
          onClick={toggleDropdown}
          ref={dropdownRef}
        >
          <figure className="profile-photo-wrapper">
            <img
              className="logged-in-user-image"
              src={currentUser?.image}
              alt={currentUser?.firstName}
            />
            <figcaption>{currentUser.firstName}</figcaption>
          </figure>

          {/* Dropdown menu, visible only when 'open' is true */}
          {open && (
            <ul className="logged-in-user-menu">
              {currentUser.role === "priest" && (
                <li className="menu-item">
                  <NavLink
                    to={"/priest/dashboard"}
                    className={"link"}
                    onClick={() => setOpen(false)}
                  >
                    Priest Dashboard
                  </NavLink>
                </li>
              )}
              {currentUser.role === "admin" && (
                <li className="menu-item" onClick={() => setOpen(false)}>
                  <NavLink
                    to={"/admin/dashboard"}
                    className={"link"}
                    onClick={() => setOpen(false)}
                  >
                    Admin Dashboard
                  </NavLink>
                </li>
              )}
              {currentUser.role === "financeManager" && (
                <li className="menu-item" onClick={() => setOpen(false)}>
                  <NavLink
                    to={"/finance/dashboard"}
                    className={"link"}
                    onClick={() => setOpen(false)}
                  >
                    Finance Dashboard
                  </NavLink>
                </li>
              )}
              <li className="menu-item" onClick={() => setOpen(false)}>
                <NavLink
                  to={"/user/profile"}
                  className={"link"}
                  onClick={() => setOpen(false)}
                >
                  User Profile
                </NavLink>
              </li>
              <li className="menu-item" onClick={() => setOpen(false)}>
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
