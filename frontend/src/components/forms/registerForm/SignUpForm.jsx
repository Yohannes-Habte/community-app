import { useState, useEffect, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUpForm.scss";
import { FaMapMarker, FaPhone, FaTimes, FaUserAlt } from "react-icons/fa";
import { BsCheck2All } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import {
  validEmail,
  validPassword,
  validPhone,
} from "../../../utile/validation/validate";
import Cookies from "js-cookie";
import {
  registerUserFailure,
  registerUserRequest,
  registerUserSuccess,
} from "../../../redux/reducers/user/memberReducer";
import { API } from "../../../utile/security/secreteKey";

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
  const [formErrors, setFormErrors] = useState({});
  const [passwordRequirements, setPasswordRequirements] = useState({
    letterCase: false,
    number: false,
    specialCharacter: false,
    length: false,
  });

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

    setFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  }, []);

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First Name is required";

    if (!lastName.trim()) newErrors.lastName = "Last Name is required";

    if (!email || !validEmail(email))
      newErrors.email = "Valid Email is required";

    if (!confirmEmail || !validEmail(email))
      newErrors.confirmEmail = "Valid Email is required";

    if (!password || password.length < 8 || !validPassword(password))
      newErrors.password = "Valid Password is required";

    if (
      !confirmPassword ||
      confirmPassword.length < 8 ||
      !validPassword(password)
    )
      newErrors.confirmPassword = "Valid Password is required";

    if (!phone || !validPhone(phone))
      newErrors.phone = "Valid phone number is required (10-15 digits)";

    if (!street) newErrors.street = "Street Address is required";

    if (!zipCode) newErrors.zipCode = "Zip Code is required";

    if (!city) newErrors.city = "City is required";

    if (!state) newErrors.state = "State is required";

    if (!country) newErrors.country = "Country is required";

    if (!agree) newErrors.agree = "You must agree to the Terms of Use";

    return newErrors;
  };

  // Password validation rules
  useEffect(() => {
    setPasswordRequirements({
      letterCase: /([a-z].*[A-Z])|([A-Z].*[a-z])/.test(password),
      number: /\d/.test(password),
      specialCharacter: /[\W_]/.test(password), // includes non-word characters
      length: password.length >= 8,
    });
  }, [password]);

  // Reset form fields
  const resetHandler = () => setFormData(initialState);

  // Function to submit the form with validation and secure registration
  const submitHandler = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    try {
      dispatch(registerUserRequest());

      const { data } = await axios.post(`${API}/auth/register`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": Cookies.get("csrfToken"),
        },
      });

      dispatch(registerUserSuccess(data.user));
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
      dispatch(registerUserFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  // Password strength indicators
  const renderPasswordCheck = (condition, message) => (
    <div className="password-rule">
      <p className="infos">{message}</p>
      {condition ? (
        <BsCheck2All color="green" size={15} />
      ) : (
        <FaTimes color="red" size={15} />
      )}
    </div>
  );

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
          {formErrors.firstName && (
            <small className="input-error-message">
              {formErrors.firstName}
            </small>
          )}
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
          {formErrors.lastName && (
            <small className="input-error-message">{formErrors.lastName}</small>
          )}
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
            placeholder="Email"
            aria-label="Email"
            className="input-field"
          />
          <label htmlFor="email" className="input-label">
            Email
          </label>
          <span className="input-highlight"></span>
          {formErrors.email && (
            <small className="input-error-message">{formErrors.email}</small>
          )}
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
          {formErrors.confirmEmail && (
            <small className="input-error-message">
              {formErrors.confirmEmail}
            </small>
          )}
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
          {formErrors.password && (
            <small className="input-error-message">{formErrors.password}</small>
          )}
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
          {formErrors.confirmPassword && (
            <small className="input-error-message">
              {formErrors.confirmPassword}
            </small>
          )}
        </div>

        {/* Phone */}
        <div className="input-container">
          <FaPhone className="input-icon" />
          <input
            type="tel"
            name="phone"
            id="phone"
            value={phone}
            onChange={changeHandler}
            placeholder="Phone"
            aria-label="Phone"
            className="input-field"
          />
          <label htmlFor="phone" className="input-label">
            Phone
          </label>
          <span className="input-highlight"></span>
          {formErrors.phone && (
            <small className="input-error-message">{formErrors.phone}</small>
          )}
        </div>

        {/* Street */}
        <div className="input-container">
          <FaMapMarker className="input-icon" />
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
          {formErrors.street && (
            <small className="input-error-message">{formErrors.street}</small>
          )}
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
          {formErrors.zipCode && (
            <small className="input-error-message">{formErrors.zipCode}</small>
          )}
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
          {formErrors.city && (
            <small className="input-error-message">{formErrors.city}</small>
          )}
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
          {formErrors.state && (
            <small className="input-error-message">{formErrors.state}</small>
          )}
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
          {formErrors.country && (
            <small className="input-error-message">{formErrors.country}</small>
          )}
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
          {/* Terms and Conditions */}
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
            <label htmlFor="agree" className="terms-label">
              I agree to the{" "}
              <Link to="/terms" className="terms-of-user">
                Terms of Use
              </Link>
            </label>
          </div>
          {formErrors.agree && (
            <small className="input-error-message">{formErrors.agree}</small>
          )}

          {/* Register Button */}
          <div className="register-button-container">
            <button
              type="submit"
              className="register-button"
              disabled={loading}
              aria-label="Register"
            >
              {loading ? (
                <ButtonLoader isLoading={loading} message="" size={24} />
              ) : (
                "Register"
              )}
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
        <aside className="password-conditions-container">
          <h4 className="password-validation-title">Password Requirements:</h4>
          {renderPasswordCheck(
            passwordRequirements.length,
            "At least 8 characters long"
          )}
          {renderPasswordCheck(
            passwordRequirements.number,
            "At least one number"
          )}
          {renderPasswordCheck(
            passwordRequirements.letterCase,
            "At least one uppercase and one lowercase letter"
          )}
          {renderPasswordCheck(
            passwordRequirements.specialCharacter,
            "At least one special character"
          )}
        </aside>
      </div>
    </form>
  );
};

export default SignUpForm;
