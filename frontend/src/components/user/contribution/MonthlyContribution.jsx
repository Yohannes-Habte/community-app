import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

const MonthlyContribution = () => {
  // Global state variables
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Local state variables
  const [contributions, setContributions] = useState([]);
  console.log("contributions=", contributions);

  // Display all users
  useEffect(() => {
    const getMemberContributions = async () => {
      try {
        // dispatch(membersFetchStart());
        const { data } = await axios.get(
          `${API}/contributions/${currentUser._id}`
        );
        // dispatch(membersFetchSuccess(data.users));
        setContributions(data.memberContributions);
      } catch (error) {
        console.log(error.message);
        // dispatch(membersFetchFailure(error.response.data.message));
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

  console.log("rows", rows);

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
    <section>
      <h1>User Monthly Contribution</h1>

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
    </section>
  );
};

export default MonthlyContribution;
