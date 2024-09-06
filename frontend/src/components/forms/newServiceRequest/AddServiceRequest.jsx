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
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { PiChurchFill } from "react-icons/pi";
import { MdOutlineMessage } from "react-icons/md";
import { MdDateRange } from "react-icons/md";
import { fetchAllCategories } from "../../../redux/actions/serviceCategory/categoryAction";

const initialState = {
  serviceCategory: "",
  serviceName: "",
  serviceDate: "",
  identificationDocument: null,
  message: "",
};

const AddServiceRequest = () => {
  // Global state variables
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const { loading } = useSelector((state) => state.service);
  const { categories } = useSelector((state) => state.category);

  console.log("categories =", categories);

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(fetchAllCategories());
  }, [dispatch]);

  // Local state variables

  const [formData, setFormData] = useState(initialState);
  const {
    serviceCategory,
    serviceName,
    serviceDate,
    identificationDocument,
    message,
  } = formData;

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
      serviceCategory: "",
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
        serviceCategory: serviceCategory,
        serviceName: serviceName,
        serviceDate: serviceDate,
        identificationDocument: url,
        message: message,
        userId: currentUser._id,
      };

      const { data } = await axios.post(`${API}/services/new`, newService, {
        withCredentials: true,
      });
      dispatch(postPrayerRequestSuccess(data.result));
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
        {/* Service Category */}
        <div className="input-container">
          <PiChurchFill className="icon" />
          <select
            name="serviceCategory"
            id="serviceCategory"
            value={serviceCategory}
            onChange={handleChange}
            className="input-field"
          >
            <option value="default">Select Category</option>
            {categories &&
              categories.length > 0 &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
          </select>
          <span className="input-highlight"></span>
        </div>

        {/* Service Name */}
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
            <option value="mass">Others</option>
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
            Service Text Message
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
