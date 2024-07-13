import { useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllSacramentsFailure, fetchAllSacramentsStart, fetchAllSacramentsSuccess } from "../../../redux/reducers/sacramentReducer";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import {
  fetchAllPrayersFailure,
  fetchAllPrayersStart,
  fetchAllPrayersSuccess,
} from "../../../redux/reducers/prayerReducer";
import { fetchAllSpiritualsFailure, fetchAllSpiritualsStart, fetchAllSpiritualsSuccess } from "../../../redux/reducers/spiritualReducer";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

const AllChurchServices = () => {
  // Global state variables
  const { sacLoading, sacError, sacraments } = useSelector(
    (state) => state.sacrament
  );
  const { prayers } = useSelector((state) => state.prayer);
  const { spirituals } = useSelector((state) => state.spiritual);
  const dispatch = useDispatch();

  // Local state variables
  // const [allSacraments, setAllSacraments] = useState([]);
  // const [allPrayers, setAllPrayers] = useState([]);
  // const [allSpirituals, setAllSpirituals] = useState([]);

  // Display all sacrament
  useEffect(() => {
    const getAllSacraments = async () => {
      try {
        dispatch(fetchAllSacramentsStart());
        const { data } = await axios.get(`${API}/sacraments`);
        dispatch(fetchAllSacramentsSuccess(data.sacraments));
      } catch (error) {
        dispatch(fetchAllSacramentsFailure(error.response.data.message));
      }
    };

    getAllSacraments();
  }, []);

  // Display all prayers
  useEffect(() => {
    const getAllPrayers = async () => {
      try {
        dispatch(fetchAllPrayersStart());
        const { data } = await axios.get(`${API}/prayers`);
        dispatch(fetchAllPrayersSuccess(data.prayers));
      } catch (error) {
        dispatch(fetchAllPrayersFailure(error.response.data.message));
      }
    };

    getAllPrayers();
  }, []);

  // Display all spiritual development
  useEffect(() => {
    const getAllSpirituals = async () => {
      try {
        dispatch(fetchAllSpiritualsStart());
        const { data } = await axios.get(`${API}/spirituals`);
        dispatch(fetchAllSpiritualsSuccess(data.spirituals));
      } catch (error) {
        dispatch(fetchAllSpiritualsFailure(error.response.data.message));
      }
    };

    getAllSpirituals();
  }, []);

  // Parishioners header
  const columns = [
    { field: "id", headerName: "Service ID", width: 250 },
    { field: "name", headerName: "Service Name", width: 200 },
    { field: "date", headerName: "Service Date", width: 200 },
    { field: "phone", headerName: "Phone Number", width: 200 },
    { field: "userStatus", headerName: "User Status", width: 200 },
    { field: "serviceStatus", headerName: "Service Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return <div className="action-wrapper"></div>;
      },
    },
  ];

  const rows = [];

  // Sacraments pushed to rows
  sacraments &&
    sacraments.forEach((sacrament) => {
      rows.push({
        id: sacrament._id,
        name: sacrament.name,
        date: sacrament.date,
        phone: sacrament.phone,
        userStatus: sacrament.userStatus,
        serviceStatus: sacrament.serviceStatus,
      });
    });

  // Prayers pushed to rows
  prayers &&
    prayers.forEach((prayer) => {
      rows.push({
        id: prayer._id,
        name: prayer.name,
        date: prayer.date,
        phone: prayer.phone,
        userStatus: prayer.userStatus,
        serviceStatus: prayer.serviceStatus,
      });
    });

  // Spirituals pushed to rows
  spirituals &&
    spirituals.forEach((spiritual) => {
      rows.push({
        id: spiritual._id,
        name: spiritual.name,
        date: spiritual.date,
        phone: spiritual.phone,
        userStatus: spiritual.userStatus,
        serviceStatus: spiritual.serviceStatus,
      });
    });

  return (
    <section>
      <h1> Church Services </h1>

      {sacLoading && <PageLoader />}

      {sacError ? <p className="error-message"> {sacError} </p> : null}

      {!sacLoading && !sacError && (
        <div style={{ height: 400, width: "100%" }}>
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
        </div>
      )}
    </section>
  );
};

export default AllChurchServices;
