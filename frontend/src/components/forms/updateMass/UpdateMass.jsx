import { useEffect, useState } from "react";
import "../mass/MassForm.scss";
import { toast } from "react-toastify";
import {
  FaCalendarAlt,
  FaClock,
  FaListUl,
  FaUserAlt,
  FaUsers,
  FaQuoteRight,
  FaPrayingHands,
  FaCalendarCheck,
  FaBookOpen,
  FaMapMarkerAlt,
  FaParagraph,
} from "react-icons/fa";
import { MdChurch } from "react-icons/md";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearMassErrorsAction,
  fetchMass,
  updateMass,
} from "../../../redux/actions/mass/massAction";
import { Alert } from "@mui/material";

const UpdateMass = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { error, loading, currentMass } = useSelector((state) => state.mass);
  console.log(currentMass);

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    type: "",
    officiant: "",
    participants: "",
    confession: "",
    preMassPrayer: "",
    massStatus: "",
    readings: {
      firstReading: "",
      secondReading: "",
      gospel: "",
      psalm: "",
    },
    location: {
      name: "",
      address: "",
      coordinates: {
        latitude: "",
        longitude: "",
      },
    },
    description: "",
  });
  const [errors, setErrors] = useState({});

  // Fetch the mass data by ID
  useEffect(() => {
    dispatch(fetchMass(id));

    // error handling
    return () => dispatch(clearMassErrorsAction());
  }, [dispatch]);

  // Update formData when mass data is fetched
  useEffect(() => {
    if (currentMass) {
      setFormData({
        date: currentMass.date?.slice(0, 10) || "",
        time: currentMass.time || "",
        type: currentMass.type || "",
        officiant: currentMass.officiant || "",
        participants: currentMass.participants || "",
        confession: currentMass.confession || "",
        preMassPrayer: currentMass.preMassPrayer || "",
        massStatus: currentMass.massStatus || "",
        readings: {
          firstReading: currentMass.readings?.firstReading || "",
          secondReading: currentMass.readings?.secondReading || "",
          gospel: currentMass.readings?.gospel || "",
          psalm: currentMass.readings?.psalm || "",
        },
        location: {
          name: currentMass.location?.name || "",
          address: currentMass.location?.address || "",
          coordinates: {
            latitude: currentMass.location?.coordinates?.latitude || "",
            longitude: currentMass.location?.coordinates?.longitude || "",
          },
        },
        description: currentMass.description || "",
      });
    }
  }, [currentMass]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  // Handle nested input changes
  const handleNestedChange = (e, parent, isCoordinates = false) => {
    const { name, value } = e.target;

    try {
      // Perform basic validation for coordinate fields
      if (isCoordinates) {
        if ((name === "latitude" || name === "longitude") && isNaN(value)) {
          throw new Error("Coordinates must be numeric values.");
        }

        setFormData((prevData) => ({
          ...prevData,
          [parent]: {
            ...prevData[parent],
            coordinates: {
              ...prevData[parent].coordinates,
              [name]: value,
            },
          },
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [parent]: {
            ...prevData[parent],
            [name]: value,
          },
        }));
      }

      // Clear any previous error messages for the field being updated
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } catch (error) {
      // Set error messages to the state
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error.message,
      }));
      toast.error(error.message);
    }
  };

  // Real-time Validation
  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate Date
    if (!formData.date) {
      newErrors.date = "Date is required";
      valid = false;
    }

    // Validate Time
    if (!formData.time) {
      newErrors.time = "Time is required";
      valid = false;
    }

    // Validate Day of the Week
    if (!formData.type) {
      newErrors.type = "Day of the Mass is required";
      valid = false;
    }

    // Validate Officiant
    if (!formData.officiant) {
      newErrors.officiant = "Officiant name is required";
      valid = false;
    }

    // Validate Confession
    if (!formData.confession) {
      newErrors.confession = "Confession time is required";
      valid = false;
    }

    // Validate Pre-Mass Prayer
    if (!formData.preMassPrayer) {
      newErrors.preMassPrayer = "Pre-mass prayer is required";
      valid = false;
    }

    // Validate Readings
    if (!formData.readings.firstReading) {
      newErrors.firstReading = "First reading is required";
      valid = false;
    }

    if (!formData.readings.secondReading) {
      newErrors.secondReading = "Second reading is required";
      valid = false;
    }

    if (!formData.readings.gospel) {
      newErrors.gospel = "Gospel is required";
      valid = false;
    }

    if (!formData.readings.psalm) {
      newErrors.psalm = "Psalm is required";
      valid = false;
    }

    // Validate Location - Name
    if (!formData.location.name) {
      newErrors.name = "Church name is required";
      valid = false;
    }

    // Validate church - address
    if (!formData.location.address) {
      newErrors.address = "Church name is required";
      valid = false;
    }

    // Validate Location Coordinates - Latitude and Longitude
    if (
      !formData.location.coordinates.latitude ||
      isNaN(formData.location.coordinates.latitude)
    ) {
      newErrors.latitude = "Valid latitude is required";
      valid = false;
    }

    if (
      !formData.location.coordinates.longitude ||
      isNaN(formData.location.coordinates.longitude)
    ) {
      newErrors.longitude = "Valid longitude is required";
      valid = false;
    }

    // Mass Description
    if (!formData.description) {
      newErrors.description = "Mass description is required";
      valid = false;
    }

    // Set Errors
    setErrors(newErrors);

    // Show error toast if form is invalid
    if (!valid) {
      toast.error("Please fill in all required fields correctly.");
    }

    return valid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    await dispatch(updateMass(id, formData));
  };

  return (
    <section className="form-mass-container">
      <h3 className="mass-form-title">Create a New Mass</h3>
      <form onSubmit={handleSubmit} className="mass-form" noValidate>
        <div className="inputs-wrapper">
          {/* Mass Date */}
          <div className="input-container">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              className="input-field"
              aria-label="Mass Date"
            />
            <label htmlFor="date" className="input-label">
              Mass Date
            </label>
            {errors.date && (
              <small className="input-error-message">{errors.date}</small>
            )}
          </div>

          {/* Mass Time */}
          <div className="input-container">
            <FaClock className="input-icon" />
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="input-field"
              aria-label="Mass Time"
            />
            <label htmlFor="time" className="input-label">
              Mass Time
            </label>

            {errors.time && (
              <small className="input-error-message">{errors.time}</small>
            )}
          </div>

          {/* Type Selection */}
          <div className="input-container">
            <FaListUl className="input-icon" />
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field"
              aria-label="Mass Program Type"
              required
            >
              <option value="Daily">Daily</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
              <option value="Holy Day">Holy Day</option>
              <option value="Feast Day">Feast Day</option>
              <option value="Special Occasion">Special Occasion</option>
            </select>
            <label htmlFor="type" className="input-label">
              Mass Program Type
            </label>

            {errors.type && (
              <small className="input-error-message">{errors.type}</small>
            )}
          </div>

          {/* Officiant Name */}
          <div className="input-container">
            <FaUserAlt className="input-icon" />
            <input
              type="text"
              name="officiant"
              id="officiant"
              value={formData.officiant}
              onChange={handleChange}
              placeholder="Officiant Name (e.g. Fr. Siyum Zera Ghiorghis)"
              className="input-field"
              aria-label="Officiant Name"
              maxLength={100}
            />
            <label htmlFor="officiant" className="input-label">
              Officiant Name
            </label>
            {errors.type && (
              <small className="input-error-message">{errors.type}</small>
            )}
          </div>

          {/* Participants */}
          <div className="input-container">
            <FaUsers className="input-icon" />
            <input
              type="number"
              name="participants"
              id="participants"
              min="1"
              max="1000"
              value={formData.participants}
              onChange={handleChange}
              placeholder="Mass Participants"
              className="input-field"
              aria-label="Mass Participants"
            />
            <label htmlFor="participants" className="input-label">
              Mass Participants
            </label>
          </div>

          {/* Confession Time */}
          <div className="input-container">
            <FaQuoteRight className="input-icon" />
            <input
              type="text"
              name="confession"
              id="confession"
              value={formData.confession}
              onChange={handleChange}
              placeholder="Confession Time"
              className="input-field"
              aria-label="Confession Time"
            />
            <label htmlFor="confession" className="input-label">
              Confession Time
            </label>

            {errors.confession && (
              <small className="input-error-message">{errors.confession}</small>
            )}
          </div>

          {/* Pre-Mass Prayer */}
          <div className="input-container">
            <FaPrayingHands className="input-icon" />
            <input
              type="text"
              name="preMassPrayer"
              id="preMassPrayer"
              value={formData.preMassPrayer}
              onChange={handleChange}
              placeholder="Pre-Mass Prayer (e.g. Rosary from 11:00 - 11:45)"
              className="input-field"
              aria-label="Pre-Mass Prayer"
              required
            />
            <label htmlFor="preMassPrayer" className="input-label">
              Pre-Mass Prayer
            </label>

            {errors.preMassPrayer && (
              <small className="input-error-message">
                {errors.preMassPrayer}
              </small>
            )}
          </div>

          {/* Mass Status */}
          <div className="input-container">
            <FaCalendarCheck className="input-icon" />
            <select
              name="massStatus"
              id="massStatus"
              value={formData.massStatus}
              onChange={handleChange}
              className="input-field"
              aria-label="Mass Status"
              required
            >
              <option value="upcoming">Upcoming</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <label htmlFor="massStatus" className="input-label">
              Mass Status
            </label>
          </div>

          {/* Readings Section */}
          <fieldset className="fieldset-form">
            <legend className="fieldset-legend">
              Mass Readings and Psalm{" "}
            </legend>
            {/* First Reading */}
            <div className="input-container">
              <FaBookOpen className="input-icon" />
              <input
                type="text"
                name="firstReading"
                id="firstReading"
                value={formData.readings.firstReading}
                onChange={(e) => handleNestedChange(e, "readings")}
                placeholder="First Reading"
                className="input-field"
                aria-label="First Reading"
              />
              <label htmlFor="firstReading" className="input-label">
                First Reading
              </label>

              {errors.firstReading && (
                <small className="input-error-message">
                  {errors.firstReading}
                </small>
              )}
            </div>

            {/* Second Reading */}
            <div className="input-container">
              <FaBookOpen className="input-icon" />
              <input
                type="text"
                name="secondReading"
                id="secondReading"
                value={formData.readings.secondReading}
                onChange={(e) => handleNestedChange(e, "readings")}
                placeholder="Second Reading"
                className="input-field"
                aria-label="Second Reading"
              />
              <label htmlFor="secondReading" className="input-label">
                Second Reading
              </label>

              {errors.secondReading && (
                <small className="input-error-message">
                  {errors.secondReading}
                </small>
              )}
            </div>

            {/* Gospel */}
            <div className="input-container">
              <FaBookOpen className="input-icon" />
              <input
                type="text"
                name="gospel"
                id="gospel"
                value={formData.readings.gospel}
                onChange={(e) => handleNestedChange(e, "readings")}
                placeholder="Gospel"
                className="input-field"
                aria-label="Gospel"
              />
              <label htmlFor="gospel" className="input-label">
                Gospel
              </label>

              {errors.gospel && (
                <small className="input-error-message">{errors.gospel}</small>
              )}
            </div>

            {/* Psalm */}
            <div className="input-container">
              <FaBookOpen className="input-icon" />
              <input
                type="text"
                name="psalm"
                id="psalm"
                value={formData.readings.psalm}
                onChange={(e) => handleNestedChange(e, "readings")}
                placeholder="Psalm"
                className="input-field"
                aria-label="Psalm"
              />
              <label htmlFor="psalm" className="input-label">
                Psalm
              </label>

              {errors.psalm && (
                <small className="input-error-message">{errors.psalm}</small>
              )}
            </div>
          </fieldset>

          {/* Location */}
          <fieldset className="fieldset-form">
            <legend className="fieldset-legend">Church Location</legend>
            {/* Church Name */}
            <div className="input-container">
              <MdChurch className="input-icon" />
              <input
                type="text"
                name="name"
                id="location-name"
                value={formData.location.name}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Church Name"
                className="input-field"
                aria-label="Church Name"
              />
              <label htmlFor="location-name" className="input-label">
                Church Name
              </label>

              {errors.name && (
                <small className="input-error-message">{errors.name}</small>
              )}
            </div>

            {/* Church Address */}
            <div className="input-container">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                name="address"
                id="location-address"
                value={formData.location.address}
                onChange={(e) => handleNestedChange(e, "location")}
                placeholder="Church Address"
                className="input-field"
                aria-label="Church Address"
              />
              <label htmlFor="location-address" className="input-label">
                Church Address
              </label>

              {errors.address && (
                <small className="input-error-message">{errors.address}</small>
              )}
            </div>

            {/* Coordinates */}
            <div className="input-container">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                name="latitude"
                id="latitude"
                value={formData.location.coordinates.latitude}
                onChange={(e) => handleNestedChange(e, "location", true)}
                placeholder="Latitude"
                className="input-field"
                aria-label="Latitude"
              />
              <label htmlFor="latitude" className="input-label">
                Latitude
              </label>

              {errors.latitude && (
                <small className="input-error-message">{errors.latitude}</small>
              )}
            </div>

            <div className="input-container">
              <FaMapMarkerAlt className="input-icon" />
              <input
                type="text"
                name="longitude"
                id="longitude"
                value={formData.location.coordinates.longitude}
                onChange={(e) => handleNestedChange(e, "location", true)}
                placeholder="Longitude"
                className="input-field"
                aria-label="Longitude"
              />
              <label htmlFor="longitude" className="input-label">
                Longitude
              </label>

              {errors.longitude && (
                <small className="input-error-message">
                  {errors.longitude}
                </small>
              )}
            </div>
          </fieldset>
        </div>

        {/* Mass Description */}
        <div className="input-textarea-container">
          <FaParagraph className="input-icon" />
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Description of the Mass (optional)"
            className="input-field"
            aria-label="Mass Description"
            rows="5"
            maxLength="1200"
          />
          <label htmlFor="description" className="input-label">
            Mass Description
          </label>

          {errors.description && (
            <small className="input-error-message">{errors.description}</small>
          )}
        </div>

        {/* Submit Button */}
        <div className="submit-wrapper">
          <button className="create-mass-btn" disabled={loading}>
            {loading ? (
              <ButtonLoader isLoading={loading} message="" size={24} />
            ) : (
              "Update Mass"
            )}
          </button>
        </div>

        {error && (
          <Alert security="error" className="error-message">
            {error}
          </Alert>
        )}
      </form>
    </section>
  );
};

export default UpdateMass;
