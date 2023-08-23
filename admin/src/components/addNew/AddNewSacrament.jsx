import axios from 'axios';
import React, { useState } from 'react';
import './AddNew.scss';

const AddNewSacrament = ({ setOpen }) => {
  // Local state variables
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [phone, setPhone] = useState('');
  const [userStatus, setUserStatus] = useState('');

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'name':
        setName(event.target.value);
        break;
      case 'date':
        setDate(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      case 'userStatus':
        setUserStatus(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables
  const reset = () => {
    setName('');
    setDate('');
    setPhone('');
    setUserStatus('');
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newSacrament = {
        name: name,
        date: date,
        phone: phone,
      };

      const { data } = await axios.post(
        'http://localhost:4000/api/sacraments/new-sacrament',
        newSacrament
      );
      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="add">
      <section className="modal">
        <span onClick={() => setOpen(false)} className="close">
          X
        </span>
        <h3 className="title"> Add New </h3>
        <form onSubmit={handleSubmit} action="" className="form">
          {/* First Name */}
          <div className="input-container">
            <label htmlFor="name" className="input-label">
              Sacrament Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={updateData}
              placeholder="Enter Sacrament Name"
              className="input-field"
            />
          </div>

          {/* Date of sacrament service */}
          <div className="input-container">
            <label htmlFor="date" className="input-label">
              Sacrament Service Date
            </label>
            <input
              type="text"
              name="date"
              id="date"
              value={date}
              onChange={updateData}
              placeholder="Enter Sacrament Service Date"
              className="input-field"
            />
          </div>

          {/* Phone Number */}
          <div className="input-container">
            <label htmlFor="phone" className="input-label">
              Phone Number
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              value={phone}
              onChange={updateData}
              placeholder="Enter Phone Number"
              className="input-field"
            />
          </div>

          {/* Religious recognition status */}
          <div className="input-container">
            <label htmlFor="userStatus" className="input-label">
              Phone Number
            </label>
            <input
              type="file"
              name="userStatus"
              id="userStatus"
              value={userStatus}
              onChange={updateData}
              className="input-field"
            />
          </div>

          <button className="add-btn">Send</button>
        </form>
      </section>
    </div>
  );
};

export default AddNewSacrament;
