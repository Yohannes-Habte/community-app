import axios from 'axios';
import React, { useState } from 'react';
import './AddNew.scss';
import { FaCloudUploadAlt } from 'react-icons/fa';

const AddNewUser = ({ setOpen }) => {
  // Local state variables
  const [image, setImage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'email':
        setEmail(event.target.value);
        break;
      case 'password':
        setPassword(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      case 'street':
        setStreet(event.target.value);
        break;
      case 'zipCode':
        setZipCode(event.target.value);
        break;
      case 'city':
        setCity(event.target.value);
        break;
      case 'state':
        setState(event.target.value);
        break;
      case 'country':
        setCountry(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setPhone('');
    setStreet('');
    setZipCode('');
    setCity('');
    setState('');
    setCountry('');
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload Image from the form data
    const userImage = new FormData();
    userImage.append('file', image);
    // upload preset
    userImage.append('upload_preset', 'upload');

    try {
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/dzlsa51a9/image/upload`,
        userImage
      );
      const { url } = response.data;

      // body
      const newUser = {
        image: url,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        phone: phone,
        street: street,
        zipCode: zipCode,
        city: city,
        state: state,
        country: country,
      };
      const { data } = await axios.post(
        'http://localhost:4000/api/users/register',
        newUser
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
        <h3 className="title"> Add New User </h3>
        <form onSubmit={handleSubmit} action="" className="form">
          {/* First Name */}
          <div className="input-container">
            <label htmlFor="firstName" className="input-label">
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              value={firstName}
              onChange={updateData}
              placeholder="Enter First Name"
              className="input-field"
            />
          </div>

          {/* Last Name */}
          <div className="input-container">
            <label htmlFor="lastName" className="input-label">
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              value={lastName}
              onChange={updateData}
              placeholder="Enter Last Name"
              className="input-field"
            />
          </div>

          {/* Email Address */}
          <div className="input-container">
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={updateData}
              placeholder="Enter Email"
              className="input-field"
            />
          </div>

          {/* Password */}
          <div className="input-container">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={updateData}
              placeholder="Enter Password"
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

          {/* Street Name */}
          <div className="input-container">
            <label htmlFor="phone" className="input-label">
              Street Name
            </label>
            <input
              type="text"
              name="street"
              id="street"
              value={street}
              onChange={updateData}
              placeholder="Enter Street Name"
              className="input-field"
            />
          </div>

          {/* Zip Code */}
          <div className="input-container">
            <label htmlFor="zipCode" className="input-label">
              Zip Code
            </label>
            <input
              type="text"
              name="zipCode"
              id="zipCode"
              value={zipCode}
              onChange={updateData}
              placeholder="Enter Zip Code"
              className="input-field"
            />
          </div>

          {/* City Name */}
          <div className="input-container">
            <label htmlFor="city" className="input-label">
              City Name
            </label>
            <input
              type="text"
              name="city"
              id="city"
              value={city}
              onChange={updateData}
              placeholder="Enter City Name"
              className="input-field"
            />
          </div>

          {/* State Name */}
          <div className="input-container">
            <label htmlFor="state" className="input-label">
              City Name
            </label>
            <input
              type="text"
              name="state"
              id="state"
              value={state}
              onChange={updateData}
              placeholder="Enter State Name"
              className="input-field"
            />
          </div>

          {/* Country Name */}
          <div className="input-container">
            <label htmlFor="country" className="input-label">
              Country Name
            </label>
            <input
              type="text"
              name="country"
              id="country"
              value={country}
              onChange={updateData}
              placeholder="Enter Country Name"
              className="input-field"
            />
          </div>

          <div className="file-input-container">
            <input
              type="file"
              name="image"
              id="image"
              // upload only one image
              onChange={(e) => setImage(e.target.files[0])}
              className="file-field"
            />

            <label htmlFor="image" className="file-label">
              Image: <FaCloudUploadAlt className="icon" />
            </label>
          </div>

          <button className="add-btn">Send</button>
        </form>
      </section>
    </div>
  );
};

export default AddNewUser;
