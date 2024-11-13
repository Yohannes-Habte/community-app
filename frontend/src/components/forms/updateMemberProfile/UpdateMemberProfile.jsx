import { useEffect, useState } from "react";
import { FaLaptopCode, FaMapMarker, FaPhone, FaUserAlt } from "react-icons/fa";
import { MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { NavLink, useNavigate } from "react-router-dom";
import { GrStatusInfo } from "react-icons/gr";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { toast } from "react-toastify";
import {
  clearError,
  updateUserProfileFailure,
  updateUserProfileRequest,
  updateUserProfileSuccess,
} from "../../../redux/reducers/user/memberReducer";
import "./UpdateMemberProfile.scss";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utile/security/secreteKey";

const UpdateMemberProfile = () => {
  const navigate = useNavigate();
  const { currentUser, loading, error } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // State management for the form data
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    image: null,
    maritalStatus: currentUser?.maritalStatus || "",
    phone: currentUser?.phone || "",
    street: currentUser?.street || "",
    zipCode: currentUser?.zipCode || "",
    city: currentUser?.city || "",
    state: currentUser?.state || "",
    country: currentUser?.country || "",
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

  // Redirect to login if not logged in
  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  // Error handling and cleanup
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);

  // Handle input change and image file selection
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (name === "image") {
      // Only accept valid image files (optional size limit)
      if (files[0] && files[0].size < 2 * 1024 * 1024) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: files[0],
        }));
      } else {
        toast.error("Image size should be less than 2MB.");
      }
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Handle form submission
  const updateUserAccount = async (event) => {
    event.preventDefault();
    dispatch(updateUserProfileRequest());

    // Check consent is checked

    if (!agree) {
      toast.error("Please accept the terms of use");
    }

    try {
      let imageUrl = currentUser.image;

      if (image) {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("cloud_name", cloud_name);
        formData.append("upload_preset", upload_preset);

        const { data: cloudData } = await axios.post(cloud_URL, formData);
        imageUrl = cloudData.url;
      }

      const updatedData = {
        firstName,
        lastName,
        image: imageUrl,
        maritalStatus,
        phone,
        street,
        zipCode,
        city,
        state,
        country,
        agree,
      };

      const { data } = await axios.put(`${API}/auth/update`, updatedData, {
        withCredentials: true,
      });

      dispatch(updateUserProfileSuccess(data.result));
      toast.success(data.message);
      navigate("/user/profile");
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Update failed";
      dispatch(updateUserProfileFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
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
        <form onSubmit={updateUserAccount} className="update-user-profile-form">
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
                aria-label="First Name"
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
                aria-label="Last Name"
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
                aria-label="Marital Status"
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
                aria-label="User Image"
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
                aria-label="Phone Number"
                className="input-field"
              />

              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>
              <span className="input-highlight"></span>
            </div>

            {/* User street address */}
            <div className="input-container">
              <FaPhone className="update-user-account-icon" />
              <input
                type="text"
                name="street"
                id="street"
                value={street}
                onChange={handleChange}
                placeholder="Street Name"
                aria-label="Street Name"
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
                aria-label="Zip Code"
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
                aria-label="City Name"
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
                aria-label="State Name"
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
                aria-label="Country Name"
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
              aria-label="Agree to terms"
              className="consent-checkbox"
            />
            <label htmlFor="agree" className="accept">
              I accept
            </label>

            <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
          </div>

          <button
            className="update-user-profile-btn"
            disabled={loading}
            aria-label="Update Profile"
          >
            {loading ? (
              <span className="loading">
                <ButtonLoader isLoading={loading} message="" size={24} />
              </span>
            ) : (
              "Update Profile"
            )}
          </button>
        </form>
      </fieldset>
    </section>
  );
};

export default UpdateMemberProfile;
