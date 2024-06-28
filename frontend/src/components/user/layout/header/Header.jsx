import React from 'react';
import logo from '../../../../assets/logo.jpg';
import devineMercy from '../../../../assets/devineMercy.png';
import './Header.scss';
import Navbar from '../navbar/Navbar';

const Header = () => {
  return (
    <header className="header">
      <h1 className="header-title">Eritean Roman Catholic Church in Hamburg (ERCCH)</h1>
      <figure className="logo-container">
        <img src={logo} alt="Logo" className="logo" />

        <img src={devineMercy} alt="Logo" className="devine-mercy" />
      </figure>

      <Navbar />
    </header>
  );
};

export default Header;
