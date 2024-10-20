import { useEffect } from "react";
import "./Delegations.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import {
  clearErrorsAction,
  fetchAllDelegatedPriests,
} from "../../../redux/actions/delegation/delegationAction";
import { toast } from "react-toastify"; // Toast for professional error/success feedback
import { Alert } from "@mui/material";

const Delegations = () => {
  // Global state variables
  const { priests, error, loading } = useSelector((state) => state.priest);
  const dispatch = useDispatch();

  // Fetch delegated priests on component mount
  useEffect(() => {
    dispatch(fetchAllDelegatedPriests());

    // Clear errors on component unmount
    return () => {
      dispatch(clearErrorsAction());
    };
  }, [dispatch]);

  // Handle error gracefully and show user-friendly feedback
  useEffect(() => {
    if (error) {
      // Toast notification for errors (cleaner UX)
      toast.error(
        "Failed to fetch priests' delegation list. Please try again."
      );
      dispatch(clearErrorsAction());
    }
  }, [error, dispatch]);

  // Priests table columns configuration
  const columns = [
    { field: "id", headerName: "User ID", width: 250 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "serviceDate", headerName: "Date", width: 200 },
  ];

  // Prepare table rows dynamically from priests data
  const rows =
    priests?.map((delegation) => ({
      id: delegation._id,
      fullName: delegation.fullName,
      email: delegation.email,
      phoneNumber: delegation.phoneNumber,
      serviceDate: new Date(delegation.serviceDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      ),
    })) || [];

  return (
    <section className="delegated-priests-wrapper">
      <h1 className="delegated-priests-title">Priests Delegation List</h1>

      {loading && <PageLoader isLoading={loading} message="" size={80} />}

      {error && <Alert className="error-message">Error: {error}</Alert>}

      {!loading && !error && (
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
      )}
    </section>
  );
};

export default Delegations;
