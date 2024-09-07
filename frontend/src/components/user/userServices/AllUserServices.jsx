import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";

const AllUserServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Log the fetched services for debugging
  console.log("User services =", services);

  // Fetch services when component mounts
  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/members/services`, {
          withCredentials: true,
        });
        setServices(data.result);
        setLoading(false);
      } catch (error) {
        setError(error.response?.data?.message || "An error occurred");
        toast(error.response?.data?.message || "An error occurred");
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchServices();
  }, []);

  // Columns for DataGrid
  const columns = [
    { field: "id", headerName: "Service ID", width: 250 },
    { field: "serviceName", headerName: "Service Name", width: 200 },
    { field: "serviceDate", headerName: "Service Date", width: 200 },
    {
      field: "identificationDocument",
      headerName: "Identification Document",
      width: 300,  // Adjust width to fit the document URL
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

  // Prepare rows for DataGrid
  const rows = services.map((service) => ({
    id: service._id,
    serviceName: service.serviceName,
    serviceDate: new Date(service.serviceDate).toLocaleDateString(), // Format date
    identificationDocument: service.identificationDocument,
    message: service.message.slice(0, 20) + "...", 
    serviceStatus: service.serviceStatus,
  }));

  return (
    <section className="church-services-table-wrapper">
      <h1> Church Services </h1>

      {/* Show Loader if loading */}
      {loading && <PageLoader />}

      {/* Show error message if there's an error */}
      {error ? <p className="error-message"> {error} </p> : null}

      {/* Show DataGrid when not loading or error */}
      {!loading && !error && (
        <div style={{ width: "100%" }}>
          <DataGrid
            // Rows and Columns
            rows={rows}
            columns={columns}
            // Automatically adjust grid height based on rows
            autoHeight
            // Initial state for pagination
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 10 },
              },
            }}
            // Enable search/filter toolbar
            slots={{ toolbar: GridToolbar }}
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

export default AllUserServices;
