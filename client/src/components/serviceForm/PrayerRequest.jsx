import React, { useContext, useState } from 'react';
import { serviceData } from '../../data/Data';
import './Form.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UserContext } from '../../contexts/user/UserProvider';
import { ACTION } from '../../contexts/user/UserReducer';
import axios from 'axios';
import ErrorMessage from '../../utiles/ErrorMessage';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';

const PrayerRequest = () => {
  // Global state variables
  const { error, dispatch } = useContext(UserContext);

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

    dispatch({ type: ACTION.PRAYER_SEND_START });

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

      dispatch({ type: ACTION.PRAYER_SEND_SUCCESS, payload: data });

      localStorage.setItem('prayer', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: ACTION.PRAYER_SEND_FAIL,
        payload: toast.error(ErrorMessage(err)),
      });
    }
  };

  return (
    <div className="church-service">
      <form onSubmit={handlePrayerSubmit} action="" className="form">
        {serviceData.prayerRequest.map((input) => {
          return (
            <div key={input.id} className="input-container">
              <label htmlFor={input.id}> {input.label} </label>
              <input
                type={input.type}
                name={input.name}
                id={input.id}
                onChange={handleChange}
                placeholder={input.placeholder}
                className="input-field"
              />
            </div>
          );
        })}

        {/* Photos input */}
        <div className="files-input-container">
          <input
            type="file"
            name="file"
            id="file"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="file-field"
          />

          <label htmlFor="file" className="file-label">
            Germany Religious Recognition Document{' '}
            <FaCloudUploadAlt className="icon" />
          </label>
        </div>
        <button className="btn">Send</button>
      </form>
    </div>
  );
};

export default PrayerRequest;
