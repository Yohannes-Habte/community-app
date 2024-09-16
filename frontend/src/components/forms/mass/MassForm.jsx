import { useState } from "react";
import axios from "axios";
import "./MassForm.scss";
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
import { API } from "../../../utiles/securitiy/secreteKey";

const initialState = {
  date: "",
  time: "11:00",
  type: "Saturday",
  officiant: "Fr. Siyum Zera Ghiorghis",
  participants: 100,
  confession: "Confession at 11:00 AM",
  preMassPrayer: "Rosary 11:00 AM",
  massStatus: "upcoming",
  readings: {
    firstReading: "",
    psalm: "",
    secondReading: "",
    gospel: "",
  },
  location: {
    name: "St. Mary's Catholic Church",
    address: "Bei Der Reitbahn 3, 22763 Hamburg, Germany",
    coordinates: {
      latitude: "53.551320",
      longitude: "9.925270",
    },
  },
  description:
    "A regular Mass service in the Eritrean Roman Catholic Church typically begins with an opening prayer, followed by the Penitential Act, where the congregation participates in a moment of confession and seeks God's mercy and forgiveness. This is often accompanied by the recitation or singing of a psalm, aligning with the liturgical calendar and timetable of the parish. The service then progresses to the Liturgy of the Word, featuring Scripture readings, a responsorial psalm, and a homily, which provides spiritual insight and guidance. Depending on the specific needs and spiritual growth objectives of the parishioners, additional elements such as catechesis or spiritual reflections may be incorporated into the service. The Liturgy of the Eucharist follows, where bread and wine are consecrated and the faithful receive Holy Communion, experiencing a profound union with Christ. The Mass concludes with a closing prayer and blessing, inspiring the congregation to continue their spiritual development and live out their faith in daily life.",
};

const MassForm = () => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // Utility function to capitalize the first letter of a string
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle nested input changes
  const handleNestedChange = (e, parent, isCoordinates = false) => {
    const { name, value } = e.target;

    if (isCoordinates) {
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
  };

  // Reset form
  const resetForm = () => {
    setFormData(initialState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (
      !formData.date ||
      !formData.time ||
      !formData.officiant ||
      !formData.location.name ||
      !formData.confession ||
      !formData.preMassPrayer
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      // Send POST request to create a new Mass
      const { data } = await axios.post(`${API}/masses/new`, formData, {
        withCredentials: true,
      });

      toast.success(data.message);
      resetForm();
    } catch (error) {
      toast.error(error?.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false); // Set loading state to false
    }
  };

  return (
    <section className="form-mass-container">
      <h3 className="mass-form-title">Create a New Mass</h3>
      <form onSubmit={handleSubmit} className="mass-form">
        <div className="inputs-wrapper">
          <div className="input-container">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="MM-DD-YYYY"
              className="input-field"
            />
            <label htmlFor="date" className="input-label">
              Mass Date
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaClock className="input-icon" />
            <input
              type="time"
              name="time"
              id="time"
              value={formData.time}
              onChange={handleChange}
              className="input-field"
            />
            <label htmlFor="time" className="input-label">
              Mass Time
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaListUl className="input-icon" />
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="input-field"
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
            <span className="input-highlight"></span>
          </div>

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
            />
            <label htmlFor="officiant" className="input-label">
              Officiant Name
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaUsers className="input-icon" />
            <input
              type="number"
              name="participants"
              id="participants"
              min="1"
              value={formData.participants}
              onChange={handleChange}
              placeholder="Mass Participants"
              className="input-field"
            />
            <label htmlFor="participants" className="input-label">
              Mass Participants
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaQuoteRight className="input-icon" />
            <input
              type="text"
              name="confession"
              id="confession"
              value={formData.confession}
              onChange={handleChange}
              placeholder="Confession Time (e.g. 10:30 - 11:40)"
              className="input-field"
            />
            <label htmlFor="confession" className="input-label">
              Confession Time
            </label>
            <span className="input-highlight"></span>
          </div>

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
            />
            <label htmlFor="preMassPrayer" className="input-label">
              Pre-Mass Prayer
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="input-container">
            <FaCalendarCheck className="input-icon" />
            <select
              name="massStatus"
              id="massStatus"
              value={formData.massStatus}
              onChange={handleChange}
              placeholder="Mass Status"
              className="input-field"
            >
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
            </select>
            <label htmlFor="massStatus" className="input-label">
              Mass Status
            </label>
            <span className="input-highlight"></span>
          </div>

          <div className="fieldset-container">
            <fieldset className="fieldset">
              <legend>Mass Readings & Psalm:</legend>
              {["firstReading", "psalm", "secondReading", "gospel"].map(
                (field) => (
                  <div className="input-container" key={field}>
                    <FaBookOpen className="input-icon" />
                    <input
                      type="text"
                      name={field}
                      id={field}
                      value={formData.readings[field]}
                      onChange={(e) => handleNestedChange(e, "readings")}
                      placeholder={`Enter ${field.replace(/([A-Z])/g, " $1")}`} // Adding the placeholder here
                      className="input-field"
                    />
                    <label htmlFor={field} className="input-label">
                      {`Mass ${capitalizeFirstLetter(
                        field.replace(/([A-Z])/g, " $1")
                      )}`}
                    </label>
                    <span className="input-highlight"></span>
                  </div>
                )
              )}
            </fieldset>
          </div>

          <div className="fieldset-container">
            <fieldset className="fieldset">
              <legend>Mass Location:</legend>
              <div className="input-container">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.location.name}
                  onChange={(e) => handleNestedChange(e, "location")}
                  placeholder="Enter Church Name"
                  className="input-field"
                />
                <label htmlFor="name" className="input-label">
                  Church Name
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  name="address"
                  id="address"
                  value={formData.location.address}
                  onChange={(e) => handleNestedChange(e, "location")}
                  placeholder="Enter Church Address"
                  className="input-field"
                />
                <label htmlFor="address" className="input-label">
                  Church Address
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="number"
                  name="latitude"
                  id="latitude"
                  value={formData.location.coordinates.latitude}
                  onChange={(e) => handleNestedChange(e, "location", true)}
                  placeholder="Latitude"
                  className="input-field"
                />
                <label htmlFor="latitude" className="input-label">
                  Latitude
                </label>
                <span className="input-highlight"></span>
              </div>

              <div className="input-container">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="number"
                  name="longitude"
                  id="longitude"
                  value={formData.location.coordinates.longitude}
                  onChange={(e) => handleNestedChange(e, "location", true)}
                  placeholder="Longitude"
                  className="input-field"
                />
                <label htmlFor="longitude" className="input-label">
                  Longitude
                </label>
                <span className="input-highlight"></span>
              </div>
            </fieldset>
          </div>
        </div>

        <div className="input-textarea-container">
          <FaParagraph className="input-icon" />
          <textarea
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter Mass Description"
            className="input-field"
            rows="4"
          />
          <label htmlFor="description" className="input-label">
            Mass Description
          </label>
          <span className="input-highlight"></span>
        </div>

        <button type="submit" className="create-mass-btn" disabled={loading}>
          {loading ? "Loading..." : "Create Mass"}
        </button>
      </form>
    </section>
  );
};

export default MassForm;
