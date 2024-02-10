import React, { useContext, useState } from 'react';
import { serviceData } from '../../data/Data';
import './Form.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { UserContext } from '../../contexts/user/UserProvider';
import { ACTION } from '../../contexts/user/UserReducer';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet-async';
import ErrorMessage from '../../utiles/errorMessage/ErrorMessage';

const Sacrament = () => {
  // Global state variables
  const { user, loading, error, dispatch } = useContext(UserContext);

  // Local state variables
  const [sacramentInfo, setSacramentInfo] = useState({});
  const [files, setFiles] = useState('');

  // Handle change fuction
  const handleChange = (e) => {
    setSacramentInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Login and Submit Function
  const handleSacramentSubmit = async (event) => {
    event.preventDefault();

    dispatch({ type: ACTION.SACRMENT_SEND_START });

    try {
      // The body
      const newSacrament = {
        name: sacramentInfo.name,
        date: sacramentInfo.date,
        phone: sacramentInfo.phone,
        userStatus: sacramentInfo.userStatus,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/sacraments/new-sacrament',
        newSacrament
      );

      dispatch({ type: ACTION.PRAYER_SEND_SUCCESS, payload: data });

      localStorage.setItem('sacrament', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: ACTION.PRAYER_SEND_FAIL,
        payload: toast.error(ErrorMessage(err)),
      });
    }
  };

  return (
    <section className="service-form-container">
      <h1 className="service-form-title"> Sacrament Service Request </h1>
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
            onChange={(e) => setFiles(e.target.files)}
            className="file-field"
          />

          <label htmlFor="file" className="file-label">
            Upload Germany Religious Recognition Document{' '}
            <FaCloudUploadAlt className="icon" />
          </label>
        </div>
        <button className="service-request-btn">Send</button>
      </form>
    </section>
  );
};

export default Sacrament;
