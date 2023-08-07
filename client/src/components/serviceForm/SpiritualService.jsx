import React, { useState } from 'react';
import { FaCloudUploadAlt } from 'react-icons/fa';
import { serviceData } from '../../data/Data';
import './Form.scss';

const SpiritualService = () => {
  const [files, setFiles] = useState('');
  const [requestInfo, setRequestInfo] = useState({});

  // Handle change fuction
  const handleChange = (e) => {
    setRequestInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  return (
    <div className="church-service">
      {/* Left container */}
      <figure className="image-container">
        <img
          src={
            files
              ? URL.createObjectURL(files[0])
              : 'https://icon-library.com/images/no-image-icon//no-image-icon-0.jpg'
          }
          alt=""
          className="image"
        />
      </figure>

      {/* Right container */}
      <form action="" className="form">
        {serviceData.spiritualAdvice.map((input) => {
          return (
            <div key={input.id} className="input-container">
              <label htmlFor={input.id}> {input.label} </label>
              <input
                type={input.type}
                name={input.name}
                id={input.id}
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
            <FaCloudUploadAlt className="icon" />{' '}
          </label>
        </div>
        <button className="btn">Send</button>
      </form>
    </div>
  );
};

export default SpiritualService;
