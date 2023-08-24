import React from 'react';
import './Navbar.scss';
import { FiSearch } from 'react-icons/fi';
import { TbSettings } from 'react-icons/tb';
import { PiSquaresFourLight } from 'react-icons/pi';
import { FaRegBell } from 'react-icons/fa';
import { BsCircleHalf } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <NavLink className={'church-name'} to={'/'}>
          Eritean Roman Catholic Church in Hamburg{' '}
        </NavLink>
      </div>

      <div className="icons-user">
        <figure className="icons">
          <FiSearch />
          <PiSquaresFourLight />
          <BsCircleHalf />
        </figure>
        <div className="notification">
          <FaRegBell className="bell" />
          <span className="message-notification">1</span>
        </div>
        <div className="user">
          <img
            className="user-photo"
            src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
            alt=""
          />
          <span> Habte </span>
        </div>
        <TbSettings />
      </div>
    </nav>
  );
};

export default Navbar;
