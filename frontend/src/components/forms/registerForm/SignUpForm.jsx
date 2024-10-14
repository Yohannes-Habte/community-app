import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpForm.scss";
import { FaMapMarker, FaPhone, FaTimes, FaUserAlt } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  postUserRegisterFailure,
  postUserRegisterStart,
  postUserRegisterSuccess,
} from "../../../redux/reducers/userReducer";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { API } from "../../../utiles/securitiy/secreteKey";
import { validEmail, validPassword } from "../../../utiles/validation/validate";
import Cookies from "js-cookie";

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
  agree: false,
  showPassword: false,
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const [letterCase, setLetterCase] = useState(false);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [passwordLength, setPasswordLength] = useState(false);

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
    agree,
    showPassword,
  } = formData;

  // Redirect if the user is already logged in
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  // Handle input change with debounce to optimize performance
  const changeHandler = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  }, []);

  // Password validation rules
  useEffect(() => {
    setLetterCase(/([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password));
    setNumber(/\d/.test(password));
    setSpecialCharacter(/[\W_]/.test(password)); // includes non-word characters
    setPasswordLength(password.length >= 8);
  }, [password]);

  // Reset form fields
  const resetHandler = () => setFormData(initialState);

  // Function to submit the form with validation and secure registration
  const submitHandler = async (event) => {
    event.preventDefault();

    // Email & Password validation
    if (!validEmail(email)) {
      return toast.error("Please enter a valid email.");
    }
    if (email !== confirmEmail) {
      return toast.error("Emails do not match.");
    }
    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }
    if (!validPassword(password)) {
      return toast.error(
        "Password must be at least 8 characters, contain an uppercase letter, a number, and a special character."
      );
    }

    // Check if user has accepted terms
    if (!agree) {
      return toast.error("You must accept the Terms of Use.");
    }

    try {
      dispatch(postUserRegisterStart());

      const { data } = await axios.post(`${API}/auth/register`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": Cookies.get("csrfToken"), // Example of CSRF protection
        },
      });

      dispatch(postUserRegisterSuccess(data.user));
      toast.success("Registration successful!");

      // Set secure token in cookies
      Cookies.set("token", data.token, {
        expires: 1,
        secure: true,
        sameSite: "Strict",
      });

      resetHandler();
      navigate("/login");
    } catch (err) {
      const errorMessage =
        err.response?.data?.message ||
        "Something went wrong. Please try again.";
      dispatch(postUserRegisterFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  // Password strength indicators
  const timesIcon = <FaTimes color="red" size={15} />;
  const checkIcon = <BsCheck2All color="green" size={15} />;
  const switchIcon = (condition) => (condition ? checkIcon : timesIcon);

  return (
    <form onSubmit={submitHandler} className="register-form" noValidate>
      <div className="register-input-fields-container">
        {/* First Name */}
        <div className="input-container">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={firstName}
            onChange={changeHandler}
            placeholder="First Name"
            aria-label="First Name"
            className="input-field"
          />
          <label htmlFor="firstName" className="input-label">
            First Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Last Name */}
        <div className="input-container">
          <FaUserAlt className="input-icon" />
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={lastName}
            onChange={changeHandler}
            placeholder="Last Name"
            aria-label="Last Name"
            className="input-field"
          />

          <label htmlFor="lastName" className="input-label">
            Last Name
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Email */}
        <div className="input-container">
          <MdEmail className="input-icon" />
          <input
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={changeHandler}
            placeholder="email"
            aria-label="Email"
            className="input-field"
          />

          <label htmlFor="lastName" className="input-label">
            Email
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Confirm Email */}
        <div className="input-container">
          <MdEmail className="input-icon" />
          <input
            type="email"
            name="confirmEmail"
            id="confirmEmail"
            value={confirmEmail}
            onChange={changeHandler}
            placeholder="Confirm Email"
            aria-label="Confirm Email"
            className="input-field"
          />

          <label htmlFor="confirmEmail" className="input-label">
            Confirm Email
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Password */}
        <div className="input-container">
          <RiLockPasswordFill className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            id="password"
            value={password}
            onChange={changeHandler}
            placeholder="Password"
            aria-label="Password"
            className="input-field"
          />

          <label htmlFor="password" className="input-label">
            Password
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Confirm Password */}
        <div className="input-container">
          <RiLockPasswordFill className="input-icon" />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            id="confirmPassword"
            value={confirmPassword}
            onChange={changeHandler}
            placeholder="Confirm Password"
            aria-label="Confirm Password"
            className="input-field"
          />

          <label htmlFor="confirmPassword" className="input-label">
            Confirm Password
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Phone */}
        <div className="input-container">
          <FaPhone className="input-icon" />
          <input
            type="text"
            name="phone"
            id="phone"
            value={phone}
            onChange={changeHandler}
            placeholder="Phone"
            aria-label="Phone"
            className="input-field"
          />

          <label htmlFor="phone" className="input-label">
            phone
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Street Address */}
        <div className="input-container">
          <MdLocationPin className="input-icon" />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={changeHandler}
            placeholder="Street Address"
            aria-label="Street Address"
            className="input-field"
          />

          <label htmlFor="street" className="input-label">
            Street Address
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Zip Code */}
        <div className="input-container">
          <FaMapMarker className="input-icon" />
          <input
            type="text"
            name="zipCode"
            id="zipCode"
            value={zipCode}
            onChange={changeHandler}
            placeholder="Zip Code"
            aria-label="Zip Code"
            className="input-field"
          />

          <label htmlFor="zipCode" className="input-label">
            Zip Code
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* City */}
        <div className="input-container">
          <FaMapMarker className="input-icon" />
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={changeHandler}
            placeholder="City"
            aria-label="City"
            className="input-field"
          />

          <label htmlFor="city" className="input-label">
            City
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* State */}
        <div className="input-container">
          <FaMapMarker className="input-icon" />
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={changeHandler}
            placeholder="State"
            aria-label="State"
            className="input-field"
          />

          <label htmlFor="state" className="input-label">
            State
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* Country */}
        <div className="input-container">
          <FaMapMarker className="input-icon" />
          <input
            type="text"
            name="country"
            id="country"
            value={country}
            onChange={changeHandler}
            placeholder="Country"
            aria-label="Country"
            className="input-field"
          />

          <label htmlFor="country" className="input-label">
            Country
          </label>
          <span className="input-highlight"></span>
        </div>
      </div>

      <div className="consent-button-password-validation-container">
        <div className="consent-button-container">
          <div className="show-password-container">
            <input
              type="checkbox"
              id="showPassword"
              name="showPassword"
              checked={showPassword}
              onChange={changeHandler}
              className="show-password-checkbox"
            />
            <label htmlFor="showPassword">Show Password</label>
          </div>
          {/* Agree to terms */}
          <div className="accept-terms">
            <input
              type="checkbox"
              name="agree"
              id="agree"
              checked={agree}
              onChange={changeHandler}
              aria-label="Agree to Terms"
              className="consent-checkbox"
            />
            <span>
              I accept the{" "}
              <Link to="/terms" className="terms-of-user">
                Terms of Use
              </Link>
            </span>
          </div>

          {/* Register Button */}
          <div className="register-button-container">
            <button
              type="submit"
              className="register-button"
              disabled={loading}
              aria-label="Register"
            >
              {loading ? <ButtonLoader /> : "Register"}
            </button>
          </div>

          {/* Registration error */}
          {error ? <p className="error-message"> {error} </p> : null}

          {/* Do you have an account? */}
          <p className="have-account">
            Already have an account?
            <Link className="login-link" to="/login">
              Log In
            </Link>
          </p>
        </div>
        {/* Password Validation */}
        <div className="password-conditions-container">
          <div className="password-rule">
            <p className="infos">
              Contains at least one lowercase and uppercase letter
            </p>
            {switchIcon(letterCase)}
          </div>
          <div className="password-rule">
            <p className="infos">Contains at least one number</p>
            {switchIcon(number)}
          </div>
          <div className="password-rule">
            <p className="infos">Contains at least one special character</p>
            {switchIcon(specialCharacter)}
          </div>
          <div className="password-rule">
            <p className="infos">Password is at least 8 characters long</p>
            {switchIcon(passwordLength)}
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignUpForm;
