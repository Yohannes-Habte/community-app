import "./AllDelegations.scss";
import { useEffect, useState, useCallback, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import {
  clearErrorsAction,
  fetchDelegatedPriests,
} from "../../../redux/actions/delegation/delegationAction";
import AddDelegation from "../../forms/priestDelegation/AddDelegation";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { Alert } from "@mui/material";
import { API } from "../../../utile/security/secreteKey";

// Component to manage all delegation operations
const AllDelegations = () => {
  // Redux state and dispatch hook
  const { priests, error, loading } = useSelector((state) => state.priest);
  const dispatch = useDispatch();

  // Local state variables
  const [delegationId, setDelegationId] = useState("");
  const [openDeleteDelegatedPriest, setOpenDeleteDelegatedPriest] = useState(false);
  const [isAddDelegationOpen, setIsAddDelegationOpen] = useState(false);

  // Fetch delegated priests on component mount
  useEffect(() => {
    dispatch(fetchDelegatedPriests());

    // Clear errors on unmount
    return () => {
      dispatch(clearErrorsAction());
    };
  }, [dispatch]);

  // Memoize rows to prevent unnecessary recalculations
  const rows = useMemo(() => {
    return (
      priests?.map((delegation) => ({
        id: delegation._id,
        fullName: delegation.fullName,
        email: delegation.email,
        phoneNumber: delegation.phoneNumber,
        serviceDate: new Date(delegation.serviceDate).toLocaleDateString(
          "en-GB",
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        ),
      })) || []
    );
  }, [priests]);

  // DataGrid column configuration
  const columns = [
    { field: "id", headerName: "User ID", width: 250 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "serviceDate", headerName: "Date", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="action-wrapper">
          <Link to={`/delegations/${params.id}`} className="edit">
            <MdEditSquare className="edit-icon" />
          </Link>
          <button
            className="delete"
            onClick={() => handleOpenDeleteModal(params.id)}
          >
            <FaTrashAlt className="delete-icon" />
          </button>
        </div>
      ),
    },
  ];

  // Handle opening and closing of delete modal
  const handleOpenDeleteModal = (id) => {
    setDelegationId(id);
    setOpenDeleteDelegatedPriest(true);
  };

  const handleCloseDeleteModal = () => {
    setOpenDeleteDelegatedPriest(false);
  };

  // Handle delete operation for a delegation with error handling and confirmation
  const handleDelete = useCallback(async () => {
    try {
      const { data } = await axios.delete(
        `${API}/delegations/${delegationId}`,
        {
          withCredentials: true,
        }
      );
      toast.success(data.message);
      dispatch(fetchDelegatedPriests());
    } catch (error) {
      const errorMessage =
        error?.response?.data?.message || "An error occurred.";
      toast.error(errorMessage);
    } finally {
      openDeleteDelegatedPriest(false);
    }
  }, [delegationId, dispatch]);

  return (
    <section className="delegated-priests-table-container">
      <h2 className="delegated-priests-table-title">Priests Delegation List</h2>

      {/* Add Delegation Section */}
      <aside className="add-delegation-priest-wrapper">
        <h3 className="add-delegation-priest-title">Add Priest delegation </h3>
        <button
          onClick={() => setIsAddDelegationOpen(true)}
          className="add-delegation-btn"
        >
          Add New
        </button>
      </aside>

      {/* Loader, Error, and Data Display */}
      {loading ? (
        <PageLoader isLoading={loading} message="Loading..." size={90} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : !loading && !error && rows.length === 0 ? (
        <Alert severity="info">No delegated priest found</Alert>
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

      {/* Delete Confirmation Modal */}
      {openDeleteDelegatedPriest && (
        <DeleteConfirmationModal
          onClose={handleCloseDeleteModal}
          onConfirm={handleDelete}
        />
      )}

      {/* Add Delegation Modal */}
      {isAddDelegationOpen && (
        <AddDelegation setOpenDelegation={setIsAddDelegationOpen} />
      )}
    </section>
  );
};

const DeleteConfirmationModal = ({ onClose, onConfirm }) => (
  <article className="delegated-priest-delete-confirmation-modal">
    <h3 className="delete-confirmation-title"> Delete Delegated Priest</h3>
    <p className="delete-confirmation-statement">
      Are you sure you want to delete this delegated priest? This action cannot
      be undone.
    </p>
    <div className="confirmation-buttons-wrapper">
      <button className="cancel-delete-btn" onClick={onClose}>
        Cancel
      </button>
      <button className="confirm-delete-btn" onClick={onConfirm}>
        Delete
      </button>
    </div>
  </article>
);

export default AllDelegations;
