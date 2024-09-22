import { useEffect } from "react";
import "./Delegations.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import {
  clearErrorsAction,
  fetchAllDelegatedPriests,
} from "../../../redux/actions/delegation/delegationAction";

const Delegations = () => {
  // Global state variables
  const { priests, error, loading } = useSelector((state) => state.priest);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllDelegatedPriests());

    // clear errors on component unmount
    return () => {
      dispatch(clearErrorsAction());
    };
  }, [dispatch]);

  // Parishioners header
  const columns = [
    { field: "id", headerName: "User ID", width: 250 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "serviceDate", headerName: "Date", width: 200 },
  ];

  const rows = [];

  priests &&
    priests.forEach((delegation) => {
      const formattedDate = new Date(delegation.serviceDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );

      rows.push({
        id: delegation._id,
        fullName: delegation.fullName,
        email: delegation.email,
        phoneNumber: delegation.phoneNumber,
        serviceDate: formattedDate,
      });
    });

  return (
    <section className="delegated-priests-wrapper">
      <h1 className="delegated-priests"> Priests Delegation List </h1>

      {loading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

      {!loading && !error && (
        <div style={{ height: 400, width: "100%" }}>
          <DataGrid
            // Rows
            rows={rows}
            // Columns
            columns={columns}
            // Auto height
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

export default Delegations;
