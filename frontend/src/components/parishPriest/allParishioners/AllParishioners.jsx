import { useEffect, useState } from "react";
import "./AllParishioners.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

const AllParishioners = () => {
  // Local state variables
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Display all users
  useEffect(() => {
    const getAllParishioners = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/members`, {
          withCredentials: true,
        });

        setMembers(data.users);
        setLoading(false);
      } catch (error) {
        setError(error.response.data.message);
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
    { field: "email", headerName: "Email", width: 200 },
    { field: "phone", headerName: "Phone", width: 150 },
    { field: "street", headerName: "Street Name", type: "number", width: 150 },
    { field: "zipCode", headerName: "Zip Code", width: 100 },
    { field: "city", headerName: "City", width: 100 },
    { field: "state", headerName: "State", width: 100 },
    { field: "country", headerName: "Country", width: 100 },
    { field: "role", headerName: "Role", width: 100 },
  ];

  const rows = [];

  members &&
    members.forEach((parishioner) => {
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
    <section>
      <h1>Current Members of the Eritrean Roman Catholic Church in Hamburg</h1>

      {loading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

      {!loading && !error && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            // Rows
            rows={rows}
            // Columns
            columns={columns}
            // Automatically adjust grid height based on rows
            autoHeight
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
        </div>
      )}
    </section>
  );
};

export default AllParishioners;
