import React, { useState, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import './UserLoginPage.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  userLoginFailure,
  userLoginStart,
  userLoginSuccess,
} from '../../redux/reducers/userReducer';
import ButtonLoader from '../../utiles/loader/buttonLoader/ButtonLoader';
import { API } from '../../utiles/securitiy/secreteKey';

const UserLoginPage = () => {
  // Global state variables
  const { loginLoading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function that display and hide the fonfirm password
  const displayConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Validation of the login form
  const [emailChange, setEmailChange] = useState(false);
  const [passwordChange, setPasswordChange] = useState(false);

  // useRef hook to focus on specific issues
  const emailRef = useRef();
  const passwordRef = useRef();

  // Function handling Email Validation
  const checkEmailFormat = () => {
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);
    if (emailRegex) {
      emailRef.current.className = 'errorInvisible';
      //emailRef.current.style.display = "none"
    } else {
      emailRef.current.className = 'errorVisible';
      //passwordRef.current.style.display = "block"
    }
  };

  // Function handling Password validation
  const checkPasswordFormat = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      );
    if (passwordRegex) {
      passwordRef.current.className = 'errorInvisible';
      //passwordRef.current.style.display = "none"
    } else {
      passwordRef.current.className = 'errorVisible';
      //passwordRef.current.style.display = "block"
    }
  };

  // Function to update login user data
  const updateUserLoginData = (event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        setEmailChange(true);
        break;
      case 'password':
        setPassword(event.target.value);
        setPasswordChange(true);
        break;
      case 'showPassword':
        setShowPassword(false);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const resetVariables = () => {
    setEmail('');
    setEmailChange(false);
    setPassword('');
    setPasswordChange(false);
  };

  // Login and Submit Function
  const submitLoginUser = async (event) => {
    event.preventDefault();

    if (!email) {
      toast.error('Please enter your email!');
    } else if (!password) {
      toast.error('Please enter password!');
    }

    try {
      dispatch(userLoginStart());
      // The body
      const loginUser = {
        email: email,
        password: password,
      };
      const { data } = await axios.post(`${API}/auth/login`, loginUser);

      if (data.success === false) {
        dispatch(userLoginFailure(data.user.message));
        return;
      }

      dispatch(userLoginSuccess(data.user));
      toast.success(data.message);
      resetVariables();
      navigate('/user/profile');
    } catch (err) {
      dispatch(userLoginFailure(err.response.data.message));
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Sign In </title>
      </Helmet>

      <section className="login-page-container">
        <h1 className="login-page-title"> Welcome To Your Account </h1>
        {error ? <p className="error-message"> {error} </p> : null}

        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitLoginUser} className="login-form">
            {/* Email input container */}
            <div className="input-container">
              <MdEmail className="icon" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={updateUserLoginData}
                placeholder="Enter Email"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Email Address
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* Password input container */}
            <div className="input-container">
              <RiLockPasswordFill className="icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={password}
                onChange={updateUserLoginData}
                //onBlur={checkPasswordFormat}
                placeholder="Enter Password"
                className="input-field"
              />
              <label htmlFor="" className="input-label">
                Password
              </label>
              <span className="input-highlight"></span>
              <span onClick={displayPassword} className="password-display">
                {showPassword ? <AiFillEyeInvisible /> : <HiOutlineEye />}
              </span>
            </div>

            {/* Log in checkbox and forgot password */}
            <div className="login-checkbox-forgot-password">
              <div className="login-checkbox-keep-signed-in">
                <input
                  type="checkbox"
                  name="login"
                  className="login-checkbox"
                />
                <span>Keep me signed in</span>
              </div>

              <Link className="forgot-password" to={'/forgot-password'}>
                Forgot your password?{' '}
              </Link>
            </div>

            {/* Button for log in form */}
            <button className="login-button" disabled={loginLoading}>
              {loginLoading ? (
                <span className="loading">
                  <ButtonLoader /> Loading...
                </span>
              ) : (
                'Log In'
              )}
            </button>

            {/* Do not have an account, Sign Up */}
            <p className="have-no-account">
              Don't have an account?
              <NavLink className="sign-up" to="/signup">
                Sign Up
              </NavLink>
            </p>
          </form>
        </fieldset>
      </section>
    </main>
  );
};

export default UserLoginPage;
