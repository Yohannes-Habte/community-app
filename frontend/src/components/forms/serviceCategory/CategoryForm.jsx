import axios from "axios";
import { useState } from "react";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import { FiLayers, FiFileText } from "react-icons/fi";
import ButtonLoader from "../../../utiles/loader/buttonLoader/ButtonLoader";
import { useDispatch, useSelector } from "react-redux";
import * as Action from "../../../redux/reducers/serviceCategory/categoryReducer";
import "./CategoryForm.scss";

const initialFormData = {
  category: "",
  description: "",
};

const CategoryForm = ({ setOpenCategory }) => {
  console.log(setOpenCategory);
  // Global state variables
  const { loading, error } = useSelector((state) => state.category);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleReset = () => {
    setFormData(initialFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newCategory = {
      category: formData.category,
      description: formData.description,
    };

    try {
      dispatch(Action.categoryStart());

      const { data } = await axios.post(`${API}/categories/new`, newCategory);

      dispatch(Action.categorySuccess(data.result));
      toast.success(data.message);
      handleReset();
    } catch (err) {
      console.log(err);
      dispatch(Action.categoryFailure(err.response.data.message));
    }
  };

  return (
    <article className="service-category-modal">
      <section className="service-category-popup-box">
        <span
          className="close-modal"
          onClick={() => {
            setOpenCategory(false);
          }}
        >
          X
        </span>
        <h3 className="service-category-form-title">
          Add New Service Category
        </h3>
        <form onSubmit={handleSubmit} className="service-category-form">
          <div className="input-container">
            <FiLayers className="input-icon" />
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="Enter Service Category"
              className="input-field"
            />
            <label htmlFor="category" className="input-label">
              Service Category
            </label>
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
              className="input-field"
            />
            <label htmlFor="description" className="input-label">
              Description
            </label>
            <span className="input-highlight"></span>
          </div>

          <button className="genre-btn" disabled={loading}>
            {loading ? (
              <span className="loading">
                <ButtonLoader /> Loading...
              </span>
            ) : (
              "Add Category"
            )}
          </button>
        </form>
        {error ? <p className="error-message"> {error} </p> : null}
      </section>
    </article>
  );
};

export default CategoryForm;
