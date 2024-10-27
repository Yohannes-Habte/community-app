import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { FiLayers, FiFileText } from "react-icons/fi";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../../redux/reducers/serviceCategory/categoryReducer";
import "./CategoryForm.scss";
import { API } from "../../../utile/security/secreteKey";
import { Alert } from "@mui/material";

// Initial state for form fields
const initialFormData = {
  category: "",
  description: "",
};

const CategoryForm = ({ setOpenCategory }) => {
  // Global state variables
  const { loading, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialFormData);
  const [formErrors, setFormErrors] = useState({});

  // Validate the form inputs
  const validateForm = () => {
    const errors = {};
    if (!formData.category.trim()) {
      errors.category = "Service category is required.";
    }
    if (!formData.description.trim()) {
      errors.description = "Description is required.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // Clear errors on input change
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  // Handle form reset
  const handleReset = () => {
    setFormData(initialFormData);
    setFormErrors({});
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate the form before submission
    if (!validateForm()) return;

    try {
      dispatch(Action.categoryStart());

      const { data } = await axios.post(
        `${API}/categories/new`,
        { category: formData.category, description: formData.description },
        { withCredentials: true }
      );

      dispatch(Action.categorySuccess(data.result));
      toast.success(data.message);
      handleReset();
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "An error occurred. Please try again.";
      dispatch(Action.categoryFailure(errorMessage));
      toast.error(errorMessage || "Failed to add the category.");
    }
  };

  return (
    <article className="service-category-modal">
      <section className="service-category-popup-box">
        <span className="close-modal" onClick={() => setOpenCategory(false)}>
          X
        </span>
        <h3 className="service-category-form-title">
          Add New Service Category
        </h3>

        <form
          onSubmit={handleSubmit}
          className="service-category-form"
          noValidate
        >
          <div className="input-container">
            <FiLayers className="input-icon" />
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter Service Category"
              className={`input-field ${
                formErrors.category ? "input-error" : ""
              }`}
              aria-describedby={formErrors.category ? "category-error" : null}
            />
            <label htmlFor="category" className="input-label">
              Service Category
            </label>
            {formErrors.category && (
              <small className="error-text">{formErrors.category}</small>
            )}
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FiFileText className="input-icon" />
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="6"
              cols="30"
              placeholder="Enter service category description ..."
              className={`input-field ${
                formErrors.description ? "input-error" : ""
              }`}
              aria-describedby={
                formErrors.description ? "description-error" : null
              }
            />
            <label htmlFor="description" className="input-label">
              Description
            </label>
            {formErrors.description && (
              <small className="error-text">{formErrors.description}</small>
            )}
            <span className="input-highlight"></span>
          </div>

          <button className="genre-btn" disabled={loading}>
            {loading ? (
              <ButtonLoader isLoading={loading} message="" size={24} />
            ) : (
              "Add Category"
            )}
          </button>
        </form>
        {error && (
          <Alert severity="error" className="error-message">
            {error}
          </Alert>
        )}
      </section>
    </article>
  );
};

export default CategoryForm;
