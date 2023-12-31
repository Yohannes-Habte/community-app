import React, { useState, useRef, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { AiFillEyeInvisible } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';
import { FaUserAlt } from 'react-icons/fa';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { MdEmail } from 'react-icons/md';
import { RiLockPasswordFill } from 'react-icons/ri';
import './Login.scss';
import { UserContext } from '../../contexts/user/UserProvider';
import { ACTION } from '../../contexts/user/UserReducer';
import ErrorMessage from '../../utiles/ErrorMessage';

const Login = () => {
  // Global state variables
  const { user, loading, error, dispatch } = useContext(UserContext);

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

    dispatch({ type: ACTION.USER_SIGNIN_START });

    if (!email) {
      toast.error('Please enter your email!');
    } else if (!password) {
      toast.error('Please enter password!');
    }

    try {
      // The body
      const loginUser = {
        email: email,
        password: password,
      };
      const { data } = await axios.post(
        'http://localhost:4000/api/users/login',
        loginUser
      );

      dispatch({ type: ACTION.SACRMENT_SEND_SUCCESS, payload: data.details });

      //& 1. Save user in the local storage
      localStorage.setItem('user', JSON.stringify(data));
      resetVariables();
      navigate('/reports');
    } catch (err) {
      dispatch({
        type: ACTION.USER_SIGNIN_FAIL,
        payload: toast.error(ErrorMessage(err)),
      });
    }
  };

  return (
    <main className="lagin-page">
      <Helmet>
        <title> Sign In </title>
      </Helmet>

      <h1 className="login-title"> Welcome To Your Account </h1>
      <div className="login-container">
        <figure className="login-icon-container">
          <FaUserAlt className="login-icon" />
        </figure>
        <fieldset className="login-fieldset">
          <legend className="login-legend">User Login </legend>
          <form onSubmit={submitLoginUser} className="login-form">
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
            <div className="login-checkbox-forget-password">
              <div className="login-checkbox-keep-signed-in">
                <input
                  type="checkbox"
                  name="login"
                  className="login-checkbox"
                />
                <span>Keep me signed in</span>
              </div>
              <div className="forget-password">
                <a href=""> Forget your password? </a>
              </div>
            </div>
            <button className="login-button"> Log In</button>
            <p className="haveNoAccount">
              Don't have an account? <NavLink to="/register">Sign Up</NavLink>
            </p>
          </form>
        </fieldset>
      </div>
    </main>
  );
};

export default Login;
