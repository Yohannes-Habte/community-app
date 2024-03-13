import React, { useEffect, useState } from 'react';
import './UpdateUserProfile.scss';
import { FaLaptopCode, FaMapMarker, FaPhone, FaUserAlt } from 'react-icons/fa';
import { MdLocationPin } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';
import { GrStatusInfo } from 'react-icons/gr';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  userUpdateFilure,
  userUpdateStart,
  userUpdateSuccess,
} from '../../../redux/reducers/userReducer';

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  // Global state variables
  const { loading, error, currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local State variables
  // Local state variables
  const [firstName, setFirstName] = useState(currentUser.firstName || '');
  const [lastName, setLastName] = useState(currentUser.lastName || '');
  const [image, setImage] = useState('');
  const [maritalStatus, setMaritalStatus] = useState(
    currentUser.maritalStatus || ''
  );
  const [phone, setPhone] = useState(currentUser.phone || '');
  const [street, setStreet] = useState(currentUser.street || '');
  const [zipCode, setZipCode] = useState(currentUser.zipCode || '');
  const [city, setCity] = useState(currentUser.city || '');
  const [state, setState] = useState(currentUser.state || '');
  const [country, setCountry] = useState(currentUser.country || '');
  const [agree, setAgree] = useState(false);
  const [agreeChanged, setAgreeChanged] = useState(false);

  useEffect(() => {
    console.log(maritalStatus);
  });

  // Update image
  const updateImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Function that is used to update the state variables of the registration form
  const update = (event) => {
    switch (event.target.name) {
      case 'firstName':
        setFirstName(event.target.value);
        break;
      case 'lastName':
        setLastName(event.target.value);
        break;
      case 'maritalStatus':
        setMaritalStatus(event.target.value);
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
      case 'agree':
        setAgree(!agree);
        setAgreeChanged(true);
        break;
      default:
        break;
    }
  };

  // Submit logged in user Function
  const submitUpdatedUserProfile = async (event) => {
    event.preventDefault();

    try {
      dispatch(userUpdateStart());
      const updateUserInfo = {
        firstName: firstName,
        lastName: lastName,
        image: image,
        maritalStatus: maritalStatus,
        phone: phone,
        street: street,
        zipCode: zipCode,
        city: city,
        state: state,
        country: country,
        agree: agree,
      };

      const { data } = await axios.put(
        `http://localhost:8000/api/auth/update/${currentUser._id}`,
        updateUserInfo
      );

      dispatch(userUpdateSuccess(data.user));
    } catch (error) {
      dispatch(userUpdateFilure(error.response.data.message));
    }
  };

  return (
    <section className="update-user-profile-container">
      <h2 className="update-user-profile-title">Update Your Profile</h2>

      <figure className="image-container">
        <img className="image" src="" alt="" />
      </figure>

      <fieldset className="update-user-profile-fieldset">
        <figure className="update_user-image-container">
          <img
            className="update-user-image"
            src="https://i.ibb.co/4pDNDk1/avatar.png"
            alt=""
          />
          <legend className="update-user-legend">User Name</legend>
        </figure>
        <form
          onSubmit={submitUpdatedUserProfile}
          className="update-user-profile-form"
        >
          <div className="inputs-wrapper">
            {/* User first name */}
            <div className="input-container">
              <FaUserAlt className="update-user-account-icon" />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={update}
                placeholder="First Name"
                className="input-field"
              />

              <label htmlFor="firstName" className="input-label">
                First Name
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User last name */}
            <div className="input-container">
              <FaUserAlt className="update-user-account-icon" />
              <input
                type="text"
                name="lastName"
                id="lastName"
                value={lastName}
                onChange={update}
                placeholder="Last Name"
                className="input-field"
              />

              <label htmlFor="lastName" className="input-label">
                Last Name
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User Marital Status*/}
            <div className="input-container">
              <GrStatusInfo className="update-user-account-icon" />
              <input
                type="text"
                name="maritalStatus"
                id="maritalStatus"
                value={maritalStatus}
                onChange={update}
                placeholder=" Marital Status"
                className="input-field"
              />

              <label htmlFor="maritalStatus" className="input-label">
                Marital Status
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User Image */}
            <div className="input-container">
              <RiLockPasswordFill className="update-user-account-icon" />
              <input
                type="file"
                name="image"
                id="image"
                onChange={updateImage}
                className="input-field"
              />
            </div>

            {/* User phone number */}
            <div className="input-container">
              <MdLocationPin className="update-user-account-icon" />
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={update}
                placeholder="Phone Number"
                className="input-field"
              />

              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User street adddress */}
            <div className="input-container">
              <FaPhone className="update-user-account-icon" />
              <input
                type="text"
                name="street"
                id="street"
                value={street}
                onChange={update}
                placeholder="Street Name"
                className="input-field"
              />

              <label htmlFor="street" className="input-label">
                Street Name
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User zip code */}
            <div className="input-container">
              <FaLaptopCode className="update-user-account-icon" />
              <input
                type="text"
                name="zipCode"
                id="zipCode"
                value={zipCode}
                onChange={update}
                placeholder="Zip Code"
                className="input-field"
              />

              <label htmlFor="zipCode" className="input-label">
                Zip Code
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User city */}
            <div className="input-container">
              <MdLocationPin className="update-user-account-icon" />
              <input
                type="text"
                name="city"
                id="city"
                value={city}
                onChange={update}
                placeholder="City Name"
                className="input-field"
              />
              <label htmlFor="city" className="input-label">
                City
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User state */}
            <div className="input-container">
              <MdLocationPin className="update-user-account-icon" />
              <input
                type="text"
                name="state"
                id="state"
                value={state}
                onChange={update}
                placeholder="State Name"
                className="input-field"
              />
              <label htmlFor="state" className="input-label">
                State
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User country */}
            <div className="input-container">
              <FaMapMarker className="update-user-account-icon" />
              <input
                type="text"
                name="country"
                id="country"
                value={country}
                onChange={update}
                placeholder="Country Name"
                className="input-field"
              />
              <label htmlFor="country" className="input-label">
                Country
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

          {/* User Consent */}
          <div className="input-consent">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={agree}
              className="consent-checkbox"
            />
            <label htmlFor="agree" className="accept">
              I accept
            </label>

            <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
          </div>

          <button type="submit" className="update-user-profile-btn">
            Update
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default UpdateUserProfile;
