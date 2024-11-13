import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./EditPriestDelegate.scss";
import { FaUserNurse } from "react-icons/fa";
import { MdEmail, MdOutlineSmartphone, MdMessage } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  fetchDelegatedPriestFailure,
  fetchDelegatedPriestStart,
  fetchDelegatedPriestSuccess,
  updateDelegatedPriestFailure,
  updateDelegatedPriestStart,
  updateDelegatedPriestSuccess,
} from "../../../redux/reducers/delegation/delegationReducer";
import { API } from "../../../utile/security/secreteKey";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const EditPriestDelegate = () => {
  const { id } = useParams();
  const { delegatedPriest, error, loading } = useSelector(
    (state) => state.priest
  );
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    fullName: delegatedPriest?.fullName || "",
    email: delegatedPriest?.email || "",
    phoneNumber: delegatedPriest?.phoneNumber || "",
    serviceDate: delegatedPriest?.serviceDate || "",
    textMessage: delegatedPriest?.textMessage || "",
  });

  const { fullName, email, phoneNumber, serviceDate, textMessage } = formData;

  // fetch the delegated priest
  useEffect(() => {
    const fetchDelegatedPriest = async () => {
      try {
        dispatch(fetchDelegatedPriestStart());
        const { data } = await axios.get(`${API}/delegations/${id}`, {
          withCredentials: true,
        });
        dispatch(fetchDelegatedPriestSuccess(setFormData(data.result)));
      } catch (error) {
        dispatch(fetchDelegatedPriestFailure(error.response.data.message));
      }
    };
    fetchDelegatedPriest();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      serviceDate: "",
      textMessage: "",
    });
  };

  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(updateDelegatedPriestStart());
      const { data } = await axios.put(`${API}/delegations/${id}`, formData, {
        withCredentials: true,
      });
      dispatch(updateDelegatedPriestSuccess(data.result));
      toast.success(data.message);
      handleReset();
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to submit the form";
      dispatch(updateDelegatedPriestFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <section className="update-delegated-page-container">
      <h2 className="update-priest-delegation-page-title">
        Update Priest Delegation
      </h2>
      {error && <p className="error-message">{error}</p>}

      <form
        onSubmit={submitHandler}
        className="update-priest-delegation-form"
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
            placeholder="Enter Full Name"
          />
          <InputField
            icon={<MdEmail />}
            label="Email Address"
            name="email"
            type="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter Email"
          />
          <InputField
            icon={<MdOutlineSmartphone />}
            label="Phone Number"
            name="phoneNumber"
            type="text"
            value={phoneNumber}
            onChange={handleChange}
            placeholder="Enter Phone Number"
          />
          <InputField
            icon={<BsCalendarDateFill />}
            label="Service Date"
            name="serviceDate"
            type="date"
            value={serviceDate}
            onChange={handleChange}
          />
        </div>

        <TextareaField
          icon={<MdMessage />}
          label="Text Message"
          name="textMessage"
          value={textMessage}
          onChange={handleChange}
          placeholder="Enter your message"
        />

        <button disabled={loading} className="update-priest-delegation-btn">
          {loading ? (
            <ButtonLoader isLoading={loading} message="" size={24} />
          ) : (
            "Submit"
          )}
        </button>
      </form>
    </section>
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
      aria-invalid={!!error}
      className="input-field"
    />
    <label htmlFor={name} className="input-label">
      {label}
    </label>
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
      className="textarea-field"
    ></textarea>
    <label htmlFor={name} className="textarea-label">
      {label}
    </label>
  </div>
);

EditPriestDelegate.propTypes = {
  setOpenDelegate: PropTypes.func.isRequired,
};

export default EditPriestDelegate;
