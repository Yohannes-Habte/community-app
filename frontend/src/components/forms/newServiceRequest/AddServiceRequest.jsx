import { useDispatch, useSelector } from "react-redux";
import "./AddServiceRequest.scss";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { FaBible } from "react-icons/fa";
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
import {
  API,
  cloud_name,
  cloud_URL,
  upload_preset,
} from "../../../utile/security/secreteKey";

const initialState = {
  serviceCategory: "",
  serviceName: "",
  serviceDate: "",
  identificationDocument: null,
  message: "",
  scriptureTopic: "",
  catechismTopic: "",
};

const AddServiceRequest = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.member);
  const { categories } = useSelector((state) => state.category);

  // Add new state for mapping category IDs to category names
  const [categoryMap, setCategoryMap] = useState({});
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState({});
  const [formLoading, setFormLoading] = useState(false);

  const {
    serviceCategory,
    serviceName,
    serviceDate,
    identificationDocument,
    message,
    scriptureTopic,
    catechismTopic,
  } = formData;

  useEffect(() => {
    dispatch(fetchAllCategories());

    return () => {
      dispatch(clearErrors(null));
    };
  }, [dispatch]);

  // Build the categoryMap when categories change
  useEffect(() => {
    if (categories) {
      const map = categories.reduce((acc, category) => {
        acc[category._id] = category.category; // Map category ID to category name
        return acc;
      }, {});
      setCategoryMap(map);
    }
  }, [categories]);

  const validateForm = () => {
    const errors = {};
    if (!serviceCategory) errors.serviceCategory = "Category is required.";

    if (!serviceName) errors.serviceName = "Service Name is required.";

    if (serviceName === "scriptures" && !scriptureTopic) {
      errors.scriptureTopic = "Please specify a scripture topic.";
    }

    if (serviceName === "catechism" && !catechismTopic) {
      errors.catechismTopic = "Please specify a catechism topic.";
    }

    if (!serviceDate) errors.serviceDate = "Service Date is required.";
    if (!identificationDocument)
      errors.identificationDocument = "Document upload is required.";
    if (!formData.message) errors.message = "Message cannot be empty.";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;

    console.log("Before Change =", serviceCategory);

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));

    console.log("After Change =", serviceCategory);

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
      formDataObj.append("file", identificationDocument);
      formDataObj.append("cloud_name", cloud_name);
      formDataObj.append("upload_preset", upload_preset);

      const response = await axios.post(cloud_URL, formDataObj);
      const { url } = response.data;

      // Prepare new service request data
      const newService = {
        serviceCategory: serviceCategory,
        serviceName: serviceName,
        serviceDate: serviceDate,
        identificationDocument: url,
        message: message,
        userId: currentUser._id,
        ...(serviceName === "scriptures" && scriptureTopic
          ? { scriptureTopic }
          : {}),
        ...(serviceName === "catechism" && catechismTopic
          ? { catechismTopic }
          : {}),
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
      alert(errorMessage);
      setFormLoading(false);
    }
  };

  // Define sacrament options
  const sacramentOptions = [
    { value: "baptism", label: "Baptism" },
    { value: "communion", label: "First Communion" },
    { value: "confirmation", label: "Confirmation" },
    { value: "confession", label: "Confession" },
    { value: "anointing", label: "Anointing of the Sick" },
    { value: "marriage", label: "Marriage" },
    { value: "HolyOrders", label: "Holy Orders" },
  ];

  // Define spiritual development options
  const spiritualDevelopmentOptions = [
    { value: "scriptures", label: "Exploring the Scriptures" },
    { value: "catechism", label: "Catechism Classes" },
    { value: "mary", label: "The Virgin Mary" },
    { value: "meditative-reading", label: "Lectio Divina" },
    { value: "hail-mary", label: "The Hail Mary" },
    { value: "prayer-rosary", label: "Praying the Rosary" },
    { value: "saint-devotions", label: "Devotions to Saints" },
    { value: "christ", label: "The Nature of Jesus Christ" },
    { value: "trinity", label: "The Holy Trinity" },
    { value: "adoration", label: "Eucharistic Adoration" },
    { value: "sacraments", label: "Preparation for Sacraments" },
    { value: "spiritual-direction", label: "Spiritual Direction" },
    { value: "reconciliation", label: "Sacrament of Reconciliation" },
    { value: "church-marks", label: "The Four Marks of the Church" },
    { value: "church-fathers", label: "The Church Fathers" },
    { value: "grace", label: "Understanding Grace" },
    { value: "sin", label: "Understanding Sin" },
    { value: "heaven", label: "Understanding Heaven" },
    { value: "hell", label: "Understanding Hell" },
    { value: "purgatory", label: "Understanding Purgatory" },
    { value: "our-father", label: "The Our Father" },
    { value: "prayer", label: "The Power of Prayer" },
    { value: "daily-prayer", label: "The Liturgy of the Hours" },
    { value: "contemplative-prayer", label: "Contemplative Prayer" },
    { value: "centering-prayer", label: "Centering Prayer" },
    { value: "fasting", label: "Fasting and Penance" },
    { value: "suffering", label: "The Role of Suffering in Spiritual Growth" },
    { value: "pilgrimage", label: "Pilgrimage" },
    { value: "sacred-art", label: "Sacred Art" },
    { value: "rosary", label: "The Mass" },
    { value: "liturgical-year", label: "The Liturgical Year" },
    { value: "prayer-techniques", label: "Prayer Techniques" },
    { value: "prayer-mental", label: "Mental Prayer" },
    { value: "prayer-vocal", label: "Vocal Prayer" },
    { value: "prayer-contemplative", label: "Contemplative Prayer" },
    { value: "prayer-meditation", label: "Meditation" },
    { value: "moral-decision-making", label: "Moral Decision Making" },
    { value: "deadly-sins", label: "The Seven Deadly Sins and Virtues" },
    { value: "moral-virtues", label: "The Moral Virtues" },
    { value: "social-justice", label: "Social Justice" },
    { value: "human-dignity", label: "Human Dignity" },
    { value: "almsgiving", label: "Almsgiving" },
    { value: "mentorship", label: "Mentoring and Spiritual Growth" },
    { value: "community", label: "Community in Faith" },
  ];

  // Define soul prayer options
  const soulPrayerOptions = [
    { value: "soul-prayer", label: "Prayer for the Faithful Departed" },
  ];

  return (
    <section className="service-form-container">
      <h3 className="service-form-title">Service Request Form</h3>
      <form onSubmit={handleSubmit} className="service-request-form" noValidate>
        <div className="input-container">
          <PiChurchFill className="icon" />
          <select
            name="serviceCategory"
            id="serviceCategory"
            value={serviceCategory}
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
            value={serviceName}
            onChange={handleChange}
            aria-label="Service Name"
            disabled={!serviceCategory}
            className={`input-field ${serviceName ? "error" : ""}`}
          >
            {/* Sacraments */}
            <option value="">Select Service</option>
            {/* Render Sacrament options if the selected category is sacrament */}
            {categoryMap[serviceCategory] === "Sacraments" &&
              sacramentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}

            {/* Render Spiritual Development options if the selected category is spiritual development */}
            {categoryMap[serviceCategory] === "Spiritual development" &&
              spiritualDevelopmentOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}

            {/* Render Soul Prayer options if the selected category is soul prayer */}
            {categoryMap[serviceCategory] === "Soul prayer" &&
              soulPrayerOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
          </select>
          {formErrors.serviceName && (
            <span className="error-text">{formErrors.serviceName}</span>
          )}
        </div>

        {/* Conditional input for scripture topic */}
        {serviceName === "scriptures" && (
          <div className="input-container">
            <FaBible className="icon" />
            <input
              type="text"
              name="scriptureTopic"
              value={scriptureTopic}
              onChange={handleChange}
              className={`input-field ${
                formErrors.scriptureTopic ? "error" : ""
              }`}
              aria-label="Specific Scripture Topic"
              placeholder="Specify the topic..."
            />
            {formErrors.scriptureTopic && (
              <span className="error-text">{formErrors.scriptureTopic}</span>
            )}
          </div>
        )}

        {/* Conditional input for catechism topic */}
        {serviceName === "catechism" && (
          <div className="input-container">
            <FaBible className="icon" />
            <input
              type="text"
              name="catechismTopic"
              value={catechismTopic}
              onChange={handleChange}
              className={`input-field ${
                formErrors.catechismTopic ? "error" : ""
              }`}
              aria-label="Specific Catechism Topic"
              placeholder="Specify the catechism topic..."
            />
            {formErrors.catechismTopic && (
              <span className="error-text">{formErrors.catechismTopic}</span>
            )}
          </div>
        )}

        <div className="input-container">
          <MdDateRange className="icon" />
          <input
            type="date"
            name="serviceDate"
            id="serviceDate"
            value={serviceDate}
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
            value={message}
            id="message"
            rows={8}
            onChange={handleChange}
            className={`input-field ${message ? "error" : ""}`}
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
              <ButtonLoader isLoading={formLoading} message={""} />
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
