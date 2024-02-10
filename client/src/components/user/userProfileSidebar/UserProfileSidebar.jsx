import React from 'react';
import './UserProfileSidebar.scss';
import { NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaAddressCard } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdMedicalServices } from 'react-icons/md';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { RiMoneyEuroBoxFill } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';

const UserProfileSidebar = () => {
  // Styling NavLink status
  const activeItem = ({ isActive }) =>
    isActive ? 'active-item-navLink' : 'passive-item-navLink';

  return (
    <nav className="user-profile-sidebar-wrapper">
      <ul className="user-profile-sidebar-items">
        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/profile'} className={activeItem}>
            <FaUser className="icon" />
          </NavLink>

          <NavLink to={'/user/profile'} className={activeItem}>
            Update Profile
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/address'} className={activeItem}>
            <FaAddressCard className="icon" />
          </NavLink>

          <NavLink to={'/user/address'} className={activeItem}>
            User Address
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/changePassword'} className={activeItem}>
            <RiLockPasswordFill className="icon" />
          </NavLink>

          <NavLink to={'/user/changePassword'} className={activeItem}>
            Change Password
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/contribution'} className={activeItem}>
            <RiMoneyEuroBoxFill className="icon" />
          </NavLink>

          <NavLink to={'/user/contribution'} className={activeItem}>
            Monthly Contribution
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/serviceRequest'} className={activeItem}>
            <MdOutlineSupportAgent className="icon" />
          </NavLink>
          <NavLink to={'/user/serviceRequest'} className={activeItem}>
            Service Request
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/services'} className={activeItem}>
            <MdMedicalServices className="icon" />
          </NavLink>
          <NavLink to={'/user/services'} className={activeItem}>
            All Services
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/user/inbox'} className={activeItem}>
            <MdOutlineMessage className="icon" />
          </NavLink>

          <NavLink to={'/user/inbox'} className={activeItem}>
            User Inbox
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/priest/dashboard'} className={activeItem}>
            <RiMoneyEuroBoxFill className="icon" />
          </NavLink>

          <NavLink to={'/priest/dashboard'} className={activeItem}>
            Parish Priest
          </NavLink>
        </li>

        <li className="user-profile-sidebar-item">
          <NavLink to={'/login'} className={activeItem}>
            <IoMdLogOut className="icon" />
          </NavLink>

          <NavLink to={'/login'} className={activeItem}>
            Log Out
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default UserProfileSidebar;
