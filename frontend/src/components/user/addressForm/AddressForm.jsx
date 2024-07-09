import { useEffect, useState } from "react";
import "./AddressForm.scss";
import { toast } from "react-toastify";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { useDispatch, useSelector } from "react-redux";
import {
  userAddressFailure,
  userAddressStart,
  userAddressSuccess,
} from "../../../redux/reducers/userReducer";
import { Country, State, City } from "country-state-city";
import { MdClose } from "react-icons/md";
import { RiFileZipFill } from "react-icons/ri";
import { FaAddressCard } from "react-icons/fa";

const initialState = {
  addressType: "",
  address: "",
  zipCode: "",
  city: "",
  state: "",
  country: "",
};
const AddressForm = ({ setOpenAddress }) => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [formData, setFormData] = useState(initialState);
  const [addressTypes, setAddressTypes] = useState([]);

  const { addressType, address, zipCode, city, state, country } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Address type
  useEffect(() => {
    const fetchAddressTypes = async () => {
      try {
        const { data } = await axios.get(`${API}/addressTypes`);

        setAddressTypes(data.addresses);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAddressTypes();
  }, []);

  // Update input variables

  // Reset variables
  const handleReset = () => {
    setFormData({
      addressType: "",
      address: "",
      zipCode: "",
      city: "",
      state: "",
      country: "",
    });
  };

  // Handle user address
  const handleSubmitOfUserAddress = async (e) => {
    e.preventDefault();

    try {
      if (
        addressType === "" ||
        country === "" ||
        state === "" ||
        city === "" ||
        address === "" ||
        zipCode === ""
      ) {
        toast.error("Please fill all the fields!");
      } else {
        dispatch(userAddressStart());

        const { data } = await axios.put(
          `${API}/members/${currentUser._id}/update-address`,
          formData
        );

        dispatch(userAddressSuccess(data.address));
        toast.success(data.message);
        handleReset();
      }
    } catch (error) {
      dispatch(userAddressFailure(error.response.data.message));
    }
  };

  return (
    <section className="user-addresses-modal">
      <section className="new-user-address-popup-Box">
        <h4 className="user-address-popup-title">Add Your Current Address</h4>
        <MdClose
          className="address-close-icon"
          onClick={() => setOpenAddress(false)}
        />

        <form
          onSubmit={handleSubmitOfUserAddress}
          action=""
          className="user-addresses-form"
        >
          {/* Choose Country using select */}
          <div className="select-container">
            <div className="select-label-wrapper">
              <label htmlFor={"country"} className="select-label">
                Country:
              </label>
              <select
                name="country"
                id="country"
                value={country}
                onChange={handleChange}
                className="select-options"
              >
                <option value=""> Choose your country </option>
                {Country &&
                  Country.getAllCountries().map((country) => (
                    <option
                      className="option"
                      key={country.isoCode}
                      value={country.isoCode}
                    >
                      {country.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Choose State using select */}
          <div className="select-container">
            <div className="select-label-wrapper">
              <label htmlFor={"state"} className="select-label">
                State:
              </label>
              <select
                name="state"
                id="state"
                value={state}
                onChange={handleChange}
                className="select-options"
              >
                <option value=""> Choose your state </option>
                {State &&
                  State.getStatesOfCountry(country).map((state) => (
                    <option
                      className="option"
                      key={state.isoCode}
                      value={state.isoCode}
                    >
                      {state.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Choose City using select */}
          <div className="select-container">
            <div className="select-label-wrapper">
              <label htmlFor={"city"} className="select-label">
                City:
              </label>
              <select
                name="city"
                id="city"
                value={city}
                onChange={handleChange}
                className="select-options"
              >
                <option value=""> Choose your city </option>
                {City &&
                  City.getCitiesOfCountry(country).map((city) => (
                    <option
                      className="option"
                      key={city.isoCode}
                      value={city.isoCode}
                    >
                      {city.name}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Address type using select */}
          <div className="select-container">
            <div className="select-label-wrapper">
              <label htmlFor={"addressType"} className="select-label">
                Address Type:
              </label>
              <select
                name="addressType"
                id="addressType"
                value={addressType}
                onChange={handleChange}
                className="select-options"
              >
                <option value=""> Choose Address Type </option>
                {addressTypes &&
                  addressTypes.map((address) => (
                    <option
                      className="option"
                      key={address._id}
                      value={address.addressType}
                    >
                      {address.addressType}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Address */}
          <div className="input-container">
            <FaAddressCard className="icon" />
            <input
              type="text"
              name={"address"}
              id={"address"}
              autoComplete="address1"
              required
              value={address}
              onChange={handleChange}
              placeholder="Address"
              className="input-field"
            />

            <label htmlFor={"address"} className="input-label">
              Address
            </label>
            <span className="input-highlight"></span>
          </div>

          {/* Zip Code */}
          <div className="input-container">
            <RiFileZipFill className="icon" />
            <input
              type="number"
              name={"zipCode"}
              id={"zipCode"}
              autoComplete="zipCode"
              required
              value={zipCode}
              onChange={handleChange}
              placeholder="Enter Zip Code"
              className="input-field"
            />

            <label htmlFor={"zipCode"} className="input-label">
              Zip Code
            </label>
            <span className="input-highlight"></span>
          </div>

          <button className="user-address-btn">Submit</button>
        </form>
      </section>
    </section>
  );
};

export default AddressForm;
