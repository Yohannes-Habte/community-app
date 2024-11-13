import { useEffect, useState, useMemo } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Alert } from "@mui/material";
import axios from "axios";
import "./AllParishioners.scss";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { API } from "../../../utile/security/secreteKey";

const AllParishioners = () => {
  // Local state variables
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fetch all parishioners on component mount
  useEffect(() => {
    const getAllParishioners = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API}/members/priest`, {
          withCredentials: true,
        });

        setMembers(data?.users || []);
      } catch (err) {
        setError(
          err?.response?.data?.message || "Failed to load parishioners."
        );
      } finally {
        setLoading(false);
      }
    };

    getAllParishioners();
  }, []);

  // Define the columns for the DataGrid
  const columns = useMemo(
    () => [
      { field: "firstName", headerName: "First Name", width: 150 },
      { field: "lastName", headerName: "Last Name", width: 150 },
      { field: "maritalStatus", headerName: "Status", width: 100 },
      { field: "email", headerName: "Email", width: 200 },
      { field: "phone", headerName: "Phone", width: 150 },
      { field: "street", headerName: "Street Name", width: 150 },
      { field: "zipCode", headerName: "Zip Code", width: 100 },
      { field: "city", headerName: "City", width: 100 },
      { field: "state", headerName: "State", width: 100 },
      { field: "country", headerName: "Country", width: 100 },
      { field: "role", headerName: "Role", width: 150 },
    ],
    []
  );

  // Prepare rows using memoization for performance optimization
  const rows = useMemo(
    () =>
      members.map((parishioner) => ({
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
      })),
    [members]
  );

  return (
    <section className="priest-dashboard-parishioners-container">
      <h1 className="parishioners-title">
        Current Members of the Eritrean Roman Catholic Church in Hamburg
      </h1>

      {/* Loading state */}
      {loading ? (
        <PageLoader isLoading={loading} message="Loading..." size={90} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : rows.length === 0 ? (
        <Alert severity="info">No parishioners found.</Alert>
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
          // Create a search bar with a toolbar
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
    </section>
  );
};

export default AllParishioners;
