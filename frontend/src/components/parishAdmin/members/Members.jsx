import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./Members.scss";
import Register from "../../forms/registerForm/Register";
import { useDispatch, useSelector } from "react-redux";
import { getAllParishioners } from "../../../redux/actions/user/userAction";

const Members = () => {
  // Global state variables
  const dispatch = useDispatch();
  const parishioners = useSelector((state) => state.member.parishioners);
  const loading = useSelector((state) => state.user.loading.members);
  const error = useSelector((state) => state.user.error.members);

  // Local variables
  const [addUser, setAddUser] = useState(false);

  useEffect(() => {
    dispatch(getAllParishioners());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Parishioners header
  const columns = [
    { field: "id", headerName: "User ID", width: 130 },
    { field: "firstName", headerName: "First Name", width: 100 },
    { field: "lastName", headerName: "Last Name", width: 100 },
    { field: "maritalStatus", headerName: "Status", width: 100 },
    { field: "email", headerName: "Email", width: 150 },
    { field: "phone", headerName: "Phone", width: 100 },
    { field: "street", headerName: "Street Name", type: "number", width: 100 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
    {
      field: "action",
      headerName: "Action",
      width: 70,
      renderCell: () => {
        return <div className="action-wrapper"></div>;
      },
    },
  ];

  const rows = [];

  parishioners &&
    parishioners.forEach((parishioner) => {
      rows.push({
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
      });
    });

  return (
    <section className="members-container">
      <h1 className="members-title">
        Current Members of the Eritrean Roman Catholic Church in Hamburg
      </h1>

      <aside className="new-member-wrapper">
        <h3 className="title"> Add New Member</h3>
        <button onClick={() => setAddUser(true)} className="add-member">
          Add User
        </button>
      </aside>

      <DataGrid
        // Rows
        rows={rows}
        // Columns
        columns={columns}
        // Initial state
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        // Create search bar
        slots={{ toolbar: GridToolbar }}
        // Search a specific user
        slotProps={{
          toolbar: {
            showQuickFilter: true,
            quickFilterProps: { debounceMs: 500 },
          },
        }}
        // Page size optons
        pageSizeOptions={[5, 10]}
        checkboxSelection
        disableRowSelectionOnClick
        //
      />

      {addUser && <Register addMember={"add Member"} setAddUser={setAddUser} />}
    </section>
  );
};

export default Members;
