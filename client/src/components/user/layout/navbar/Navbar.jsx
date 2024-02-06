import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Church logo */}
      <NavLink to={'/'} className={'logo'}>
        Eritean Roman Catholic Church in Hamburg
      </NavLink>

      {/* Navigation bar */}
      <ul className="navigation-items">
        <li className="item">
          <NavLink to={'/'} className={'item-link'}>
            Home
          </NavLink>
        </li>

        <li className="item">
          <NavLink to={'/about'} className={'item-link'}>
            About
          </NavLink>
        </li>

        <li className="item">
          <NavLink to={'/services'} className={'item-link'}>
            Services
          </NavLink>
        </li>

        <li className="item">
          <NavLink to={'/reports'} className={'item-link'}>
            Reports
          </NavLink>
        </li>

        <li>
          <NavLink to={'/contact'} className={'item-link'}>
            Contact
          </NavLink>
        </li>
      </ul>

      <ul className="register-login">
        <li className="item">
          <NavLink to={'/register'} className={'item-link'}>
            Register
          </NavLink>
        </li>

        <li className="item">
          <NavLink to={'/login'} className={'item-link'}>
            Login
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
