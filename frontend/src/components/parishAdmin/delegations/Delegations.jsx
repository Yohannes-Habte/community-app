import { useEffect } from "react";
import "./Delegations.scss";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import {
  allDelegatedPriestsFailure,
  allDelegatedPriestsStart,
  allDelegatedPriestsSuccess,
} from "../../../redux/reducers/priestReducer";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";

const Delegations = () => {
  // Global state variables
  const { delegationLoading, delegationError, delegations } = useSelector(
    (state) => state.priest
  );
  const dispatch = useDispatch();

  // const [delegatedPriests, setDelegatedPriests] = useState([]);

  // Display all spiritual development
  useEffect(() => {
    const getAllDelegatedPriests = async () => {
      try {
        dispatch(allDelegatedPriestsStart());
        const { data } = await axios.get(`${API}/delegations/priests`);
        dispatch(allDelegatedPriestsSuccess(data.priests));
      } catch (error) {
        dispatch(allDelegatedPriestsFailure(error.response.data.message));
      }
    };

    getAllDelegatedPriests();
  }, []);

  // Parishioners header
  const columns = [
    { field: "id", headerName: "User ID", width: 250 },
    { field: "fullName", headerName: "Full Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Phone", width: 200 },
    { field: "serviceDate", headerName: "Date", width: 200 },
  ];

  const rows = [];

  delegations &&
    delegations.forEach((delegation) => {
      rows.push({
        id: delegation._id,
        fullName: delegation.fullName,
        email: delegation.email,
        phoneNumber: delegation.phoneNumber,
        serviceDate: delegation.serviceDate,
      });
    });

  return (
    <section className="delegated-priests-wrapper">
      <h1 className="delegated-priests"> Priests Delegation List </h1>

      {delegationLoading && <PageLoader />}

      {delegationError ? (
        <p className="error-message"> {delegationError} </p>
      ) : null}

      {!delegationLoading && !delegationError && (
        <div style={{ height: 400, width: "100%" }}>
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
        </div>
      )}
    </section>
  );
};

export default Delegations;
