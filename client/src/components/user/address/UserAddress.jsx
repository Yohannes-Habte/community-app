import React, { useEffect, useState } from 'react';
import './UserAddress.scss';
import { Country, State, City } from 'country-state-city';
import { MdClose, MdDelete } from 'react-icons/md';
import { RiFileZipFill } from 'react-icons/ri';
import { FaAddressCard } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import {
  userAddressDeleteFailure,
  userAddressDeleteStart,
  userAddressDeleteSuccess,
  userAddressFailure,
  userAddressStart,
  userAddressSuccess,
} from '../../../redux/reducers/userReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API } from '../../../utiles/securitiy/secreteKey';

const UserAddress = () => {
  // Global state variables
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [open, setOpen] = useState(false);
  const [addressType, setAddressType] = useState('');
  const [address, setAddress] = useState('');
  const [zipCode, setZipCode] = useState();
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [addressTypes, setAddressTypes] = useState([]);

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
  const updateChange = (e) => {
    switch (e.target.name) {
      case 'addressType':
        setAddressType(e.target.value);
        break;

      case 'address':
        setAddress(e.target.value);
        break;

      case 'zipCode':
        setZipCode(e.target.value);
        break;

      case 'city':
        setCity(e.target.value);
        break;

      case 'state':
        setState(e.target.value);
        break;

      case 'country':
        setCountry(e.target.value);
        break;

      default:
        break;
    }
  };
  // Reset variables
  const reset = () => {
    setOpen(false);
    setCountry('');
    setState('');
    setCity('');
    setAddress('');
    setZipCode(null);
    setAddressType('');
  };

  // Handle user address
  const handleSubmitOfUserAddress = async (e) => {
    e.preventDefault();

    try {
      if (
        addressType === '' ||
        country === '' ||
        state === '' ||
        city === '' ||
        address === '' ||
        zipCode === ''
      ) {
        toast.error('Please fill all the fields!');
      } else {
        dispatch(userAddressStart());

        const newAddress = {
          country: country,
          state: state,
          city: city,
          address: address,
          zipCode: zipCode,
          addressType: addressType,
        };

        const { data } = await axios.put(
          `${API}/members/${currentUser._id}/update-address`,
          newAddress
        );

        dispatch(userAddressSuccess(data.address));
        toast.success(data.message);
        reset();
      }
    } catch (error) {
      dispatch(userAddressFailure(error.response.data.message));
    }
  };

  // Delete user address
  const handleDeleteAddress = async (address) => {
    try {
      dispatch(userAddressDeleteStart());
      const { data } = await axios.delete(
        `${API}/members/${currentUser._id}/address/${address._id}`
      );
      dispatch(userAddressDeleteSuccess(data.address));
      toast.success(data.message);
    } catch (error) {
      dispatch(userAddressDeleteFailure(error.response.data.message));
    }
  };

  return (
    <div className="user-addresses-wrapper">
      <div className="user-addresses-modal">
        {open && (
          <section className="new-user-address">
            <MdClose
              className="address-close-icon"
              onClick={() => setOpen(false)}
            />
            <h2 className="new-user-address-title"> Add New Address </h2>

            <form
              onSubmit={handleSubmitOfUserAddress}
              action=""
              className="user-addresses-form"
            >
              {/* Choose Country using select */}
              <div className="select-container">
                <div className="select-label-wrapper">
                  <label htmlFor={'country'} className="select-label">
                    Country:
                  </label>
                  <select
                    name="country"
                    id="country"
                    value={country}
                    onChange={updateChange}
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
                  <label htmlFor={'state'} className="select-label">
                    State:
                  </label>
                  <select
                    name="state"
                    id="state"
                    value={state}
                    onChange={updateChange}
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
                  <label htmlFor={'city'} className="select-label">
                    City:
                  </label>
                  <select
                    name="city"
                    id="city"
                    value={city}
                    onChange={updateChange}
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
                  <label htmlFor={'addressType'} className="select-label">
                    Address Type:
                  </label>
                  <select
                    name="addressType"
                    id="addressType"
                    value={addressType}
                    onChange={updateChange}
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
                  name={'address'}
                  id={'address'}
                  autoComplete="address1"
                  required
                  value={address}
                  onChange={updateChange}
                  placeholder="Address"
                  className="input-field"
                />

                <label htmlFor={'address'} className="input-label">
                  Address
                </label>
                <span className="input-highlight"></span>
              </div>

              {/* Zip Code */}
              <div className="input-container">
                <RiFileZipFill className="icon" />
                <input
                  type="number"
                  name={'zipCode'}
                  id={'zipCode'}
                  autoComplete="zipCode"
                  required
                  value={zipCode}
                  onChange={updateChange}
                  placeholder="Enter Zip Code"
                  className="input-field"
                />

                <label htmlFor={'zipCode'} className="input-label">
                  Zip Code
                </label>
                <span className="input-highlight"></span>
              </div>

              <button className="user-address-btn">Submit</button>
            </form>
          </section>
        )}
      </div>

      <section className="previous-address">
        {error ? <h4 className="error-message"> {error} </h4> : null}
        <article className="title-add-new-address-wrapper">
          <h2 className="address-title">My Addresses</h2>
          <button onClick={() => setOpen(true)} className="add-new-address-btn">
            Add New Address
          </button>
        </article>

        {/* Table addresses */}
        <table className="table-address">
          <thead className="table-head">
            <tr className="head-row">
              <th className="head-cell"> Address Type</th>
              <th className="head-cell"> Address 1 </th>
              <th className="head-cell"> Address 2 </th>
              <th className="head-cell"> Phone </th>
              <th className="head-cell"> Action</th>
            </tr>
          </thead>
          <tbody className="table-body">
            {currentUser &&
              currentUser.addresses &&
              currentUser?.addresses.map((address) => {
                return (
                  <tr key={address._id} className="body-row">
                    <td className="body-cell"> {address.addressType} </td>
                    <td className="body-cell">
                      {address.address1} {address.zipCode}
                    </td>
                    <td className="body-cell">
                      {address.address2} {address.zipCode}
                    </td>
                    <td className="body-cell"> {currentUser.phone} </td>
                    <td className="body-cell">
                      <MdDelete
                        className="delete-icon"
                        onClick={() => handleDeleteAddress(address)}
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export default UserAddress;
