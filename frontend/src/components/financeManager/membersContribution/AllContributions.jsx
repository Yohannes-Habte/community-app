import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useState } from "react";
import AddContribution from "../../forms/memberContribution/AddContribution";

const AllContributions = () => {
  const [openAddContribution, setOpenAddContribution] = useState(false);
  // Parishioners header
  const columns = [
    { field: "id", headerName: "Contribution ID", width: 350 },
    { field: "date", headerName: "Contribution Date", width: 200 },
    { field: "lastName", headerName: "Contribution Amount", width: 200 },
    { field: "amount", headerName: "Contribution", width: 200 },
    { field: "date", headerName: "Date", width: 200 },
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

      {openAddContribution && (
        <AddContribution setOpen={setOpenAddContribution} />
      )}
    </section>
  );
};

export default AllContributions;
