import React from 'react';
import { NavLink, Navigate } from 'react-router-dom';
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
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Sign out Function
  const logoutUser = async () => {
    try {
      dispatch(userLogoutStart());
      const { data } = await axios.get(`${API}/auth/logout`);

      dispatch(userLogoutSuccess(data.message));
      Navigate('/login');
    } catch (error) {
      dispatch(userLogoutFailure(error.response.message));
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
    </nav>
  );
};

export default Navbar;
