import React, { useEffect, useState } from 'react';
import './UserAddress.scss';
import { MdDelete } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import {
  userAddressDeleteFailure,
  userAddressDeleteStart,
  userAddressDeleteSuccess,
} from '../../../redux/reducers/userReducer';
import { toast } from 'react-toastify';
import axios from 'axios';
import { API } from '../../../utiles/securitiy/secreteKey';
import AddressForm from '../addressForm/AddressForm';

const UserAddress = () => {
  // Global state variables
  const { currentUser, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  // Local state variables
  const [openAddress, setOpenAddress] = useState(false);

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
    <section className="user-addresses-wrapper">
      <h2 className="user-address-title">
        {currentUser.firstName} {currentUser.lastName} Addresses
      </h2>
      <article className="add-user-address">
        <h3 className="add-title"> Add New Address </h3>
        <button
          onClick={() => setOpenAddress(true)}
          className="add-new-address-btn"
        >
          Add New Address
        </button>
      </article>

      <section className="addresses-list-container">
        {error ? <h4 className="error-message"> {error} </h4> : null}

        {/* Table addresses */}
        <table className="table-address">
          <thead className="table-head">
            <tr className="head-row">
              <th className="head-cell"> Address Type</th>
              <th className="head-cell"> Address </th>
              <th className="head-cell"> Zip Code</th>
              <th className="head-cell"> City</th>
              <th className="head-cell"> State</th>
              <th className="head-cell"> Country</th>
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
                    <td className="body-cell"> {address.address} </td>
                    <td className="body-cell">
                      {address.address1} {address.zipCode}
                    </td>
                    <td className="body-cell"> {address.city}</td>
                    <td className="body-cell"> {address.state}</td>
                    <td className="body-cell"> {address.country}</td>
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

      {openAddress && <AddressForm setOpenAddress={setOpenAddress} />}
    </section>
  );
};

export default UserAddress;
