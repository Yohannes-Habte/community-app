import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./MembersContribution.scss";
import { useEffect, useState } from "react";
import AddContribution from "../../forms/memberContribution/AddContribution";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

const MembersContribution = () => {
  const [openAddContribution, setOpenAddContribution] = useState(false);
  const [contributions, setContributions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const allContributions = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`${API}/contributions`);
        setContributions(data.result);
        setLoading(false);
      } catch (error) {
        setError("Something went wrong!");
        console.log(error);
        setLoading(false);
      }
    };
    allContributions();
  }, []);

  const columns = [
    { field: "id", headerName: "Contribution ID", width: 250 },
    { field: "user", headerName: "User ID", width: 250 },
    { field: "firstName", headerName: "First Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "amount", headerName: "Amount", width: 100 },
  ];

  const rows = [];
  contributions &&
    contributions.map((contribution) => {
      return rows.push({
        id: contribution._id,
        user: contribution.user,
        firstName: contribution.firstName,
        lastName: contribution.lastName,
        date: contribution.date,
        amount: contribution.amount,
      });
    });

  return (
    <section className="members-contribution-wrapper">
      <h3 className="members-contribution-title">
        Parishioners Contribution Table
      </h3>
      <aside className="add-contribution-aside">
        <h3 className="add-contribution-aside-title">
          Add Member Contribution
        </h3>
        <button
          onClick={() => setOpenAddContribution(true)}
          className="add-contribution-btn"
        >
          Add New Contribution
        </button>
      </aside>

      {loading && <h3>Loading...</h3>}
      {error && <h3>{error}</h3>}
      {contributions.length === 0 && <h3>No contributions found!</h3>}

      {!loading && !error && contributions.length > 0 && (
        <DataGrid
          // Rows
          rows={rows}
          // Columns
          columns={columns}
          // Initial state
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
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
      )}

      {openAddContribution && (
        <AddContribution setOpen={setOpenAddContribution} />
      )}
    </section>
  );
};

export default MembersContribution;
