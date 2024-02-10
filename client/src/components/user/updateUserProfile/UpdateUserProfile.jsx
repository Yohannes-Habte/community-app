import React, { useState } from 'react';
import './UpdateUserProfile.scss';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { FaUser, FaUserAlt } from 'react-icons/fa';
import { HiOutlineEye } from 'react-icons/hi';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import { NavLink, useNavigate } from 'react-router-dom';

const UpdateUserProfile = () => {
  const navigate = useNavigate();
  // Global state variables
  // const { currentUser, loading, error } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // Local State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [image, setImage] = useState('');
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'name':
        setName(e.target.value);
        break;
      case 'email':
        setEmail(e.target.value);
        break;
      case 'password':
        setPassword(e.target.value);
        break;
      case 'phone':
        setPhone(e.target.value);
        break;
      case 'agree':
        setAgree(e.target.checked);
        break;
      default:
        break;
    }
  };

  // Update image
  const updateImage = (e) => {
    setImage(e.target.files[0]);
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Reset all state variables for the profile form
  const resetVariables = () => {
    setEmail('');
    setPassword('');
  };

  // Submit logged in user Function
  const submitUpdatedUserProfile = async (event) => {
    event.preventDefault();
  };

  return (
    <section className="update-user-profile-container">
      <h1 className="update-user-profile-title">Update Your Profile</h1>

      <figure className="image-container">
        <img className="image" src="" alt="" />
      </figure>

      <fieldset className="update-user-profile-fieldset">
        <legend className="update-user-profile-legend">User Profile</legend>
        <form
          onSubmit={submitUpdatedUserProfile}
          className="update-user-profile-form"
        >
          <div className="input-container">
            <FaUserAlt className="icon" />
            <input
              type="text"
              name={'name'}
              id={'name'}
              autoComplete="name"
              required
              value={name}
              onChange={updateChange}
              placeholder="Enter First Name and Last Name"
              className="input-field"
            />

            <label htmlFor={'firstName'} className="input-label">
              First Name
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <MdEmail className="icon" />
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              required
              value={email}
              onChange={updateChange}
              placeholder="Enter Email"
              className="input-field"
            />
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={updateChange}
              //onBlur={checkPasswordFormat}
              placeholder="Enter Password"
              className="input-field"
            />
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <span className="input-highlight"></span>
            <span onClick={displayPassword} className="password-display">
              {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
            </span>
          </div>

          <div className="input-container">
            <FaUserAlt className="icon" />
            <input
              type="text"
              name={'phone'}
              id={'phone'}
              autoComplete="phone"
              required
              value={phone}
              onChange={updateChange}
              placeholder="Enter Phone Number"
              className="input-field"
            />

            <label htmlFor={'phone'} className="input-label">
              Phone Number
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <RiLockPasswordFill className="icon" />
            <input
              type="file"
              name="image"
              id="image"
              onChange={updateImage}
              className="input-field"
            />
          </div>

          <div className="input-consent">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={agree}
              onChange={updateChange}
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
