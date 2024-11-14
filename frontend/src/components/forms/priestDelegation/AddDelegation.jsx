import { useState } from "react";
import PropTypes from "prop-types";
import "./AddDelegation.scss";
import { FaUserNurse } from "react-icons/fa";
import { MdEmail, MdOutlineSmartphone, MdMessage } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  postDelegatePriestFailure,
  postDelegatePriestStart,
  postDelegatePriestSuccess,
} from "../../../redux/reducers/delegation/delegationReducer";
import { API } from "../../../utile/security/secreteKey";
import { validEmail, validPhone } from "../../../utile/validation/validate";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { fetchDelegatedPriests } from "../../../redux/actions/delegation/delegationAction";

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  serviceDate: "",
  textMessage: "",
};

const AddDelegation = ({ setOpenAddDelegation }) => {
  const { error, loading } = useSelector((state) => state.priest);
  const { currentUser } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});

  const { fullName, email, phoneNumber, serviceDate, textMessage } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setFormErrors({});
  };

  const validateForm = () => {
    const errors = {};

    // Full Name validation
    if (!fullName.trim()) {
      errors.fullName = "Full Name is required.";
    }

    // Email validation
    if (!email.trim()) {
      errors.email = "Email is required.";
    } else if (!validEmail(email)) {
      errors.email = "Valid email is required.";
    }

    // Phone Number validation
    if (!phoneNumber.trim()) {
      errors.phoneNumber = "Phone number is required.";
    } else if (!validPhone(phoneNumber)) {
      errors.phoneNumber = "Valid phone number is required.";
    }

    // Service Date validation
    if (!serviceDate) {
      errors.serviceDate = "Service date is required.";
    }

    // Text Message validation
    if (!textMessage.trim()) {
      errors.textMessage = "Message is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      dispatch(postDelegatePriestStart());

      const newDelegatedPriest = {
        fullName,
        email,
        phoneNumber,
        serviceDate,
        textMessage,
        user: currentUser._id,
      };
      const { data } = await axios.post(
        `${API}/delegations/delegate`,
        newDelegatedPriest,
        { withCredentials: true }
      );
      dispatch(postDelegatePriestSuccess(data.delegate));
      toast.success(data.message);
      handleReset();
      setOpenAddDelegation(false);
      dispatch(fetchDelegatedPriests());
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit the form";
      dispatch(postDelegatePriestFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <article
      className="add-priest-delegation-modal"
      aria-labelledby="modal-title"
    >
      <section className="add-priest-delegation-popup">
        <span
          className="close-modal"
          onClick={() => setOpenAddDelegation(false)}
          aria-label="Close"
        >
          X
        </span>

        <h2 id="modal-title" className="add-priest-delegation-title">
          New Priest Delegation
        </h2>
        {error && <p className="error-message">{error}</p>}

        <form
          onSubmit={submitHandler}
          className="add-priest-delegation-form"
          noValidate
        >
          <div className="priest-delegation-form-inputs-wrapper">
            <InputField
              icon={<FaUserNurse />}
              label="Full Name"
              name="fullName"
              type="text"
              value={fullName}
              onChange={handleChange}
              error={formErrors.fullName}
              placeholder="Enter Full Name"
            />
            <InputField
              icon={<MdEmail />}
              label="Email Address"
              name="email"
              type="email"
              value={email}
              onChange={handleChange}
              error={formErrors.email}
              placeholder="Enter Email"
            />
            <InputField
              icon={<MdOutlineSmartphone />}
              label="Phone Number"
              name="phoneNumber"
              type="text"
              value={phoneNumber}
              onChange={handleChange}
              error={formErrors.phoneNumber}
              placeholder="Enter Phone Number"
            />
            <InputField
              icon={<BsCalendarDateFill />}
              label="Service Date"
              name="serviceDate"
              type="date"
              value={serviceDate}
              onChange={handleChange}
              error={formErrors.serviceDate}
            />
          </div>

          <TextareaField
            icon={<MdMessage />}
            label="Text Message"
            name="textMessage"
            value={textMessage}
            onChange={handleChange}
            error={formErrors.textMessage}
            placeholder="Enter your message"
          />

          <button disabled={loading} className="priest-delegation-btn">
            {loading ? (
              <ButtonLoader isLoading={loading} message="" size={24} />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </section>
    </article>
  );
};

const InputField = ({
  icon,
  label,
  name,
  type,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className={`input-container ${error ? "has-error" : ""}`}>
    {icon && <span className="icon">{icon}</span>}
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      aria-describedby={error ? `${name}-error` : null}
      aria-invalid={!!error}
      className="input-field"
    />
    <label htmlFor={name} className="input-label">
      {label}
    </label>
    {error && (
      <small id={`${name}-error`} className="error-text">
        {error}
      </small>
    )}
  </div>
);

const TextareaField = ({
  icon,
  label,
  name,
  value,
  onChange,
  error,
  placeholder,
}) => (
  <div className={`textarea-container ${error ? "has-error" : ""}`}>
    {icon && <span className="textarea-icon">{icon}</span>}
    <textarea
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows="5"
      aria-describedby={error ? `${name}-error` : null}
      aria-invalid={!!error}
      className="textarea-field"
    ></textarea>
    <label htmlFor={name} className="textarea-label">
      {label}
    </label>
    {error && (
      <span id={`${name}-error`} className="error-text">
        {error}
      </span>
    )}
  </div>
);

AddDelegation.propTypes = {
  setOpenDelegation: PropTypes.func.isRequired,
};

export default AddDelegation;
