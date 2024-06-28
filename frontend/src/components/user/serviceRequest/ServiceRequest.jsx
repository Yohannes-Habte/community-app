import React, { useState } from 'react';
import './ServiceRequest.scss';
import PrayerRequest from '../../servicesRequestForms/PrayerRequest';
import SacramentRequest from '../../servicesRequestForms/SacramentRequest';
import SpiritualService from '../../servicesRequestForms/SpiritualService';

const ServiceRequest = () => {
  const [active, setActive] = useState(1);
  return (
    <section className="user-service-request-container">
      <h1 className="user-service-request-title">WHAT ARE YOU LOOKING FOR?</h1>

      <p className='service-paragraph'>
        Jesus asked the women “What are you looking for?” In this spirit, Holy
        Saviour will serve parishioners in all sacramental services, in prayer
        on special occasions and in spiritual development. If you would like to
        use at least one of these services, please complete the form below.
      </p>

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

      {active === 1 && <SacramentRequest />}
      {active === 2 && <PrayerRequest />}
      {active === 3 && <SpiritualService />}
    </section>
  );
};

export default ServiceRequest;
