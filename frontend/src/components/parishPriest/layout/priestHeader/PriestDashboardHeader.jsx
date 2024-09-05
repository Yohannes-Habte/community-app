import './PriestDashboardHeader.scss';
import { FaCross, FaUsers } from 'react-icons/fa';
import { GiSunPriest } from 'react-icons/gi';
import { SiEventstore } from 'react-icons/si';
import { ImUsers } from 'react-icons/im';

const PriestDashboardHeader = ({ active, setActive }) => {
  return (
    <header className="priest-dashboar-header">
      <figure className="image-container">
        <img
          className="image"
          src="https://i.ibb.co/4pDNDk1/avatar.png"
          alt=""
        />
      </figure>

      <ul className="priest-dashboar-header-items">
        <li className="priest-dashboar-header-item">
          <FaUsers
            onClick={() => setActive(2)}
            title="Parishioners"
            className={
              active === 2
                ? 'active-priest-dashboard-header-icon'
                : 'passive-priest-dashboard-header-icon'
            }
          />
        </li>

        <li className="priest-dashboar-header-item">
          <FaCross
            onClick={() => setActive(3)}
            title="Services"
            className={
              active === 3
                ? 'active-priest-dashboard-header-icon'
                : 'passive-priest-dashboard-header-icon'
            }
          />
        </li>

        <li className="priest-dashboar-header-item">
          <SiEventstore
            onClick={() => setActive(4)}
            title="Events"
            className={
              active === 4
                ? 'active-priest-dashboard-header-icon'
                : 'passive-priest-dashboard-header-icon'
            }
          />
        </li>

        <li className="priest-dashboar-header-item">
          <GiSunPriest
            onClick={() => setActive(5)}
            title="New Priest"
            className={
              active === 5
                ? 'active-priest-dashboard-header-icon'
                : 'passive-priest-dashboard-header-icon'
            }
          />
        </li>

        <li className="priest-dashboar-header-item">
          <ImUsers
            onClick={() => setActive(6)}
            title="Church Committee"
            className={
              active === 6
                ? 'active-priest-dashboard-header-icon'
                : 'passive-priest-dashboard-header-icon'
            }
          />
        </li>
      </ul>
    </header>
  );
};

export default PriestDashboardHeader;
