import { useEffect, useState } from "react";
import "./UpdateUserProfile.scss";
import { FaLaptopCode, FaMapMarker, FaPhone, FaUserAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { GrStatusInfo } from "react-icons/gr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../../redux/reducers/userReducer";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { toast } from "react-toastify";
import {
  API,
  cloud_URL,
  cloud_name,
  upload_preset,
} from "../../../utiles/securitiy/secreteKey";
import UserAddress from "../address/UserAddress";
import UserChangePassword from "../changePassword/UserChangePassword";
import MonthlyContribution from "../contribution/MonthlyContribution";
import AllUserServices from "../userServices/AllUserServices";
import ServiceRequest from "../serviceRequest/ServiceRequest";
import UserInbox from "../inbox/UserInbox";

const UpdateUserProfile = ({ isActive }) => {
  const navigate = useNavigate();
  // Select currentUser, loading and error states from the Redux store
  const { currentUser } = useSelector((state) => state.user);
  const loading = useSelector((state) => state.user.loading.update);
  const error = useSelector((state) => state.user.error.update);
  const dispatch = useDispatch();

  // Local State variables
  const [formData, setFormData] = useState({
    firstName: currentUser.firstName || "",
    lastName: currentUser.lastName || "",
    image: currentUser.image || null,
    maritalStatus: currentUser.maritalStatus || "",
    phone: currentUser.phone || "",
    street: currentUser.street || "",
    zipCode: currentUser.zipCode || "",
    city: currentUser.city || "",
    state: currentUser.state || "",
    country: currentUser.country || "",
    agree: false,
  });

  const {
    firstName,
    lastName,
    image,
    maritalStatus,
    phone,
    street,
    zipCode,
    city,
    state,
    country,
    agree,
  } = formData;

  // If user is not logged in, user will not access profile page
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
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

  // Handle change input data
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "image") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0], // Assuming single file upload
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle reset
  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      image: null,
      maritalStatus: "",
      phone: "",
      street: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
      agree: false,
    });
  };
  // Submit logged in user Function
  const updateUserAccount = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateUserStart());

      // Image validation
      const userPhoto = new FormData();
      userPhoto.append("file", image);
      userPhoto.append("cloud_name", cloud_name);
      userPhoto.append("upload_preset", upload_preset);

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
        agree: agree,
      };

      const { data } = await axios.put(
        `${API}/auth/update/${currentUser._id}`,
        updateUserInfo
      );

      dispatch(updateUserSuccess(data.user));
      toast.success(data.message);
      localStorage.setItem("user", JSON.stringify(data.user));
      handleReset();
    } catch (error) {
      dispatch(updateUserFailure(error.response.data.message));
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
                    : "https://i.ibb.co/4pDNDk1/avatar.png"
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
                  <FaUserAlt className="update-user-account-icon" />
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

                {/* User Marital Status "", "", "", ""*/}
                <div className="input-container">
                  <GrStatusInfo className="update-user-account-icon" />
                  <select
                    name="maritalStatus"
                    id="maritalStatus"
                    value={maritalStatus}
                    onChange={handleChange}
                    className="input-field"
                  >
                    <option value="default">Select Marital Status</option>
                    <option value="single">Single</option>
                    <option value="married">Married</option>
                    <option value="divorced">Divorced</option>
                    <option value="widowed">Widowed</option>
                  </select>

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
                    onChange={handleChange}
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
                  <FaPhone className="update-user-account-icon" />
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
                  <FaLaptopCode className="update-user-account-icon" />
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
                  <MdLocationPin className="update-user-account-icon" />
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
                  <MdLocationPin className="update-user-account-icon" />
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
                    onChange={handleChange}
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
                  checked={agree}
                  onChange={handleChange}
                  className="consent-checkbox"
                />
                <label htmlFor="agree" className="accept">
                  I accept
                </label>

                <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
              </div>

              <button
                type="submit"
                className="update-user-profile-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading">
                    <ButtonLoader /> Loading...
                  </span>
                ) : (
                  "Update"
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
