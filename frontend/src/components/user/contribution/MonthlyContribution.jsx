import { useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import "./MonthlyContribution.scss"

const MonthlyContribution = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);

  // Local state variables
  const [contributions, setContributions] = useState([]);
  console.log("contributions=", contributions);

  // Display all users
  useEffect(() => {
    const getMemberContributions = async () => {
      try {
        const { data } = await axios.get(
          `${API}/contributions/${currentUser._id}`
        );

        setContributions(data.memberContributions);
      } catch (error) {
        console.log(error.message);
      }
    };

    getMemberContributions();
  }, []);

  // Contribution header
  const columns = [
    { field: "id", headerName: "Contribution ID", width: 350 },
    { field: "date", headerName: "Contribution Date", width: 300 },
    { field: "amount", headerName: "Contribution Amount", width: 300 },
  ];

  // Row data
  const rows = [];

  contributions &&
    contributions.map((contribution) => {
      return rows.push({
        id: contribution._id,
        date: contribution.date,
        amount: contribution.amount,
      });
    });

  console.log("rows=", rows);
  return (
    <section className="user-monthly-contribution-container">
      <h1 className="user-monthly-contribution-title">
        {currentUser ? currentUser.firstName : "User"} Monthly Contribution
      </h1>

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
    </section>
  );
};

export default MonthlyContribution;
