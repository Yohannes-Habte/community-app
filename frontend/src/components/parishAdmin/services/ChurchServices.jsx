import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./ChurchServices.scss";
import { useEffect } from "react";
import {
  allServices,
  clearAllErrors,
} from "../../../redux/actions/service/serviceAction";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

const ChurchServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(allServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Parishioners header
  const columns = [
    { field: "id", headerName: "Service ID", width: 250 },
    { field: "serviceName", headerName: "Service Name", width: 200 },
    { field: "serviceDate", headerName: "Service Date", width: 200 },
    {
      field: "identificationDocument",
      headerName: "Identification Document",
      width: 300, // Adjust width to fit the document URL
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      ),
    },
    { field: "message", headerName: "Message", width: 200 },
    {
      field: "serviceStatus",
      headerName: "Service Status",
      width: 150,
      renderCell: (params) => {
        let color = "";

        // Set the color based on the serviceStatus value
        if (params.value === "pending") {
          color = "orange";
        } else if (params.value === "completed") {
          color = "green";
        } else if (params.value === "cancelled") {
          color = "red";
        }

        return (
          <span
            style={{
              color: color,
              fontWeight: "bold",
              fontSize: "14px",
            }}
          >
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        );
      },
    },
  ];

  const rows = [];

  // Sacraments pushed to rows
  services &&
    services.forEach((service) => {
      rows.push({
        id: service._id,
        serviceName: service.serviceName,
        serviceDate: new Date(service.serviceDate).toLocaleDateString(), // Format date
        identificationDocument: service.identificationDocument,
        message: service.message.slice(0, 20) + "...",
        serviceStatus: service.serviceStatus,
      });
    });
  return (
    <section className="church-services-table-wrapper">
      <h1> Church Services </h1>

      {loading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

      {!loading && !error && (
        <div style={{ width: "100%" }}>
          <DataGrid
            // Rows
            rows={rows}
            // Columns
            columns={columns}
            // Automatically adjust grid height based on rows
            autoHeight
            // Initial state for pagination
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
            // Page size options
            pageSizeOptions={[5, 10]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        </div>
      )}
    </section>
  );
};

export default ChurchServices;
