import React, { useState } from 'react';
import { serviceData } from '../../data/Data';
import './Form.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import {
  API,
  cloud_URL,
  cloud_name,
  upload_preset,
} from '../../utiles/securitiy/secreteKey';
import { useDispatch, useSelector } from 'react-redux';
import {
  sacramentRequestFailure,
  sacramentRequestStart,
  sacramentRequestSuccess,
} from '../../redux/reducers/sacramentReducer';
import ButtonLoader from '../../utiles/loader/buttonLoader/ButtonLoader';

const SacramentRequest = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { loading, error } = useSelector((state) => state.sacrament);
  const dispatch = useDispatch();

  // Local state variables
  const [sacramentInfo, setSacramentInfo] = useState({});
  const [files, setFiles] = useState('');

  // Handle change fuction
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSacramentInfo({ ...sacramentInfo, [name]: value });
  };

  // Login and Submit Function
  const handleSacramentSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(sacramentRequestStart());
      // Image validation
      const userFile = new FormData();
      userFile.append('file', files);
      userFile.append('cloud_name', cloud_name);
      userFile.append('upload_preset', upload_preset);

      // Save image to cloudinary
      const response = await axios.post(cloud_URL, userFile);
      const { url } = response.data;
      // The body
      const newSacrament = {
        name: sacramentInfo.name,
        date: sacramentInfo.date,
        phone: sacramentInfo.phone,
        userStatus: url,
      };

      const { data } = await axios.post(
        `${API}/sacraments/${currentUser._id}/new-sacrament`,
        newSacrament
      );
      dispatch(sacramentRequestSuccess(data.sacrament));
      toast.success(data.message);
      event.target.reset();
    } catch (err) {
      dispatch(sacramentRequestFailure(err.response.data.message));
    }
  };

  return (
    <section className="service-form-container">
      <h1 className="service-form-title"> Sacrament Service Request </h1>

      {error ? <p className="error-message"> {error} </p> : null}

      {/* Right container */}
      <form onSubmit={handleSacramentSubmit} action="" className="form">
        {serviceData.sacraments.map((input) => {
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
                {input.label}{' '}
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

export default SacramentRequest;
