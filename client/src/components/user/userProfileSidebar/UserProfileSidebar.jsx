import React from 'react';
import './UserProfileSidebar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { FaAddressCard } from 'react-icons/fa';
import { RiLockPasswordFill } from 'react-icons/ri';
import { MdMedicalServices } from 'react-icons/md';
import { MdOutlineSupportAgent } from 'react-icons/md';
import { RiMoneyEuroBoxFill } from 'react-icons/ri';
import { IoMdLogOut } from 'react-icons/io';
import { MdOutlineMessage } from 'react-icons/md';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../../redux/reducers/userReducer';
import { toast } from 'react-toastify';
import { API } from '../../../utiles/securitiy/secreteKey';

const UserProfileSidebar = () => {
  // Navigate
  const navigate = useNavigate();
  // Global state variables
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Sign out Function
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
      dispatch(userLogoutFailure(error.response.message));
    }
  };

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
            Offered Services
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
        
        {currentUser.role === 'priest' && (
          <li className="user-profile-sidebar-item">
            <NavLink to={'/priest/dashboard'} className={activeItem}>
              <RiMoneyEuroBoxFill className="icon" />
            </NavLink>

            <NavLink to={'/priest/dashboard'} className={activeItem}>
              Parish Priest
            </NavLink>
          </li>
        )}

        <li className="user-profile-sidebar-item" onClick={logoutUser}>
          <IoMdLogOut className="logout-icon" />
          <span className="logout-text">Log Out</span>
        </li>
      </ul>
    </nav>
  );
};

export default UserProfileSidebar;
