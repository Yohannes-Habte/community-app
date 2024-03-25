import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../../../redux/reducers/userReducer';
import axios from 'axios';
import { API } from '../../../../utiles/securitiy/secreteKey';
import { toast } from 'react-toastify';

const Navbar = () => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variable
  const [open, setOpen] = useState(false);

  // Handle click
  const handleClick = () => {
    setOpen(!open);
  };

  // Log out user
  const logoutUser = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(`${API}/auth/logout`);

      if (data.success) {
        dispatch(userLogoutSuccess(data.message));
        toast.success(data.message);
        navigate('/login');
      } else {
        toast.error('User could not logout');
      }
    } catch (error) {
      dispatch(userLogoutFailure(error.response.data.message));
    }
  };

  // Styling NavLink
  const navbarNavLink = ({ isActive }) =>
    isActive ? 'active-navbar-item' : 'passive-navbar-item';

  return (
    <nav className="header-navbar">
      {/* Church logo */}
      <NavLink to={'/'} className={'short-logo'}>
        ERCCH
      </NavLink>

      {/* Navigation bar */}
      <ul className="navbar-items">
        <li className="navbar-item">
          <NavLink to={'/'} className={navbarNavLink}>
            Home
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/about'} className={navbarNavLink}>
            About
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/reports'} className={navbarNavLink}>
            Reports
          </NavLink>
        </li>

        <li className="navbar-item">
          <NavLink to={'/contact'} className={navbarNavLink}>
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
              {currentUser && currentUser.role === 'priest' && (
                <li className="menu-item">
                  <NavLink to={'/priest/dashboard'} className={'link'}>
                    Priest Dashboard
                  </NavLink>
                </li>
              )}
              {currentUser && currentUser.role === 'admin' && (
                <li className="menu-item">
                  <NavLink to={'/admin/dashboard'} className={'link'}>
                    Admin Dashboard
                  </NavLink>
                </li>
              )}

              {currentUser && currentUser.role === 'financeManager' && (
                <li className="menu-item">
                  <NavLink to={'/finance/dashboard'} className={'link'}>
                    Finance Dashboard
                  </NavLink>
                </li>
              )}

              <li className="menu-item">
                <NavLink to={'/user/profile'} className={'link'}>
                  User Profile
                </NavLink>
              </li>

              <li className="menu-item">
                <NavLink to={'/login'} onClick={logoutUser} className={'link'}>
                  Log Out
                </NavLink>
              </li>
            </ul>
          )}
        </aside>
      ) : (
        <ul className="register-login">
          <li className="navbar-item">
            <NavLink to={'/signup'} className="link register">
              Register
            </NavLink>
          </li>

          <li className="navbar-item">
            <NavLink to={'/login'} className="link login">
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
