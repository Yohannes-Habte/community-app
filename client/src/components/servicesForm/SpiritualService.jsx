import React, { useContext, useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { serviceData } from '../../data/Data';
import './Form.scss';
import { UserContext } from '../../contexts/user/UserProvider';
import { ACTION } from '../../contexts/user/UserReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
import ErrorMessage from '../../utiles/errorMessage/ErrorMessage';

const SpiritualService = () => {
  // Global state variables
  const { error, dispatch } = useContext(UserContext);

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

    dispatch({ type: ACTION.SPIRITUAL_SEND_START });

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

      dispatch({ type: ACTION.SPIRITUAL_SEND_SUCCESS, payload: data });

      localStorage.setItem('spiritual', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: ACTION.SPIRITUAL_SEND_FAIL,
        payload: toast.error(ErrorMessage(err)),
      });
    }
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
