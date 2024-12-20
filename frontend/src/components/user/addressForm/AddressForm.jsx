import { useState } from "react";
import "./AddressForm.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Country, State, City } from "country-state-city";
import { MdClose } from "react-icons/md";
import { RiFileZipFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";
import {
  postUserAddressFailure,
  postUserAddressStart,
  postUserAddressSuccess,
} from "../../../redux/reducers/user/memberReducer";

import { API } from "../../../utile/security/secreteKey";
import ButtonLoader from "../../../utile/loader/buttonLoader/ButtonLoader";

const initialState = {
  addressType: "",
  address: "",
  zipCode: "",
  city: "",
  state: "",
  country: "",
};

const AddressForm = ({ setOpenAddress }) => {
  const { loading } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // Local state for form data
  const [formData, setFormData] = useState(initialState);

  const { addressType, address, zipCode, city, state, country } = formData;

  // Update form data when user changes input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Reset form after submission
  const handleReset = () => {
    setFormData(initialState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!addressType || !country || !state || !city || !address || !zipCode) {
      return toast.error("Please fill out all fields.");
    }

    try {
      dispatch(postUserAddressStart());

      const { data } = await axios.put(
        `${API}/members/update/address`,
        formData,
        { withCredentials: true }
      );

      dispatch(postUserAddressSuccess(data.address));
      toast.success(data.message);
      handleReset();
      setOpenAddress(false);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to update address";
      dispatch(postUserAddressFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  // Render
  return (
    <section className="member-addresses-modal">
      <section className="new-member-address-popup-box">
        <h4 className="member-address-popup-title">Add Your Address</h4>
        <MdClose
          className="address-close-icon"
          onClick={() => setOpenAddress(false)}
        />

        <form onSubmit={handleSubmit} className="member-addresses-form">
          {/* Country Select */}
          <div className="select-container">
            <label htmlFor="country" className="select-label">
              Country:
            </label>
            <select
              name="country"
              id="country"
              value={country}
              onChange={handleChange}
              className="select-options"
            >
              <option value="">Choose your country</option>
              {Country.getAllCountries().map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State Select */}
          <div className="select-container">
            <label htmlFor="state" className="select-label">
              State:
            </label>
            <select
              name="state"
              id="state"
              value={state}
              onChange={handleChange}
              className="select-options"
              disabled={!country} // Disable state select until a country is chosen
            >
              <option value="">Choose your state</option>
              {State.getStatesOfCountry(country).map((s) => (
                <option key={s.isoCode} value={s.isoCode}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* City Select */}
          <div className="select-container">
            <label htmlFor="city" className="select-label">
              City:
            </label>
            <select
              name="city"
              id="city"
              value={city}
              onChange={handleChange}
              className="select-options"
              disabled={!state} // Disable city select until a state is chosen
            >
              <option value="">Choose your city</option>
              {City.getCitiesOfState(country, state).map((c) => (
                <option key={c.isoCode} value={c.isoCode}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Address Type Select */}
          <div className="select-container">
            <label htmlFor="addressType" className="select-label">
              Address Type:
            </label>

            <select
              name="addressType"
              id="addressType"
              value={addressType}
              onChange={handleChange}
              className="select-options"
            >
              <option value="">Select Address Type</option>
              <option value="Home">Home</option>
              <option value="Office">Office</option>
              <option value="Business">Business</option>
            </select>
          </div>

          {/* Address Input */}
          <div className="input-container">
            <FaAddressCard className="icon" />
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={handleChange}
              placeholder="Address"
              className="input-field"
              required
            />
            <label htmlFor="address" className="input-label">
              Address
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Zip Code Input */}
          <div className="input-container">
            <RiFileZipFill className="icon" />
            <input
              type="number"
              name="zipCode"
              id="zipCode"
              value={zipCode}
              onChange={handleChange}
              placeholder="Zip Code"
              className="input-field"
              required
            />
            <label htmlFor="zipCode" className="input-label">
              Zip Code
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Submit Button */}
          <button className="user-address-btn" type="submit" disabled={loading}>
            {loading ? (
              <ButtonLoader isLoading={loading} message="" size={24} />
            ) : (
              "Add Address"
            )}
          </button>
        </form>
      </section>
    </section>
  );
};

export default AddressForm;
