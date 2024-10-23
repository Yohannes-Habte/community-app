import { useState } from "react";
import "./UserAddress.scss";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import AddressForm from "../addressForm/AddressForm";
import {
  deleteUserAddressFailure,
  deleteUserAddressStart,
  deleteUserAddressSuccess,
} from "../../../redux/reducers/user/memberReducer";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { API } from "../../../utile/security/secreteKey";

const UserAddress = () => {
  // Global state variables
  const { currentUser, loading, error } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // Local state variables
  const [openAddress, setOpenAddress] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null); // Store the address to be deleted

  // Handle Delete Confirmation
  const handleDeleteConfirmation = (address) => {
    setSelectedAddress(address);
    setDeleteDialogOpen(true);
  };

  // Delete user address
  const handleDeleteAddress = async () => {
    if (!selectedAddress) return;

    try {
      dispatch(deleteUserAddressStart());
      const { data } = await axios.delete(
        `${API}/members/address/${selectedAddress._id}`,
        { withCredentials: true }
      );
      dispatch(deleteUserAddressSuccess(data.address));
      toast.success(data.message);
      setDeleteDialogOpen(false);
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "Unable to delete address";
      dispatch(deleteUserAddressFailure(errorMessage));
      toast.error(errorMessage);
    }
  };

  return (
    <section className="member-addresses-wrapper">
      <h2 className="member-address-title">
        {currentUser.firstName} {currentUser.lastName}'s Addresses
      </h2>

      {/* Add New Address Section */}
      <article className="add-member-address">
        <h3 className="add-member-title">Add New Address</h3>
        <button
          onClick={() => setOpenAddress(true)}
          className="add-new-address-btn"
        >
          Add New Address
        </button>
      </article>

      {/* Addresses Table */}
      <section className="addresses-list-container">
        {error && <h4 className="error-message">{error}</h4>}

        {/* Table of addresses */}
        <table className="table-address">
          <thead className="table-head">
            <tr className="head-row">
              <th className="head-cell">Address Type</th>
              <th className="head-cell">Address</th>
              <th className="head-cell">Zip Code</th>
              <th className="head-cell">City</th>
              <th className="head-cell">State</th>
              <th className="head-cell">Country</th>
              <th className="head-cell">Phone</th>
              <th className="head-cell">Action</th>
            </tr>
          </thead>

          {loading ? (
            <PageLoader isLoading={loading} message="Loading..." size={80} />
          ) : error ? (
            <Alert severity="error">{error}</Alert>
          ) : currentUser.addresses.length === 0 ? (
            <Alert severity="info">No addresses found</Alert>
          ) : (
            <tbody className="table-body">
              {currentUser.addresses.map((address) => (
                <AddressRow
                  key={address._id}
                  address={address}
                  currentUser={currentUser}
                  handleDelete={handleDeleteConfirmation}
                />
              ))}
            </tbody>
          )}
        </table>
      </section>

      {/* Delete Confirmation Dialog */}
      <Dialog
        open={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Address</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this address? This action cannot be
            undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleDeleteAddress} color="secondary" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Address Form */}
      {openAddress && <AddressForm setOpenAddress={setOpenAddress} />}
    </section>
  );
};

// Reusable AddressRow Component
const AddressRow = ({ address, currentUser, handleDelete }) => {
  return (
    <tr className="body-row">
      <td className="body-cell">{address.addressType}</td>
      <td className="body-cell">{address.address}</td>
      <td className="body-cell">{address.zipCode}</td>
      <td className="body-cell">{address.city}</td>
      <td className="body-cell">{address.state}</td>
      <td className="body-cell">{address.country}</td>
      <td className="body-cell">{currentUser.phone}</td>
      <td className="body-cell">
        <MdDelete
          className="delete-icon"
          onClick={() => handleDelete(address)}
        />
      </td>
    </tr>
  );
};

export default UserAddress;
