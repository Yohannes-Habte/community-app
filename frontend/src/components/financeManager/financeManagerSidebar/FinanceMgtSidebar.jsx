import React from 'react';
import './FinanceMgtSidebar.scss';
import { IoMdLogOut } from 'react-icons/io';
import { IoSettings } from 'react-icons/io5';
import { SiEventstore } from 'react-icons/si';
import { MdSupport } from 'react-icons/md';
import { SiGooglemessages } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../../redux/reducers/userReducer';
import axios from 'axios';
import { API } from '../../../utiles/securitiy/secreteKey';
import { toast } from 'react-toastify';

const FinanceMgtSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

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
  return (
    <section className="finance-manager-dashboard-sidebar-wrapper">
      <h2 className="finance-manager-dashboard-sidebar-title">Dashboard</h2>

      <aside
        onClick={() => setActive(1)}
        className="finance-manager-dashboard-sidebar-item"
      >
        <SiEventstore
          title="Events"
          className={active === 1 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 1 ? 'active-text' : 'passive-text'}>
          Financial Reports
        </h4>
      </aside>

      <aside
        onClick={() => setActive(2)}
        className="finance-manager-dashboard-sidebar-item"
      >
        <MdSupport
          title="Contribution Form"
          className={active === 2 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 2 ? 'active-text' : 'passive-text'}>
          Contribution
        </h4>
      </aside>

      <aside
        onClick={() => setActive(3)}
        className="finance-manager-dashboard-sidebar-item"
      >
        <MdSupport
          title="Contributions"
          className={active === 3 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 3 ? 'active-text' : 'passive-text'}>
          Contributions
        </h4>
      </aside>

      <aside
        onClick={() => setActive(4)}
        className="finance-manager-dashboard-sidebar-item"
      >
        <SiGooglemessages
          title="Inbox"
          className={active === 4 ? 'active-icon' : 'passive-icon'}
        />
        <h4 className={active === 4 ? 'active-text' : 'passive-text'}>Inbox</h4>
      </aside>

      <Link
        to={'/user/profile'}
        className="finance-manager-dashboard-sidebar-item"
      >
        <IoSettings
          title="Settings"
          className={active === 5 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 5 ? 'active-text' : 'passive-text'}>
          Settings
        </h4>
      </Link>

      <aside className="finance-manager-dashboard-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={active === 6 ? 'active-icon' : 'passive-icon'}
        />

        <h4>
          <Link to={'/login'} onClick={logoutUser}>
            Log Out
          </Link>
        </h4>
      </aside>
    </section>
  );
};

export default FinanceMgtSidebar;
