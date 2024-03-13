import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { serviceData } from '../../data/Data';
import './Form.scss';
import axios from 'axios';
import { toast } from 'react-toastify';

const SpiritualService = () => {
  // Global state variables

  // Local state variables
  const [spiritualInfo, setSpiritualInfo] = useState({});
  const [files, setFiles] = useState('');

  // Handle change fuction
  const handleChange = (e) => {
    setSpiritualInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Login and Submit Function
  const handleSpiritualSubmit = async (event) => {
    event.preventDefault();

    try {
      // The body
      const newSpiritualData = {
        name: spiritualInfo.name,
        date: spiritualInfo.date,
        phone: spiritualInfo.phone,
        userStatus: spiritualInfo.userStatus,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/spiritual-developments/new',
        newSpiritualData
      );
    } catch (err) {}
  };

  return (
    <section className="service-form-container">
      <h1 className="service-form-title"> Spiritual Development Request </h1>
      <form onSubmit={handleSpiritualSubmit} action="" className="form">
        {serviceData.spiritualAdvice.map((input) => {
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
            Germany Religious Recognition Document{' '}
            <FaCloudUploadAlt className="icon" />{' '}
          </label>
        </div>
        <button className="service-request-btn">Send</button>
      </form>
    </section>
  );
};

export default SpiritualService;
