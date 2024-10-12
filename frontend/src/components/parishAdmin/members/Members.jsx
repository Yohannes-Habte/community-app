import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./Members.scss";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Members = () => {
  // Local state variables
  const [members, setMembers] = useState([]);
  const [openAddUser, setOpenAddUser] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Display all users
  useEffect(() => {
    const getAllParishioners = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/members/all`, {
          withCredentials: true,
        });
        setMembers(data.users);
      } catch (error) {
        const errorMessage =
          error.response?.data?.message ||
          "An error occurred while fetching members.";
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    getAllParishioners();
  }, []);

  // Parishioners header
  const columns = [
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "maritalStatus", headerName: "Status", width: 100 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phone", headerName: "Phone", width: 130 },
    { field: "street", headerName: "Street Name", type: "string", width: 130 },
    { field: "zipCode", headerName: "Zip Code", width: 70 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <button
              className="edit"
              aria-label={`Edit ${params.row.firstName} ${params.row.lastName}`}
            >
              <FaEdit />
            </button>
            <button
              className="delete"
              aria-label={`Delete ${params.row.firstName} ${params.row.lastName}`}
            >
              <MdDelete />
            </button>
          </div>
        );
      },
    },
  ];

  const rows = members.map((parishioner) => ({
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

  return (
    <section className="members-container">
      <h1 className="members-title">
        Current Members of the Eritrean Roman Catholic Church in Hamburg
      </h1>

      <aside className="new-member-wrapper">
        <h3 className="title"> Add New Member</h3>
        <button onClick={() => setOpenAddUser(true)} className="add-member">
          Add User
        </button>
      </aside>

      {loading && <PageLoader isLoading={loading} message="" size={90} />}

      {error && <p className="error-message"> {error} </p>}

      {!loading && !error && members.length !== 0 ? (
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
        !loading && <p>No members found.</p>
      )}

      {
        openAddUser &&
          " Add user form" /* This would ideally be a modal or form component */
      }
    </section>
  );
};

export default Members;
