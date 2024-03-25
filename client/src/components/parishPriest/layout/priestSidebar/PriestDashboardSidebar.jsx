import React from 'react';
import './PriestDashboardSidebar.scss';
import { MdDashboard } from 'react-icons/md';
import { FaUsers } from 'react-icons/fa6';
import './PriestDashboardSidebar.scss';
import { FaCross } from 'react-icons/fa';
import { SiEventstore } from 'react-icons/si';
import { IoSettings } from 'react-icons/io5';
import { GiSunPriest } from 'react-icons/gi';
import { ImUsers } from 'react-icons/im';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdLogOut } from 'react-icons/io';
import {
  userLogoutFailure,
  userLogoutStart,
  userLogoutSuccess,
} from '../../../../redux/reducers/userReducer';
import axios from 'axios';
import { API } from '../../../../utiles/securitiy/secreteKey';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const PriestDashboardSidebar = ({ active, setActive }) => {
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
    <section className="parish-priest-dashboard-sidebar-wrapper">
      <h1 className="parish-priest-dashboard-sidebar-title">Dashboard</h1>

      <aside
        onClick={() => setActive(1)}
        className="parish-priest-dashboard-sidebar-item"
      >
        <MdDashboard
          title="Dashboar Overview"
          className={active === 1 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 1 ? 'active-text' : 'passive-text'}>
          Dashboard Overview
        </h4>
      </aside>

      <aside
        onClick={() => setActive(2)}
        className="parish-priest-dashboard-sidebar-item"
      >
        <FaUsers
          title="Parishioners"
          className={active === 2 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 2 ? 'active-text' : 'passive-text'}>
          Parishioners
        </h4>
      </aside>

      <aside
        onClick={() => setActive(3)}
        className="parish-priest-dashboard-sidebar-item"
      >
        <FaCross
          title="Services"
          className={active === 3 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 3 ? 'active-text' : 'passive-text'}>
          Services
        </h4>
      </aside>

      <aside
        onClick={() => setActive(4)}
        className="parish-priest-dashboard-sidebar-item"
      >
        <SiEventstore
          title="Events"
          className={active === 4 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 4 ? 'active-text' : 'passive-text'}>
          Events
        </h4>
      </aside>

      <aside
        onClick={() => setActive(5)}
        className="parish-priest-dashboard-sidebar-item"
      >
        <GiSunPriest
          title="New Priest"
          className={active === 5 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 5 ? 'active-text' : 'passive-text'}>
          Priest Delegation
        </h4>
      </aside>

      <aside
        onClick={() => setActive(6)}
        className="parish-priest-dashboard-sidebar-item"
      >
        <ImUsers
          title="Church Committee"
          className={active === 6 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 6 ? 'active-text' : 'passive-text'}>
          Church Committee
        </h4>
      </aside>

      <Link
        to={'/user/profile'}
        className="parish-priest-dashboard-sidebar-item"
      >
        <IoSettings
          title="Settings"
          className={active === 7 ? 'active-icon' : 'passive-icon'}
        />

        <h4 className={active === 7 ? 'active-text' : 'passive-text'}>
          Settings
        </h4>
      </Link>

      <aside className="parish-priest-dashboard-sidebar-item">
        <IoMdLogOut
          title="Log Out"
          className={active === 8 ? 'active-icon' : 'passive-icon'}
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

export default PriestDashboardSidebar;
