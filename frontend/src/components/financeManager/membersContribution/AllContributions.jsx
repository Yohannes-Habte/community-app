import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./AllContributions.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddContribution from "../../forms/memberContribution/AddContribution";
import {
  clearContributionErrors,
  fetchAllContributions,
} from "../../../redux/actions/contributions/contributionAction";
import { Alert } from "@mui/material";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";

const MembersContribution = () => {
  const dispatch = useDispatch();
  const { contributions, loading, error } = useSelector(
    (state) => state.contributions
  );

  const [openAddContribution, setOpenAddContribution] = useState(false);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [buttonLoading, setButtonLoading] = useState(false);

  // Fetch all contributions when the component mounts
  useEffect(() => {
    dispatch(fetchAllContributions());
    return () => {
      dispatch(clearContributionErrors());
    };
  }, [dispatch]);

  // Prepare rows for DataGrid
  const rows = contributions
    .filter((contribution) => {
      if (!selectedYear) return true; // Show all if no year is selected
      const contributionYear = new Date(contribution.date).getFullYear();
      return contributionYear === parseInt(selectedYear);
    })
    .map((contribution) => ({
      id: contribution._id,
      user: contribution.user,
      firstName: contribution.firstName,
      lastName: contribution.lastName,
      date: new Date(contribution.date).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      amount: contribution.amount,
    }));

  // Define columns for DataGrid
  const columns = [
    { field: "id", headerName: "Contribution ID", width: 200 },
    { field: "user", headerName: "User ID", width: 250 },
    { field: "firstName", headerName: "First Name", width: 150 },
    { field: "lastName", headerName: "Last Name", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    { field: "amount", headerName: "Amount", width: 80 },
  ];

  // Handle year filter submission and validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputYear = parseInt(selectedYear, 10);
    const currentYear = new Date().getFullYear();

    // Validate the year input
    if (!inputYear || inputYear < 2022 || inputYear > currentYear) {
      setErrorMessage(
        `Please enter a valid year between 2022 and ${currentYear}.`
      );
      return;
    }

    setButtonLoading(true); // Show loading state for button
    await dispatch(fetchAllContributions());
    setButtonLoading(false); // Reset button loading state after fetch
  };

  const [errorMessage, setErrorMessage] = useState("");

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

      {/* Year filter input */}
      <form className="year-filter-form" onSubmit={handleSubmit}>
        <label htmlFor="selectedYear" className="year-filter-label">
          Filter by Year:
        </label>
        <input
          type="number"
          name="selectedYear"
          id="selectedYear"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          placeholder={`Enter year e.g. ${selectedYear}`}
          className="year-filter-input"
          aria-label="Year filter input"
          required
        />
        <button
          type="submit"
          disabled={buttonLoading}
          className="year-filter-btn"
        >
          {buttonLoading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Display messages for loading or error */}
      {loading && <PageLoader isLoading={loading} message="" />}
      {error && <Alert severity="error">{error}</Alert>}
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {!loading && rows.length === 0 && (
        <Alert severity="error">
          No contributions found for the year {selectedYear}!
        </Alert>
      )}

      {/* Display the DataGrid with filtered contributions */}
      {!loading && rows.length > 0 && (
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

      {/* Show modal for adding a new contribution */}
      {openAddContribution && (
        <AddContribution setOpenAddContribution={setOpenAddContribution} />
      )}
    </section>
  );
};

export default MembersContribution;
