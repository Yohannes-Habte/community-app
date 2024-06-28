import React, { useState, useRef, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import {
  FaLaptopCode,
  FaMapMarker,
  FaPhone,
  FaTimes,
  FaUserAlt,
} from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import "./UserSignupPage.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import {
  userRegisterFailure,
  userRegisterStart,
  userRegisterSuccess,
} from "../../redux/reducers/userReducer";
import ButtonLoader from "../../utiles/loader/buttonLoader/ButtonLoader";
import { API } from "../../utiles/securitiy/secreteKey";
import { validEmail, validPassword } from "../../utiles/validation/validate";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  phone: "",
  street: "",
  zipCode: "",
  city: "",
  state: "",
  country: "",
};

const UserSignupPage = () => {
  // Global state variables
  const { error, registerLoading, currentUser } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  // to navigate register page
  const navigate = useNavigate();

  // Local state variables
  const [userData, setUserData] = useState(initialState);
  const [agree, setAgree] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    firstName,
    lastName,
    email,
    confirmEmail,
    password,
    confirmPassword,
    phone,
    street,
    zipCode,
    city,
    state,
    country,
  } = userData;

  // If a user is logged in, they cannot access the login page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

  // Function to show/hide password
  const displayPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Function that display and hide the fonfirm password
  const displayConfirmPassword = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // State variables that shows the condition of the password requirements
  const [letterCase, setLetterCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

  // Password strength checker icons
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;

  // Function to switch icon
  const switchIcon = (condition) => {
    if (condition) {
      return checkIcon;
    } else {
      return timesIcon;
    }
  };

  useEffect(() => {
    // Check for uppercase and lowercase letters
    if (password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
      setLetterCase(true);
    } else {
      setLetterCase(false);
    }

    // Check for numbers
    if (password.match(/([0-9])/)) {
      setNumber(true);
    } else {
      setNumber(false);
    }

    // Check for special character
    if (password.match(/([§,$,!,%,@,#,^,*,?,_,~])/)) {
      setSpecialCharacter(true);
    } else {
      setSpecialCharacter(false);
    }

    // Check for password length
    if (password.length >= 8) {
      setPasswordLength(true);
    } else {
      setPasswordLength(false);
    }
  }, [password]);

  // Function that is used to update the state variables of the registration form
  const update = (event) => {
    switch (event.target.name) {
      case "showPassword":
        setShowPassword(false);
        break;

      case "showConfirmPassword":
        setShowConfirmPassword(false);
        break;

      default:
        break;
    }
  };

  // Function to reset all the state variables
  const resetAllEnteredData = () => {
    setUserData({
      firstName: "",
      lastName: "",
      email: "",
      confirmEmail: "",
      password: "",
      confirmPassword: "",
      phone: "",
      street: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    });
    setAgree(false);
  };

  // Function to register the user
  const SubmitRegisteredUser = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Emails did not match");
    }

    if (email !== confirmEmail) {
      toast.error("Passwords did not match");
    }

    if (!validEmail(email)) {
      return toast.error("Please enter a valid email");
    }

    if (!validPassword(password)) {
      return toast.error(
        "Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character"
      );
    }

    try {
      dispatch(userRegisterStart());

      const userData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        confirmEmail: confirmEmail,
        password: password,
        confirmPassword: confirmPassword,
        phone: phone,
        street: street,
        zipCode: zipCode,
        city: city,
        state: state,
        country: country,
      };
      const { data } = await axios.post(`${API}/auth/register`, userData);

      dispatch(userRegisterSuccess(data.user));
      toast.success(data.message);
      resetAllEnteredData();
      navigate("/login");
    } catch (err) {
      dispatch(userRegisterFailure(err.response.message));
    }
  };

  return (
    <main className="register-page">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>

      <section className="register-container">
        <h1 className="user-signup-title"> Create an Account for Free</h1>

        {error ? <p className="error-message"> {error} </p> : null}

        <fieldset className="register-field">
          <figure className="user-image-container">
            <img
              className="user-image"
              src="https://i.ibb.co/4pDNDk1/avatar.png"
              alt=""
            />
            <legend className="register-legend">User Name</legend>
          </figure>

          <form
            action=""
            onSubmit={SubmitRegisteredUser}
            className="register-form"
          >
            <div className="register-input-fields-container">
              {/* User first name */}
              <div className="input-container">
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  id="firstName"
                  value={firstName}
                  onChange={handleChange}
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
                <FaUserAlt className="input-icon" />
                <input
                  type="text"
                  name="lastName"
                  id="lastName"
                  value={lastName}
                  onChange={handleChange}
                  placeholder="Last Name"
                  className="input-field"
                />

                <label htmlFor="lastName" className="input-label">
                  Last Name
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* User email adddress */}
              <div className="input-container">
                <MdEmail className="input-icon" />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="input-field"
                />
                <label htmlFor="email" className="input-label">
                  Email Address
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* User confirm email adddress */}
              <div className="input-container">
                <MdEmail className="input-icon" />
                <input
                  type="email"
                  name="confirmEmail"
                  id="confirmEmail"
                  value={confirmEmail}
                  onChange={handleChange}
                  placeholder="Confirm Email"
                  className="input-field"
                />
                <label htmlFor="confirmEmail" className="input-label">
                  Email Address
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* User password */}
              <div className="input-container">
                <RiLockPasswordFill className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="input-field"
                />
                <label htmlFor="password" className="input-label">
                  Password
                </label>
                <span className="input-highlight"></span>
                <span onClick={displayPassword} className="password-display">
                  {showPassword ? (
                    <AiFillEyeInvisible className="icon" />
                  ) : (
                    <AiFillEye className="icon" />
                  )}
                </span>
              </div>

              {/* User confirm password */}
              <div className="input-container">
                <RiLockPasswordFill className="input-icon" />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="Confirm Password"
                  className="input-field"
                />
                <label htmlFor="confirmPassword" className="input-label">
                  Confirm Password
                </label>
                <span className="input-highlight"></span>
                <span
                  onClick={displayConfirmPassword}
                  className="confirm-password-display"
                >
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible className="icon" />
                  ) : (
                    <AiFillEye className="icon" />
                  )}
                </span>
              </div>

              {/* User phone number */}
              <div className="input-container">
                <MdLocationPin className="input-icon" />
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  value={phone}
                  onChange={handleChange}
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
                <FaPhone className="input-icon" />
                <input
                  type="text"
                  name="street"
                  id="street"
                  value={street}
                  onChange={handleChange}
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
                <FaLaptopCode className="input-icon" />
                <input
                  type="text"
                  name="zipCode"
                  id="zipCode"
                  value={zipCode}
                  onChange={handleChange}
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
                <MdLocationPin className="input-icon" />
                <input
                  type="text"
                  name="city"
                  id="city"
                  value={city}
                  onChange={handleChange}
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
                <MdLocationPin className="input-icon" />
                <input
                  type="text"
                  name="state"
                  id="state"
                  value={state}
                  onChange={handleChange}
                  placeholder="State Name"
                  className="input-field"
                />
                <label htmlFor="state" className="input-label">
                  State Name
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* User country */}
              <div className="input-container">
                <FaMapMarker className="input-icon" />
                <input
                  type="text"
                  name="country"
                  id="country"
                  value={country}
                  onChange={handleChange}
                  placeholder="Country Name"
                  className="input-field"
                />
                <label htmlFor="country" className="input-label">
                  Country Name
                </label>
                <span className="input-highlight"></span>
              </div>
            </div>

            <div className="consent-and-others-container">
              <div className="consent-terms-button-login-container">
                <div className="register-consent">
                  <input
                    type="checkbox"
                    name="agree"
                    onChange={() => setAgree(!agree)}
                    className="register-consent-input"
                  />
                  <span className="accept">I accept</span>
                  <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
                </div>

                <button className="register-button" disabled={registerLoading}>
                  {registerLoading ? (
                    <span className="loading">
                      <ButtonLoader /> Loading...
                    </span>
                  ) : (
                    "Sign Up"
                  )}
                </button>
                <p className="haveAccount">
                  Already have an account?
                  <NavLink className="login-link" to="/login">
                    Log In
                  </NavLink>
                </p>
              </div>

              <div className="password-preconditions">
                <aside className="password-checkbox">
                  <h3>Checking Password Confirmation</h3>
                  <p className="text">
                    {switchIcon(letterCase)} &nbsp; Lowercase & UpperCase
                  </p>

                  <p className="text">
                    {switchIcon(number)} &nbsp; Number (0-9)
                  </p>

                  <p className="text">
                    {switchIcon(specialCharacter)} &nbsp; Spceial Character
                    (!%@#^*?_~)
                  </p>

                  <p className="text">
                    {switchIcon(passwordLength)} &nbsp; Minimum 8 Characters
                  </p>
                </aside>
              </div>
            </div>
          </form>
        </fieldset>
      </section>
    </main>
  );
};

export default UserSignupPage;
