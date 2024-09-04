import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
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

const Register = ({ signUp, addMember, setAddUser }) => {
  const navigate = useNavigate();

  // Global state variables
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading.update);
  const error = useSelector((state) => state.user.error.update);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);

  // Handle change
  const changeHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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

  // If a user is logged in, they cannot access the login page
  useEffect(() => {
    if (currentUser) {
      navigate("/");
    }
  });

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

  // Function to reset all the state variables
  const resetHandler = () => {
    setFormData({
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
    });
  };

  // Function to register the user
  const submitHandler = async (event) => {
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
      dispatch(postUserRegisterStart());

      const { data } = await axios.post(`${API}/auth/register`, formData, {
        withCredentials: true,
      });

      dispatch(postUserRegisterSuccess(data.user));
      toast.success(data.message);

      // Set token in cookies
      const token = data.token;
      console.log("register from Register= ",token)
      Cookies.set("token", token, {
        expires: 1,
        secure: true,
        sameSite: "strict",
      });

      resetHandler();
      navigate("/login");
    } catch (err) {
      dispatch(postUserRegisterFailure(err.response.message));
    }
  };

  return (
    <>
      {addMember && (
        <article className="modal">
          <section className="popup-box">
            <span className="close-popup-box" onClick={() => setAddUser(false)}>
              X
            </span>

            <form action="" onSubmit={submitHandler} className="register-form">
              <div className="register-input-fields-container">
                {/* User first name */}
                <div className="input-container">
                  <FaUserAlt className="input-icon" />
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    value={firstName}
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
                    placeholder="Password"
                    className="input-field"
                  />
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/* User confirm password */}
                <div className="input-container">
                  <RiLockPasswordFill className="input-icon" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={changeHandler}
                    placeholder="Confirm Password"
                    className="input-field"
                  />
                  <label htmlFor="confirmPassword" className="input-label">
                    Confirm Password
                  </label>
                  <span className="input-highlight"></span>
                </div>

                {/* User phone number */}
                <div className="input-container">
                  <MdLocationPin className="input-icon" />
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    value={phone}
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
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
                    onChange={changeHandler}
                    placeholder="Country Name"
                    className="input-field"
                  />
                  <label htmlFor="country" className="input-label">
                    Country Name
                  </label>
                  <span className="input-highlight"></span>
                </div>
              </div>

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

              <div className="consent-and-others-container">
                <div className="consent-terms-button-login-container">
                  <div className="register-consent">
                    <input
                      type="checkbox"
                      name="agree"
                      checked={agree}
                      onChange={changeHandler}
                      className="register-consent-input"
                    />
                    <span className="accept">I accept</span>
                    <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
                  </div>

                  <button className="register-button" disabled={loading}>
                    {loading ? (
                      <span className="loading">
                        <ButtonLoader /> Loading...
                      </span>
                    ) : (
                      "Sign Up"
                    )}
                  </button>
                  {error ? <p className="error-message"> {error} </p> : null}
                  <p className="haveAccount">
                    Already have an account?
                    <NavLink className="login-link" to="/login">
                      Log In
                    </NavLink>
                  </p>
                </div>
              </div>
            </form>
          </section>
        </article>
      )}

      {signUp && (
        <form action="" onSubmit={submitHandler} className="register-form">
          <div className="register-input-fields-container">
            {/* User first name */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="firstName"
                id="firstName"
                value={firstName}
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
                placeholder="Password"
                className="input-field"
              />
              <label htmlFor="password" className="input-label">
                Password
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User confirm password */}
            <div className="input-container">
              <RiLockPasswordFill className="input-icon" />
              <input
                type={showPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                value={confirmPassword}
                onChange={changeHandler}
                placeholder="Confirm Password"
                className="input-field"
              />
              <label htmlFor="confirmPassword" className="input-label">
                Confirm Password
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User phone number */}
            <div className="input-container">
              <MdLocationPin className="input-icon" />
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
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
                onChange={changeHandler}
                placeholder="Country Name"
                className="input-field"
              />
              <label htmlFor="country" className="input-label">
                Country Name
              </label>
              <span className="input-highlight"></span>
            </div>
          </div>

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

          <div className="consent-and-others-container">
            <div className="consent-terms-button-login-container">
              <div className="register-consent">
                <input
                  type="checkbox"
                  name="agree"
                  checked={agree}
                  onChange={changeHandler}
                  className="register-consent-input"
                />
                <span className="accept">I accept</span>
                <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
              </div>

              <button className="register-button" disabled={loading}>
                {loading ? (
                  <span className="loading">
                    <ButtonLoader /> Loading...
                  </span>
                ) : (
                  "Sign Up"
                )}
              </button>
              {error ? <p className="error-message"> {error} </p> : null}
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

                <p className="text">{switchIcon(number)} &nbsp; Number (0-9)</p>

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
      )}
    </>
  );
};

export default Register;
