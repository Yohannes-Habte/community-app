import { useState } from "react";
import "./PriestDelegation.scss";
import { FaUserNurse } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { MdOutlineSmartphone } from "react-icons/md";
import { BsCalendarDateFill } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  priestDeligateFailure,
  priestDeligateStart,
  priestDeligateSuccess,
} from "../../../redux/reducers/priestReducer";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

const initialState = {
  fullName: "",
  email: "",
  phoneNumber: "",
  serviceDate: "",
  textMessage: "",
};
const PriestDelegation = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { error } = useSelector((state) => state.priest);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);

  const { fullName, email, phoneNumber, serviceDate, textMessage } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Reset variables
  const handleReset = () => {
    setFormData({
      fullName: "",
      email: "",
      phoneNumber: "",
      serviceDate: "",
      textMessage: "",
    });
  };

  // Submit handler
  const submitHandler = async (event) => {
    event.preventDefault();

    try {
      dispatch(priestDeligateStart());

      const { data } = await axios.post(
        `${API}/delegations/${currentUser._id}/delegate`,
        formData
      );

      dispatch(priestDeligateSuccess(data.delegate));
      toast.success(data.message);
      handleReset();
    } catch (error) {
      dispatch(priestDeligateFailure(error.response.data.message));
    }
  };

  return (
    <section className="new-priest-delegation-wrapper">
      <h2 className="new-priest-delegation-title">New Priest Delegation</h2>
      {error ? <p className="error-message"> {error} </p> : null}

      <form
        action=""
        onSubmit={submitHandler}
        className="new-priest-delegation-form"
      >
        <div className="priest-delegation-form-inputs-wrapper">
          {/* Full Name */}
          <div className="input-container">
            <FaUserNurse className="icon" />
            <input
              type="text"
              name={"fullName"}
              id={"fullName"}
              autoComplete="fullName"
              value={fullName}
              onChange={handleChange}
              placeholder="Enter Full Name"
              className="input-field"
            />

            <label htmlFor={"firstName"} className="input-label">
              Full Name
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Email Address */}
          <div className="input-container">
            <MdEmail className="icon" />
            <input
              type="email"
              name="email"
              id="email"
              autoComplete="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter Email"
              className="input-field"
            />
            <label htmlFor="email" className="input-label">
              Email Address
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Phone Number */}
          <div className="input-container">
            <MdOutlineSmartphone className="icon" />
            <input
              type="text"
              name={"phoneNumber"}
              id={"phoneNumber"}
              autoComplete="phoneNumber"
              value={phoneNumber}
              onChange={handleChange}
              placeholder="Enter Phone Number"
              className="input-field"
            />

            <label htmlFor={"phoneNumber"} className="input-label">
              Phone Number
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Service Date */}
          <div className="input-container">
            <BsCalendarDateFill className="icon" />
            <input
              type="date"
              name={"serviceDate"}
              id={"serviceDate"}
              autoComplete="serviceDate"
              value={serviceDate}
              onChange={handleChange}
              placeholder="Enter Service Date"
              className="input-field"
            />

            <label htmlFor={"serviceDate"} className="input-label">
              Service Date
            </label>
            <span className="input-highlight"></span>
          </div>
        </div>

        {/* Text Message */}
        <div className="textarea-container">
          <MdMessage className="textarea-icon" />

          <textarea
            name="textMessage"
            id="textMessage"
            autoComplete="serviceDate"
            value={textMessage}
            onChange={handleChange}
            cols="30"
            rows="10"
            placeholder="Enter Service Date"
            className="textarea-field"
          ></textarea>

          <label htmlFor={"textMessage"} className="textarea-label">
            Text message
          </label>
          <span className="textarea-highlight"></span>
        </div>

        <button className="priest-delegation-btn"> Submit </button>
      </form>
    </section>
  );
};

export default PriestDelegation;
