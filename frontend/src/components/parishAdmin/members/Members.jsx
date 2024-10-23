import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./Members.scss";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  clearAllMemberErrors,
  fetchParishioners,
} from "../../../redux/actions/user/userAction";
import { Alert } from "@mui/material";
import { API } from "../../../utile/security/secreteKey";
import Register from "../../forms/createAccount/Register";

const Members = () => {
  const { parishioners, loading, error } = useSelector((state) => state.member);
  const dispatch = useDispatch();

  const [memberId, setMemberId] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [openAddNewMember, setOpenAddNewMember] = useState(false);
  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);

  // Fetch members when the component mounts
  useEffect(() => {
    dispatch(fetchParishioners());

    return () => {
      dispatch(clearAllMemberErrors());
    };
  }, [dispatch]);

  // Handle member deletion with proper error handling
  const handleDelete = async (id) => {
    try {
      setDeleteLoading(true);
      const response = await axios.delete(`${API}/members/user/${id}`, {
        withCredentials: true,
      });

      if (response.status === 200) {
        dispatch(fetchParishioners());
      }
    } catch (err) {
      setDeleteError(
        err.response?.data?.message ||
          "An error occurred while deleting the member."
      );
    } finally {
      setDeleteLoading(false);
      setOpenDeleteConfirm(false); // Close confirmation dialog after delete
    }
  };

  // Define the columns for the DataGrid
  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "maritalStatus", headerName: "Status", width: 100 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "street", headerName: "Street Name", width: 130 },
    { field: "zipCode", headerName: "Zip Code", width: 70 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 80,
      renderCell: (params) => (
        <div className="action-wrapper">
          <button
            onClick={() => {
              setOpenDeleteConfirm(true);
              setMemberId(params.row.id);
            }}
            className="delete"
            disabled={deleteLoading}
            aria-label={`Delete member: ${params.row.firstName} ${params.row.lastName}`}
          >
            <MdDelete />
          </button>
        </div>
      ),
    },
  ];

  const rows = parishioners.map((parishioner) => ({
    id: parishioner._id,
    firstName: parishioner.firstName,
    lastName: parishioner.lastName,
    maritalStatus: parishioner.maritalStatus,
    email: parishioner.email,
    phone: parishioner.phone,
    street: parishioner.street,
    zipCode: parishioner.zipCode,
    city: parishioner.city,
    state: parishioner.state,
    country: parishioner.country,
    role: parishioner.role,
  }));

  // Separate Delete Confirmation Modal component
  const DeleteConfirmationModal = ({ onCancel, onConfirm, deleteLoading }) => {
    return (
      <article className="member-delete-confirmation-modal">
        <h3 className="delete-confirmation-title">Delete ERCCH Member </h3>
        <p className="delete-confirmation-statement">
          Are you sure you want to delete this ERCCH member? This action cannot
          be undone.
        </p>
        <div className="confirmation-buttons-wrapper">
          <button className="cancel-delete-btn" onClick={onCancel}>
            Cancel
          </button>

          <button
            className="confirm-delete-btn"
            onClick={onConfirm}
            disabled={deleteLoading}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
        </div>
        {deleteError && <Alert severity="error"> {deleteError} </Alert>}
      </article>
    );
  };

  return (
    <section className="members-container">
      <h1 className="members-title">
        Current Members of the Eritrean Roman Catholic Church in Hamburg
      </h1>

      <aside className="new-member-wrapper">
        <h3 className="title">Add New Member</h3>
        <button
          onClick={() => setOpenAddNewMember(true)}
          className="add-member"
          aria-label="Add a new member"
        >
          Add Member
        </button>
      </aside>

      {loading && (
        <PageLoader
          isLoading={loading}
          message="Loading members..."
          size={90}
        />
      )}

      {error && (
        <Alert severity="error" className="error-message">
          {error}
        </Alert>
      )}

      {!loading && !error && parishioners.length > 0 ? (
        <div style={{ height: 400, width: "100%" }}>
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
        </div>
      ) : (
        !loading && <Alert severity="info">No members found.</Alert>
      )}

      {openDeleteConfirm && (
        <DeleteConfirmationModal
          memberId={memberId}
          onCancel={() => setOpenDeleteConfirm(false)}
          onConfirm={() => handleDelete(memberId)}
          deleteLoading={deleteLoading}
        />
      )}

      {openAddNewMember && (
        <Register open={openAddNewMember} setOpen={setOpenAddNewMember} />
      )}
    </section>
  );
};

export default Members;
