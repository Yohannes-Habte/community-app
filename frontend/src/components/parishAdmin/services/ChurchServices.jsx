import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import "./ChurchServices.scss";
import { useEffect } from "react";
import {
  allServices,
  clearAllErrors,
} from "../../../redux/actions/service/serviceAction";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import { toast } from "react-toastify"; // For improved error notifications
import { Alert } from "@mui/material";

const ChurchServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  useEffect(() => {
    dispatch(allServices());

    // Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  // Define the columns for the DataGrid
  const columns = [
    { field: "id", headerName: "Service ID", width: 250 },
    { field: "serviceName", headerName: "Service Name", width: 200 },
    { field: "serviceDate", headerName: "Service Date", width: 200 },
    {
      field: "identificationDocument",
      headerName: "Identification Document",
      width: 300, // Adjust width to fit the document URL
      renderCell: (params) => (
        <a
          href={params.value}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            if (!params.value || !params.value.startsWith("http")) {
              e.preventDefault();
              toast.error("Invalid document URL");
            }
          }}
        >
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
        if (params.value === "pending") color = "orange";
        if (params.value === "completed") color = "green";
        if (params.value === "cancelled") color = "red";

        return (
          <span style={{ color, fontWeight: "bold", fontSize: "14px" }}>
            {params.value.charAt(0).toUpperCase() + params.value.slice(1)}
          </span>
        );
      },
    },
  ];

  // Prepare rows for the DataGrid
  const rows =
    services?.map((service) => ({
      id: service._id,
      serviceName: service.serviceName,
      serviceDate: new Date(service.serviceDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      identificationDocument: service.identificationDocument,
      message: `${service.message.slice(0, 20)}...`,
      serviceStatus: service.serviceStatus,
    })) || [];

  return (
    <section className="church-services-table-wrapper">
      <h1 className="">Church Services</h1>

      {loading && <PageLoader isLoading={loading} message="" size={80} />}

      {error && <Alert className="error-message">{error}</Alert>}

      {!loading && !error && services && (
        <div style={{ width: "100%" }}>
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

export default ChurchServices;
