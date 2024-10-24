import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import "./Addresses.scss";

import { API } from "../../../utile/security/secreteKey";
import { FaTrashAlt } from "react-icons/fa";
import { Alert } from "@mui/material";

const Addresses = () => {
  // Global state variables
  const { currentUser, loading, error } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  // Local state variables
  const [openAddress, setOpenAddress] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [addressId, setAddressId] = useState(null);

  // delete user address
  const handleDelete = async () => {
    try {
      dispatch(deleteUserAddressStart());
      const { data } = await axios.delete(
        `${API}/members/address/${addressId}`,
        {
          withCredentials: true,
        }
      );
      dispatch(deleteUserAddressSuccess(data.result));
      toast.success(data.message);
      setDeleteDialogOpen(false);
    } catch (error) {
      dispatch(deleteUserAddressFailure(error.message));
      toast.error("Failed to delete address");
    }
  };

  const columns = [
    { field: "addressType", headerName: "Address Type", width: 150 },
    { field: "address", headerName: "Street Name", width: 150 },
    { field: "zipCode", headerName: "Zip Code", width: 150 },
    { field: "city", headerName: "City", width: 150 },
    { field: "state", headerName: "State", width: 150 },
    { field: "country", headerName: "Country", width: 150 },

    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <button
              className="delete"
              onClick={() =>
                setAddressId(params.id) || setDeleteDialogOpen(true)
              }
            >
              <FaTrashAlt className="delete-icon" />
            </button>
          </div>
        );
      },
    },
  ];

  // Prepare the rows for DataGrid based on currentUser addresses
  const rows = currentUser.addresses.map((address) => ({
    id: address._id,
    addressType: address.addressType,
    address: address.address,
    zipCode: address.zipCode,
    city: address.city,
    state: address.state,
    country: address.country,
  }));

  return (
    <section className="member-addresses-wrapper">
      <h2 className="member-address-title">Your Current Addresses</h2>

      {/* Add New Address Section */}
      <article className="add-new-user-address">
        <h3 className="add-member-title">Add New Address</h3>
        <button
          onClick={() => setOpenAddress(true)}
          className="add-new-address-btn"
        >
          Add New Address
        </button>
      </article>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : currentUser.addresses.length === 0 ? (
        <Alert severity="info">
          You have not added any addresses yet. Start by adding a new one!
        </Alert>
      ) : (
        <DataGrid
          rows={rows}
          columns={columns}
          autoHeight
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
            },
          }}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      )}

      {deleteDialogOpen && (
        <article className="address-delete-confirmation-modal">
          <h3 className="delete-confirmation-title">Delete Event</h3>
          <p className="delete-confirmation-statement">
            Are you sure you want to delete this event? This action cannot be
            undone.
          </p>

          <div className="confirmation-buttons-wrapper">
            <button
              className={`cancel-delete-btn`}
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              className={`confirm-delete-btn`}
              onClick={() =>
                setDeleteDialogOpen(false) || handleDelete(addressId)
              }
            >
              Delete
            </button>
          </div>
        </article>
      )}

      {/* Address Form */}
      {openAddress && <AddressForm setOpenAddress={setOpenAddress} />}
    </section>
  );
};

export default Addresses;
