import { PiChurchFill } from "react-icons/pi";
import "./UpdateService.scss";
import { useEffect, useState } from "react";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../../utile/security/secreteKey";
import { MdMessage } from "react-icons/md";

const initialState = {
  serviceStatus: "pending",
  message: "",
};

const UpdateService = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const { serviceStatus, message } = formData;

  console.log("Service Data:", formData);

  // Fetch the service data when the component mounts
  useEffect(() => {
    const fetchService = async () => {
      try {
        const { data } = await axios.get(`${API}/services/${id}`, {
          withCredentials: true,
        });

        if (data?.result) {
          setFormData({
            serviceStatus: data.result.serviceStatus,
            message: data?.result?.message || "",
          });
        } else {
          toast.error("Service data not found.");
        }
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || "Failed to fetch service data.";
        toast.error(errorMessage);
      }
    };

    fetchService();
  }, [id]); 

  // Validate form before submission
  const validateForm = () => {
    const errors = {};

    if (serviceStatus === "default") {
      errors.serviceStatus = "Service status is required.";
    }

    if (!message.trim()) {
      errors.message = "Message is required.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear the error for the field if it has a value now
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    // Clear error message on focus
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before proceeding
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const updatedService = {
        serviceStatus,
        message: message.trim(),
      };

      const { data } = await axios.put(
        `${API}/services/${id}`,
        updatedService,
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);
      navigate("/priest/dashboard");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update the service";
      toast.error(errorMessage);
    } finally {
      setLoading(false); // Ensure loading state is reset
    }
  };

  return (
    <form onSubmit={handleSubmit} className="service-update-form" noValidate>
      {/* Service Status Dropdown */}
      <div className="input-container">
        <PiChurchFill className="icon" />
        <select
          name="serviceStatus"
          id="serviceStatus"
          value={serviceStatus}
          onChange={handleChange}
          onFocus={handleFocus}
          className={`input-field ${
            formErrors.serviceStatus ? "input-error" : ""
          }`}
          aria-label="Service Status"
        >
          <option value="default" disabled>
            Select Status
          </option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {formErrors.serviceStatus && (
          <small className="error-text">{formErrors.serviceStatus}</small>
        )}
      </div>

      {/* Update Message Textarea */}
      <div className="input-container">
        <MdMessage className="icon" />
        <textarea
          name="message"
          id="message"
          value={message}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Enter update message"
          rows="5"
          aria-describedby="message-error"
          className={`input-field ${formErrors.message ? "input-error" : ""}`}
          aria-label="Update Message"
        />
        {formErrors.message && (
          <small className="error-text" id="message-error">
            {formErrors.message}
          </small>
        )}
      </div>

      {/* Submit Button */}
      <button className="service-update-btn" disabled={loading}>
        {loading ? (
          <ButtonLoader isLoading={loading} message="Updating..." size={24} />
        ) : (
          "Update Service"
        )}
      </button>
    </form>
  );
};

export default UpdateService;
