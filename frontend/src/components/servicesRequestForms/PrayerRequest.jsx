import React, { useState } from 'react';
import './Form.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import { serviceData } from '../../data/Data';
import {
  API,
  cloud_URL,
  cloud_name,
  upload_preset,
} from '../../utiles/securitiy/secreteKey';
import { useDispatch, useSelector } from 'react-redux';
import {
  prayerRequestFailure,
  prayerRequestStart,
  prayerRequestSuccess,
} from '../../redux/reducers/prayerReducer';
import ButtonLoader from '../../utiles/loader/buttonLoader/ButtonLoader';

const PrayerRequest = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.prayer);
  const dispatch = useDispatch();

  // Local state variables
  const [prayerInfo, setPrayerInfo] = useState({});
  const [files, setFiles] = useState('');

  // Handle change fuction
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPrayerInfo({ ...prayerInfo, [name]: value });
  };

  // Reset input variables

  // Login and Submit Function
  const handlePrayerSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(prayerRequestStart());
      // Image validation
      const userFile = new FormData();
      userFile.append('file', files);
      userFile.append('cloud_name', cloud_name);
      userFile.append('upload_preset', upload_preset);

      // Save image to cloudinary
      const response = await axios.post(cloud_URL, userFile);
      const { url } = response.data;
      // The body
      const newPrayer = {
        name: prayerInfo.name,
        date: prayerInfo.date,
        phone: prayerInfo.phone,
        userStatus: url,
      };

      const { data } = await axios.post(
        `${API}/prayers/${currentUser._id}/new-prayer-request`,
        newPrayer
      );
      dispatch(prayerRequestSuccess(data.prayer));
      toast.success(data.message);
      event.target.reset();
    } catch (err) {
      dispatch(prayerRequestFailure(err.response.data.message));
    }
  };

  return (
    <section className="service-form-container">
      <h1 className="service-form-title"> Prayer Request </h1>

      {error ? <p className="error-message"> {error} </p> : null}

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
            onChange={(e) => setFiles(e.target.files[0])}
            className="file-field"
          />

          <label htmlFor="file" className="file-label">
            Upload Germany Religious Recognition Document{' '}
            <FaCloudUploadAlt className="icon" />
          </label>

          <span className="input-highlight"></span>
        </div>
        <button className="service-request-btn" disabled={loading}>
          {loading ? (
            <span className="loading">
              <ButtonLoader /> Loading...
            </span>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default PrayerRequest;
