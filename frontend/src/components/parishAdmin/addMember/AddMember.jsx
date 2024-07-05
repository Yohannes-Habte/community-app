import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./AddMember.scss";
import { FaLaptopCode, FaMapMarker, FaPhone, FaUserAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  userRegisterFailure,
  userRegisterStart,
  userRegisterSuccess,
} from "../../../redux/reducers/userReducer";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { API } from "../../../utiles/securitiy/secreteKey";
import { validEmail, validPassword } from "../../../utiles/validation/validate";

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

const AddMember = ({ setOpen }) => {
  // Global state variables
  const { error, registerLoading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // to navigate register page
  const navigate = useNavigate();

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
        agree: agree,
      };
      const { data } = await axios.post(`${API}/auth/register`, userData);

      dispatch(userRegisterSuccess(data.user));
      toast.success(data.message);
      resetHandler();
      navigate("/login");
    } catch (err) {
      dispatch(userRegisterFailure(err.response.message));
    }
  };

  return (
    <article className="modal">
      <section className="popup">
        <h3 onClick={() => setOpen(false)} className="close-popup">
          X
        </h3>

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

              <button className="register-button" disabled={registerLoading}>
                {registerLoading ? (
                  <span className="loading">
                    <ButtonLoader /> Loading...
                  </span>
                ) : (
                  "Add New Member"
                )}
              </button>
              {error ? <p className="error-message"> {error} </p> : null}
            </div>
          </div>
        </form>
      </section>
    </article>
  );
};

export default AddMember;
