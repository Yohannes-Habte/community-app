import { useDispatch, useSelector } from "react-redux";
import "./AddServiceRequest.scss";
import {
  postPrayerRequestFailure,
  postPrayerRequestStart,
  postPrayerRequestSuccess,
} from "../../../redux/reducers/prayerReducer";
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utiles/securitiy/secreteKey";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { PiChurchFill } from "react-icons/pi";
import { MdOutlineMessage } from "react-icons/md";
import { MdDateRange } from "react-icons/md";

const initialState = {
  serviceName: "",
  serviceDate: "",
  identificationDocument: null,
  message: "",
};

const AddServiceRequest = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  // Local state variables
  // Initialize state
  const [formData, setFormData] = useState(initialState);
  const { serviceName, serviceDate, identificationDocument, message } =
    formData;

  // Handle change function
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleReset = () => {
    setFormData({
      serviceName: "",
      serviceDate: "",
      identificationDocument: null,
      message: "",
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      dispatch(postPrayerRequestStart());
      // Image validation
      const userFile = new FormData();
      userFile.append("file", identificationDocument);
      userFile.append("cloud_name", cloud_name);
      userFile.append("upload_preset", upload_preset);

      // Save image to cloudinary
      const response = await axios.post(cloud_URL, userFile);
      const { url } = response.data;

      // The body
      const newService = {
        serviceName: serviceName,
        serviceDate: serviceDate,
        identificationDocument: url,
        message: message,
      };

      const { data } = await axios.post(
        `${API}/services/${currentUser._id}/new`,
        newService
      );
      dispatch(postPrayerRequestSuccess(data.prayer));
      toast.success(data.message);
      handleReset();
      event.target.reset();
    } catch (err) {
      dispatch(postPrayerRequestFailure(err.response.data.message));
    }
  };
  return (
    <section className="service-form-container">
      <h3 className="service-form-title"> Service Request Form </h3>
      <form onSubmit={handleSubmit} className="service-request-form">
        <div className="input-container">
          <PiChurchFill className="icon" />
          <select
            name="serviceName"
            id="serviceName"
            value={serviceName}
            onChange={handleChange}
            className="input-field"
          >
            <option value="default">Select Service</option>
            <option value="baptism">Baptism</option>
            <option value="communion">First Communion</option>
            <option value="confirmation"> Confirmation </option>
            <option value="confession"> Confession </option>
            <option value="anointing">Anointing of the Sick</option>
            <option value="marriage">Marriage</option>
            <option value="mass">Mass Service</option>
            <option value="spiritual">Spiritual Development</option>
          </select>

          <label className="input-label" htmlFor="serviceName">
            Service Name
          </label>
          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <MdDateRange className="icon" />
          <input
            type="date"
            name="serviceDate"
            id="serviceDate"
            value={serviceDate}
            onChange={handleChange}
            placeholder="Service Date"
            className="input-field"
          />
          <label className="input-label" htmlFor="serviceDate">
            Service Date
          </label>
          <span className="input-highlight"></span>
        </div>

        {/* PDF input */}
        <div className="file-container">
          <FaCloudUploadAlt className="icon" />
          <input
            type="file"
            name="identificationDocument"
            id="identificationDocument"
            onChange={handleChange}
            className="file-field"
          />

          <label htmlFor="file" className="file-label">
            Upload Germany Religious Recognition Document{" "}
          </label>

          <span className="input-highlight"></span>
        </div>

        <div className="input-container">
          <MdOutlineMessage className="icon" />
          <textarea
            name="message"
            value={message}
            id="message"
            rows={8}
            cols={30}
            onChange={handleChange}
            placeholder="Enter text message..."
            className="input-field"
          />

          <label className="input-label" htmlFor="message">
            Service Date
          </label>
          <span className="input-highlight"></span>
        </div>

        <button className="service-request-btn" disabled={loading}>
          {loading ? (
            <span className="loading">
              <ButtonLoader /> Loading...
            </span>
          ) : (
            <span>Send</span>
          )}
        </button>
      </form>
    </section>
  );
};

export default AddServiceRequest;
