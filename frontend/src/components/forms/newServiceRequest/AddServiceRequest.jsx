import { useDispatch, useSelector } from "react-redux";
import "./AddServiceRequest.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { PiChurchFill } from "react-icons/pi";
import { MdOutlineMessage, MdDateRange } from "react-icons/md";
import { fetchAllCategories } from "../../../redux/actions/serviceCategory/categoryAction";
import {
  postServiceRequestFailure,
  postServiceRequestStart,
  postServiceRequestSuccess,
} from "../../../redux/reducers/service/serviceReducer";
import { clearErrors } from "../../../redux/reducers/serviceCategory/categoryReducer";
import { API, cloud_name, cloud_URL, upload_preset } from "../../../utile/security/secreteKey";

const initialState = {
  serviceCategory: "",
  serviceName: "",
  serviceDate: "",
  identificationDocument: null,
  message: "",
};

const AddServiceRequest = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.member);
  const { categories } = useSelector((state) => state.category);
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  useEffect(() => {
    dispatch(fetchAllCategories());

    return () => {
      dispatch(clearErrors(null));
    };
  }, [dispatch]);

  const validateForm = () => {
    const errors = {};
    if (!formData.serviceCategory)
      errors.serviceCategory = "Category is required.";
    if (!formData.serviceName) errors.serviceName = "Service Name is required.";
    if (!formData.serviceDate) errors.serviceDate = "Service Date is required.";
    if (!formData.identificationDocument)
      errors.identificationDocument = "Document upload is required.";
    if (!formData.message) errors.message = "Message cannot be empty.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    if (formErrors[name]) {
      setFormErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleReset = () => {
    setFormData(initialState);
    setFormErrors({});
    setFormLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setFormLoading(true);

    try {
      dispatch(postServiceRequestStart());

      // Upload document to Cloudinary
      const formDataObj = new FormData();
      formDataObj.append("file", formData.identificationDocument);
      formDataObj.append("cloud_name", cloud_name);
      formDataObj.append("upload_preset", upload_preset);

      const response = await axios.post(cloud_URL, formDataObj);
      const { url } = response.data;

      // Prepare new service request data
      const newService = {
        serviceCategory: formData.serviceCategory,
        serviceName: formData.serviceName,
        serviceDate: formData.serviceDate,
        identificationDocument: url,
        message: formData.message,
        userId: currentUser._id,
      };

      const { data } = await axios.post(`${API}/services/new`, newService, {
        withCredentials: true,
      });

      dispatch(postServiceRequestSuccess(data.result));
      toast.success(data.message);
      handleReset();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Failed to send request";
      dispatch(postServiceRequestFailure(errorMessage));
      toast.error(errorMessage);
      setFormLoading(false);
    }
  };

  return (
    <section className="service-form-container">
      <h3 className="service-form-title">Service Request Form</h3>
      <form onSubmit={handleSubmit} className="service-request-form" noValidate>
        <div className="input-container">
          <PiChurchFill className="icon" />
          <select
            name="serviceCategory"
            id="serviceCategory"
            value={formData.serviceCategory}
            onChange={handleChange}
            aria-label="Service Category"
            className={`input-field ${
              formErrors.serviceCategory ? "error" : ""
            }`}
          >
            <option value="">Select Category</option>
            {categories &&
              categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.category}
                </option>
              ))}
          </select>
          {formErrors.serviceCategory && (
            <span className="error-text">{formErrors.serviceCategory}</span>
          )}
        </div>

        <div className="input-container">
          <PiChurchFill className="icon" />
          <select
            name="serviceName"
            id="serviceName"
            value={formData.serviceName}
            onChange={handleChange}
            aria-label="Service Name"
            className={`input-field ${formErrors.serviceName ? "error" : ""}`}
          >
            <option value="">Select Service</option>
            <option value="baptism">Baptism</option>
            <option value="communion">First Communion</option>
            <option value="confirmation">Confirmation</option>
            <option value="confession">Confession</option>
            <option value="anointing">Anointing of the Sick</option>
            <option value="marriage">Marriage</option>
            <option value="others">Others</option>
          </select>
          {formErrors.serviceName && (
            <span className="error-text">{formErrors.serviceName}</span>
          )}
        </div>

        <div className="input-container">
          <MdDateRange className="icon" />
          <input
            type="date"
            name="serviceDate"
            id="serviceDate"
            value={formData.serviceDate}
            onChange={handleChange}
            className={`input-field ${formErrors.serviceDate ? "error" : ""}`}
            aria-label="Service Date"
          />
          {formErrors.serviceDate && (
            <span className="error-text">{formErrors.serviceDate}</span>
          )}
        </div>

        <div className="file-container">
          <FaCloudUploadAlt className="icon" />
          <input
            type="file"
            name="identificationDocument"
            id="identificationDocument"
            onChange={handleChange}
            aria-label="Religious Identification Document"
            className={`file-field ${
              formErrors.identificationDocument ? "error" : ""
            }`}
          />
          <label htmlFor="identificationDocument" className="file-label">
            Upload Religious Recognition Document (PDF only)
          </label>
          {formErrors.identificationDocument && (
            <span className="error-text">
              {formErrors.identificationDocument}
            </span>
          )}
        </div>

        <div className="input-container">
          <MdOutlineMessage className="icon" />
          <textarea
            name="message"
            value={formData.message}
            id="message"
            rows={8}
            onChange={handleChange}
            className={`input-field ${formErrors.message ? "error" : ""}`}
            aria-label="Service Text Message"
            placeholder="Enter your message..."
          />
          {formErrors.message && (
            <span className="error-text">{formErrors.message}</span>
          )}
        </div>

        <div className="service-request-btn-wrapper">

        <button
          type="submit"
          aria-label="Submit Service Request"
          className="service-request-btn"
          disabled={formLoading}
        >
          {formLoading ? (
            <ButtonLoader isLoading={formLoading} />
          ) : (
            "Submit Request"
          )}
        </button>

        </div>

        

   
      </form>
    </section>
  );
};

export default AddServiceRequest;
