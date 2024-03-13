import React, { useState } from 'react';
import './Form.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { serviceData } from '../../data/Data';

const PrayerRequest = () => {
  // Global state variables

  // Local state variables
  const [prayerInfo, setPrayerInfo] = useState({});
  const [files, setFiles] = useState('');

  // Handle change fuction
  const handleChange = (e) => {
    setPrayerInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Login and Submit Function
  const handlePrayerSubmit = async (event) => {
    event.preventDefault();

    try {
      // The body
      const newPrayer = {
        name: prayerInfo.name,
        date: prayerInfo.date,
        phone: prayerInfo.phone,
        userStatus: prayerInfo.userStatus,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/prayers/new-prayer-service',
        newPrayer
      );
    } catch (err) {}
  };

  return (
    <section className="service-form-container">
      <h1 className="service-form-title"> Prayer Request </h1>
      <form onSubmit={handlePrayerSubmit} action="" className="form">
        {serviceData.prayerRequest.map((input) => {
          return (
            <div key={input.id} className="input-container">
              <input
                type={input.type}
                name={input.name}
                id={input.id}
                onChange={handleChange}
                placeholder={input.placeholder}
                className="input-field"
              />
              <label className="input-label" htmlFor={input.id}>
                {input.label}
              </label>
              <span className="input-highlight"></span>
            </div>
          );
        })}

        {/* Photos input */}
        <div className="file-container">
          <input
            type="file"
            name="file"
            id="file"
            onChange={(e) => setFiles(e.target.files)}
            className="file-field"
          />

          <label htmlFor="file" className="file-label">
            Upload Germany Religious Recognition Document{' '}
            <FaCloudUploadAlt className="icon" />
          </label>

          <span className="input-highlight"></span>
        </div>
        <button className="service-request-btn">Send</button>
      </form>
    </section>
  );
};

export default PrayerRequest;
