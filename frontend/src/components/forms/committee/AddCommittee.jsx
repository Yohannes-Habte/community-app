import { useState } from "react";
import "./AddCommittee.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill, RiAdminFill } from "react-icons/ri";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@mui/material";
import {
  postCommitteeFailure,
  postCommitteeStart,
  postCommitteeSuccess,
} from "../../../redux/reducers/committee/committeeReducer";
import { toast } from "react-toastify";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utile/security/secreteKey";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import {
  validEmail,
  validPassword,
  validPhone,
} from "../../../utile/validation/validate";

const initialState = {
  fullName: "",
  email: "",
  password: "",
  title: "",
  phone: "",
  startingTime: "",
  endingTime: "",
  image: null,
  consent: false,
};

const AddCommittee = ({ setOpenCommittee }) => {
  const { error } = useSelector((state) => state.committee);
  const dispatch = useDispatch();

  // Local state
  const [formData, setFormData] = useState(initialState);
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const {
    fullName,
    email,
    password,
    title,
    phone,
    startingTime,
    endingTime,
    image,
    consent,
  } = formData;

  // Handle input change
  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({ ...prev, [name]: checked }));

      if (name === "consent" && checked) {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else if (type === "file") {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));

      if (name === "image") {
        setErrors((prev) => ({ ...prev, [name]: "" }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Input validation
  const validateForm = () => {
    const newErrors = {};

    if (!fullName.trim()) newErrors.fullName = "Full Name is required";

    if (!email || !validEmail(email))
      newErrors.email = "Valid Email is required";

    if (!password || password.length < 8 || !validPassword(password))
      newErrors.password = "Valid Password is required";

    if (!title.trim()) newErrors.title = "Title is required";

    if (!phone || !validPhone(phone))
      newErrors.phone = "Valid phone number is required (10-15 digits)";

    if (!startingTime) newErrors.startingTime = "Start date is required";

    if (!endingTime) newErrors.endingTime = "End date is required";

    if (!image) newErrors.image = "Image is required";

    if (!consent) newErrors.consent = "You must agree to the Terms of Use";

    return newErrors;
  };

  const resetForm = () => {
    setFormData(initialState);
    setErrors({});
    setFormLoading(false);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      dispatch(postCommitteeStart());
      setFormLoading(true);

      // Image validation (max size 2MB, file type)
      if (image.size > 2 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          image: "File size should be less than 2MB",
        }));
        setFormLoading(false);
        return;
      }

      if (!["image/jpeg", "image/png"].includes(image.type)) {
        setErrors((prev) => ({
          ...prev,
          image: "Invalid file type. Only JPEG/PNG allowed",
        }));
        setFormLoading(false);
        return;
      }

      // Upload Image to Cloudinary
      const imageUploadForm = new FormData();
      imageUploadForm.append("file", image);
      imageUploadForm.append("cloud_name", cloud_name);
      imageUploadForm.append("upload_preset", upload_preset);

      const { data: uploadResponse } = await axios.post(
        cloud_URL,
        imageUploadForm
      );
      const { url } = uploadResponse;

      // Construct new committee member data
      const newCommitteeMember = {
        fullName,
        email,
        password,
        title,
        phone,
        startingTime,
        endingTime,
        image: url,
        consent,
      };

      // Submit to the API
      const { data } = await axios.post(
        `${API}/committees/register`,
        newCommitteeMember,
        { withCredentials: true }
      );

      dispatch(postCommitteeSuccess(data.committee));
      toast.success(data.message);

      resetForm();
    } catch (err) {
      dispatch(
        postCommitteeFailure(
          err.response?.data?.message || "Failed to add committee member"
        )
      );
      toast.error("Failed to add committee member");
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <article className="add-committee-modal">
      <section className="add-committee-popup">
        <span className="close-popup" onClick={() => setOpenCommittee(false)}>
          X
        </span>
        <h3 className="add-committee-title"> Add Committee Member </h3>

        {error && <p className="error-message">{error}</p>}

        <form onSubmit={handleSubmit} className="add-committee-member-form">
          <div className="inputs-wrapper">
            {/* Full Name */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                placeholder="Enter Full Name"
                className={`input-field ${
                  errors.fullName ? "input-error" : ""
                }`}
                aria-label="Full Name"
              />
              <label className="input-label">Full Name</label>
              {errors.fullName && (
                <small className="error-text">{errors.fullName}</small>
              )}
            </div>

            {/* Email */}
            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Enter Email"
                className={`input-field ${errors.email ? "input-error" : ""}`}
                aria-label="Email Address"
              />
              <label className="input-label">Email Address</label>
              {errors.email && (
                <small className="error-text">{errors.email}</small>
              )}
            </div>

            {/* Password */}
            <div className="input-container">
              <RiLockPasswordFill className="input-icon" />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter Password"
                className={`input-field ${
                  errors.password ? "input-error" : ""
                }`}
                aria-label="Password"
              />
              <label className="input-label">Password</label>
              {errors.password && (
                <small className="error-text">{errors.password}</small>
              )}
            </div>

            {/* Title */}
            <div className="input-container">
              <RiAdminFill className="input-icon" />
              <input
                type="text"
                name="title"
                value={title}
                onChange={handleChange}
                placeholder="Enter Title"
                className={`input-field ${errors.title ? "input-error" : ""}`}
                aria-label="Title / Role"
              />
              <label className="input-label">Title / Role</label>
              {errors.title && (
                <small className="error-text">{errors.title}</small>
              )}
            </div>

            {/* Phone */}
            <div className="input-container">
              <MdLocationPin className="input-icon" />
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleChange}
                placeholder="Enter Phone Number"
                className={`input-field ${errors.phone ? "input-error" : ""}`}
                aria-label="Phone Number"
              />
              <label className="input-label">Phone Number</label>
              {errors.phone && (
                <small className="error-text">{errors.phone}</small>
              )}
            </div>

            {/* Starting Service Time */}
            <div className="input-container">
              <GiCalendarHalfYear className="input-icon" />
              <input
                type="date"
                name="startingTime"
                value={startingTime}
                onChange={handleChange}
                className={`input-field ${
                  errors.startingTime ? "input-error" : ""
                }`}
                aria-label="Starting Time"
              />
              <label className="input-label">Service Starting Time</label>
              {errors.startingTime && (
                <small className="error-text">{errors.startingTime}</small>
              )}
            </div>

            {/* Ending Service Time */}
            <div className="input-container">
              <GiCalendarHalfYear className="input-icon" />
              <input
                type="date"
                name="endingTime"
                value={endingTime}
                onChange={handleChange}
                className={`input-field ${
                  errors.endingTime ? "input-error" : ""
                }`}
                aria-label="Ending Time"
              />
              <label className="input-label">Service Ending Time</label>
              {errors.endingTime && (
                <small className="error-text">{errors.endingTime}</small>
              )}
            </div>

            {/* Image Upload */}
            <div className="input-container">
              <MdCloudUpload className="input-icon" />
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className={`input-field ${errors.image ? "input-error" : ""}`}
                aria-label="Upload Photo"
              />
              <label className="input-label">Upload Photo</label>
              {errors.image && (
                <small className="error-text">{errors.image}</small>
              )}
            </div>
          </div>

          {/* User Consent */}
          <div className="input-consent">
            <input
              type="checkbox"
              name="consent"
              id="consent"
              checked={consent}
              onChange={handleChange}
              className="consent-checkbox"
              aria-label="User Consent"
            />
            <label htmlFor="consent" className="accept">
              I accept the{" "}
              <NavLink className="terms-of-user">Terms of Use</NavLink>
            </label>
          </div>
          {errors.consent && (
            <small className="error-consent-text">{errors.consent}</small>
          )}

          <button
            className="add-committee-btn"
            disabled={formLoading}
            aria-label="Add Committee Member"
          >
            {formLoading ? (
              <ButtonLoader isLoading={formLoading} message="" size={24} />
            ) : (
              "Add Committee Member"
            )}
          </button>

          {error && (
            <Alert severity="error" className="error-message">
              {error}
            </Alert>
          )}
        </form>
      </section>
    </article>
  );
};

export default AddCommittee;
