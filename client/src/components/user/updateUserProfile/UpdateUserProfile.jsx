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
  clearErrors,
  userUpdateFailure,
  userUpdateStart,
  userUpdateSuccess,
} from '../../../redux/reducers/userReducer';
import ButtonLoader from '../../../utiles/loader/buttonLoader/ButtonLoader';
import { toast } from 'react-toastify';
import {
  API,
  cloud_URL,
  cloud_name,
  upload_preset,
} from '../../../utiles/securitiy/secreteKey';
import UserAddress from '../address/UserAddress';
import UserChangePassword from '../changePassword/UserChangePassword';
import MonthlyContribution from '../contribution/MonthlyContribution';
import AllUserServices from '../userServices/AllUserServices';
import ServiceRequest from '../serviceRequest/ServiceRequest';
import UserInbox from '../inbox/UserInbox';

const UpdateUserProfile = ({ isActive }) => {
  const navigate = useNavigate();
  // Global state variables
  const { updateLoading, error, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // Local State variables
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

  // If user is not logged in, user will not access profile page
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  });

  // Display error on browser
  useEffect(() => {
    if (error) {
      toast.error(error);

      // To clear error
      dispatch(clearErrors());
    }
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
      default:
        break;
    }
  };

  // Submit logged in user Function
  const updateUserAccount = async (event) => {
    event.preventDefault();

    try {
      dispatch(userUpdateStart());

      // Image validation
      const userPhoto = new FormData();
      userPhoto.append('file', image);
      userPhoto.append('cloud_name', cloud_name);
      userPhoto.append('upload_preset', upload_preset);

      // Save image to cloudinary
      const response = await axios.post(cloud_URL, userPhoto);
      const { url } = response.data;

      const updateUserInfo = {
        firstName: firstName,
        lastName: lastName,
        image: url,
        maritalStatus: maritalStatus,
        phone: phone,
        street: street,
        zipCode: zipCode,
        city: city,
        state: state,
        country: country,
      };

      const { data } = await axios.put(
        `${API}/auth/update/${currentUser._id}`,
        updateUserInfo
      );

      dispatch(userUpdateSuccess(data.user));
      toast.success(data.message);
    } catch (error) {
      dispatch(userUpdateFailure(error.response.data.message));
    }
  };

  return (
    <article className="user-profile-container">
      {isActive === 1 && (
        <section className="update-user-profile-wrapper">
          <h2 className="update-user-profile-title">Update Your Profile</h2>

          {error ? <p className="error-message"> {error} </p> : null}

          <fieldset className="update-user-profile-fieldset">
            <figure className="update_user-image-container">
              <img
                className="update-user-image"
                src={
                  currentUser
                    ? currentUser.image
                    : 'https://i.ibb.co/4pDNDk1/avatar.png'
                }
                alt={currentUser.firstName}
              />
              <legend className="update-user-legend">
                {currentUser.firstName} {currentUser.lastName}
              </legend>
            </figure>
            <form
              onSubmit={updateUserAccount}
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
                  className="consent-checkbox"
                />
                <label htmlFor="agree" className="accept">
                  I accept
                </label>

                <NavLink className={'terms-of-user'}> Terms of Use</NavLink>
              </div>

              <button
                type="submit"
                className="update-user-profile-btn"
                disabled={updateLoading}
              >
                {updateLoading ? (
                  <span className="loading">
                    <ButtonLoader /> Loading...
                  </span>
                ) : (
                  'Update'
                )}
              </button>
            </form>
          </fieldset>
        </section>
      )}

      {isActive === 2 && <UserAddress />}

      {isActive === 3 && <UserChangePassword />}

      {isActive === 4 && <MonthlyContribution />}

      {isActive === 5 && <ServiceRequest />}

      {isActive === 6 && <AllUserServices />}

      {isActive === 7 && <UserInbox />}
    </article>
  );
};

export default UpdateUserProfile;
