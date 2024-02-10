import React, { useState } from 'react';
import "./ServiceRequest.scss"
import Sacrament from '../../servicesForm/Sacrament';
import PrayerRequest from '../../servicesForm/PrayerRequest';
import SpiritualService from '../../servicesForm/SpiritualService';

const ServiceRequest = () => {
  const [active, setActive] = useState(1);
  return (
    <section className="user-service-request-container">
      <h1 className="user-service-request-title">User Service Request</h1>

      <ul className="user-service-request-tabs">
        <li
          onClick={() => setActive(1)}
          className={
            active === 1
              ? 'active-user-service-request-tab'
              : 'passive-user-service-request-tab'
          }
        >
          Sacrament Services
        </li>

        <li
          onClick={() => setActive(2)}
          className={
            active === 2
              ? 'active-user-service-request-tab'
              : 'passive-user-service-request-tab'
          }
        >
          Prayer Request
        </li>
        <li
          onClick={() => setActive(3)}
          className={
            active === 3
              ? 'active-user-service-request-tab'
              : 'passive-user-service-request-tab'
          }
        >
          Spiritual Development
        </li>
      </ul>

      {active === 1 && <Sacrament />}
      {active === 2 && <PrayerRequest />}
      {active === 3 && <SpiritualService />}
    </section>
  );
};

export default ServiceRequest;
