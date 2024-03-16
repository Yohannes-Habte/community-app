import React, { useState } from 'react';
import './UserChangePassword.scss';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { validPassword } from '../../../utiles/validation/validate';
import { toast } from 'react-toastify';
import { API } from '../../../utiles/securitiy/secreteKey';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import {
  userChangePasswordFailure,
  userChangePasswordStart,
  userChangePasswordSuccess,
} from '../../../redux/reducers/userReducer';
import ButtonLoader from '../../../utiles/loader/buttonLoader/ButtonLoader';

const UserChangePassword = () => {
  const navigate = useNavigate();
  // Global state variables
  const { changePasswordLoading, error, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();

  // Local state variables
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  // Update input data
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'oldPassword':
        setOldPassword(e.target.value);
        break;
      case 'newPassword':
        setNewPassword(e.target.value);
        break;
      case 'confirmNewPassword':
        setConfirmNewPassword(e.target.value);
        break;
      default:
        break;
    }
  };

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Reset all state variables
  const resetVariables = () => {
    setOldPassword('');
    setNewPassword('');
    setConfirmNewPassword('');
  };

  // Handle change password
  const passwordChangeHandler = async (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      return toast.error('Passwords did not match!');
    }

    if (!validPassword(oldPassword)) {
      return toast.error('Old password is invalid!');
    }

    if (!validPassword(newPassword)) {
      return toast.error(
        'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character'
      );
    }

    try {
      dispatch(userChangePasswordStart());

      const changeUserpassword = {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,
      };
      const { data } = await axios.put(
        `${API}/auth/change-password/${currentUser._id}`,
        changeUserpassword
      );
      dispatch(userChangePasswordSuccess(data.changePassword));
      toast.success(data.message);
      resetVariables();
      navigate('/login');
    } catch (error) {
      dispatch(userChangePasswordFailure(error.response.data.message));
    }
  };

  return (
    <section className="user-change-password-container">
      <h2 className="user-change-password-title">Change Password</h2>

      {error ? <p className="error-message"> {error} </p> : null}

      <form
        onSubmit={passwordChangeHandler}
        action=""
        className="user-change-password-form"
      >
        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="oldPassword"
            id="oldPassword"
            autoComplete="current-password"
            required
            value={oldPassword}
            onChange={updateChange}
            placeholder="Enter Old Password"
            className="input-field"
          />
          <label htmlFor="oldPassword" className="input-label">
            Old Password
          </label>
          <span className="input-highlight"></span>
          <span onClick={displayPassword} className="password-display">
            {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
          </span>
        </div>

        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="newPassword"
            id="newPassword"
            autoComplete="current-password"
            value={newPassword}
            onChange={updateChange}
            placeholder="Enter New Password"
            className="input-field"
          />
          <label htmlFor="password" className="input-label">
            New Password
          </label>
          <span className="input-highlight"></span>
          <span onClick={displayPassword} className="password-display">
            {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
          </span>
        </div>

        <div className="input-container">
          <RiLockPasswordFill className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            name="confirmNewPassword"
            id="confirmNewPassword"
            autoComplete="current-password"
            value={confirmNewPassword}
            onChange={updateChange}
            placeholder="Confirm New Password"
            className="input-field"
          />
          <label htmlFor="confirmNewPassword" className="input-label">
            Confirm New Password
          </label>
          <span className="input-highlight"></span>
          <span onClick={displayPassword} className="password-display">
            {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
          </span>
        </div>

        <button
          className="user-change-password-btn"
          disabled={changePasswordLoading}
        >
          {changePasswordLoading ? (
            <span className="loading">
              <ButtonLoader /> Loading...
            </span>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </section>
  );
};

export default UserChangePassword;
