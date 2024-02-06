import React, { useState } from 'react';
import { serviceData } from '../../data/Data';
import './ServicesPage.scss';
import Sacrament from '../../components/servicesForm/Sacrament';
import PrayerRequest from '../../components/servicesForm/PrayerRequest';
import SpiritualService from '../../components/servicesForm/SpiritualService';

const ServicesPage = () => {
  // Local state variables
  const [toggle, setToggle] = useState(0);

  // Function to manage tabs
  const tabsToggle = (index) => {
    setToggle(index);
  };

  return (
    <main className="service-page">
      <section className="service-container">
        <h1 className="service-title"> {serviceData.title} </h1>
        <p className="paragraph"> {serviceData.desc} </p>

        {/* Tabs and tables container */}
        <div className="tabs-forms">
          {/* Tabs */}
          <div className="blog-tabs">
            <div
              onClick={() => tabsToggle(0)}
              className={toggle === 0 ? 'tabs active-tabs' : 'tabs'}
            >
              Sacrament Services
            </div>

            <div
              onClick={() => tabsToggle(1)}
              className={toggle === 1 ? 'tabs active-tabs' : 'tabs'}
            >
              Prayer Request
            </div>

            <div
              onClick={() => tabsToggle(2)}
              className={toggle === 2 ? 'tabs active-tabs' : 'tabs'}
            >
              Spiritual Development
            </div>
          </div>

          {/* Tables */}
          <div className="service-forms">
            {/*Sacrament Service Form */}
            <div
              onClick={() => tabsToggle(0)}
              className={
                toggle === 0
                  ? 'service-form active-service-form'
                  : 'service-form'
              }
            >
              <Sacrament />
            </div>

            {/*Prayer Request Fomr */}
            <div
              onClick={() => tabsToggle(1)}
              className={
                toggle === 1
                  ? 'service-form active-service-form'
                  : 'service-form'
              }
            >
              <PrayerRequest />
            </div>

            {/*Prayer Request Fomr */}
            <div
              onClick={() => tabsToggle(2)}
              className={
                toggle === 2
                  ? 'service-form active-service-form'
                  : 'service-form'
              }
            >
              <SpiritualService />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ServicesPage;
