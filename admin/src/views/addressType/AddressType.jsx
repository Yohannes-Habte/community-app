import React from 'react';
import './AddressType.scss';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; 
import Menu from '../../components/menu/Menu';

const AddressType = () => {
  const [addressType, setAddressType] = useState('');

  // Function to update data
  const updateData = (event) => {
    switch (event.target.name) {
      case 'addressType':
        setAddressType(event.target.value);
        break;
      default:
        break;
    }
  };

  // Function to reset all the state variables to initial value
  const reset = () => {
    setAddressType('');
  };

  // Login and Submit Function
  const submitAddressType = async (e) => {
    e.preventDefault();

    try {
      // The body
      const newAddressType = {
        addressType: addressType,
      };

      const { data } = await axios.post(
        'http://localhost:8000/api/addressTypes/new',
        newAddressType
      );
      toast.success(data.message)

      reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="address-type-page">
      <Menu />
      <section className="address-type-page-container">
        <h1 className="address-type-title"> Address Types </h1>

        <form
          action=""
          onSubmit={submitAddressType}
          className="address-type-form"
        >
          {/* Home address type */}
          <div className="input-container">
            <label htmlFor="addressType" className="input-label">
              Address Type
            </label>
            <input
              type="text"
              name="addressType"
              id="addressType"
              value={addressType}
              onChange={updateData}
              placeholder="Enter Address Type"
              className="input-field"
            />
          </div>
          <button className="add-address-type-btn"> Add Address Type </button>
        </form>
      </section>
    </main>
  );
};

export default AddressType;
