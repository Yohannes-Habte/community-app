import { useState } from "react";
import "./AddCommittee.scss";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { MdEmail, MdLocationPin } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";
import { RiAdminFill } from "react-icons/ri";
import { GiCalendarHalfYear } from "react-icons/gi";
import { MdCloudUpload } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  API,
  cloud_URL,
  cloud_name,
  upload_preset,
} from "../../../utiles/securitiy/secreteKey";
import {
  postCommitteeFailure,
  postCommitteeStart,
  postCommitteeSuccess,
} from "../../../redux/reducers/committeeReducer";
import { toast } from "react-toastify";

const AddCommittee = ({ setOpenCommittee }) => {
  // Global state variables
  const { error } = useSelector((state) => state.committee);
  const dispatch = useDispatch();

  // Local state variables
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [phone, setPhone] = useState("");
  const [startingTime, setStartingTime] = useState("");
  const [endingTime, setEndingTime] = useState("");
  const [image, setImage] = useState("");

  // Function to update login user data
  const updateData = (event) => {
    switch (event.target.name) {
      case "fullName":
        setFullName(event.target.value);
        break;
      case "email":
        setEmail(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "title":
        setTitle(event.target.value);
        break;
      case "phone":
        setPhone(event.target.value);
        break;
      case "startingTime":
        setStartingTime(event.target.value);
        break;

      case "endingTime":
        setEndingTime(event.target.value);
        break;
      default:
        break;
    }
  };

  // Reset all state variables for the login form
  const reset = () => {
    setFullName("");
    setEmail("");
    setPassword("");
    setTitle("");
    setPhone("");
    setStartingTime("");
    setEndingTime("");
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(postCommitteeStart());
      // Image validation
      const committeePhoto = new FormData();
      committeePhoto.append("file", image);
      committeePhoto.append("cloud_name", cloud_name);
      committeePhoto.append("upload_preset", upload_preset);

      // Save image to cloudinary
      const response = await axios.post(cloud_URL, committeePhoto);
      const { url } = response.data;

      // body
      const newCommitteeMember = {
        fullName: fullName,
        email: email,
        password: password,
        title: title,
        phone: phone,
        startingTime: startingTime,
        endingTime: endingTime,
        image: url,
      };
      const { data } = await axios.post(
        `${API}/committees/register`,
        newCommitteeMember
      );

      dispatch(postCommitteeSuccess(data.committee));
      toast.success(data.message);

      reset();
    } catch (error) {
      dispatch(postCommitteeFailure(error.response.data.message));
    }
  };

  return (
    <article className="add-committee-modal">
      <section className="add-committee-popup">
        <span className="close-popup" onClick={() => setOpenCommittee(false)}>
          X
        </span>
        <h3 className="add-committee-title"> Add Committee Member </h3>

        {error ? <p className="error-message"> {error} </p> : null}

        <form
          onSubmit={handleSubmit}
          action=""
          className="add-committee-member-form"
        >
          <div className="inputs-wrapper">
            {/* First Name */}
            <div className="input-container">
              <FaUserAlt className="input-icon" />
              <input
                type="text"
                name="fullName"
                id="fullName"
                value={fullName}
                onChange={updateData}
                placeholder="Enter Full Name"
                className="input-field"
              />

              <label htmlFor="fullName" className="input-label">
                Full Name
              </label>
            </div>

            {/* Email Address */}
            <div className="input-container">
              <MdEmail className="input-icon" />
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={updateData}
                placeholder="Enter Email"
                className="input-field"
              />

              <label htmlFor="email" className="input-label">
                Email Address
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Password */}
            <div className="input-container">
              <RiLockPasswordFill className="input-icon" />
              <input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={updateData}
                placeholder="Enter Password"
                className="input-field"
              />

              <label htmlFor="password" className="input-label">
                Password
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Title */}
            <div className="input-container">
              <RiAdminFill className="input-icon" />
              <input
                type="text"
                name="title"
                id="title"
                value={title}
                onChange={updateData}
                placeholder="Enter Title"
                className="input-field"
              />

              <label htmlFor="title" className="input-label">
                Title / Role
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Phone Number */}
            <div className="input-container">
              <MdLocationPin className="input-icon" />
              <input
                type="text"
                name="phone"
                id="phone"
                value={phone}
                onChange={updateData}
                placeholder="Enter Phone Number"
                className="input-field"
              />

              <label htmlFor="phone" className="input-label">
                Phone Number
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Starting Service Time */}
            <div className="input-container">
              <GiCalendarHalfYear className="input-icon" />
              <input
                type="date"
                name="startingTime"
                id="startingTime"
                value={startingTime}
                onChange={updateData}
                placeholder="Enter Starting Time"
                className="input-field"
              />

              <label htmlFor="servicePeriod" className="input-label">
                Service Starting Time
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* Ending Service Time */}
            <div className="input-container">
              <GiCalendarHalfYear className="input-icon" />
              <input
                type="date"
                name="endingTime"
                id="endingTime"
                value={endingTime}
                onChange={updateData}
                placeholder="Enter Service Ending Time"
                className="input-field"
              />

              <label htmlFor="endingTime" className="input-label">
                Service Ending Time
              </label>

              <span className="input-highlight"></span>
            </div>

            {/* User Image */}
            <div className="input-container">
              <MdCloudUpload className="input-icon" />
              <input
                type="file"
                name="image"
                id="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="input-field"
              />

              <label htmlFor="image" className="input-label">
                Upload Photo
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
              className="consent-checkbox"
            />
            <label htmlFor="agree" className="accept">
              I accept
            </label>

            <NavLink className={"terms-of-user"}> Terms of Use</NavLink>
          </div>

          <button className="add-committee-btn">Add Committee Member</button>
        </form>
      </section>
    </article>
  );
};

export default AddCommittee;
