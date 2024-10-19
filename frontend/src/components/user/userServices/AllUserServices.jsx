import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import "./AllUserServices.scss";

const useFetchUserServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${API}/members/services`, {
          withCredentials: true,
        });
        setServices(data.result);
      } catch (err) {
        const errorMessage =
          err.response?.data?.message ||
          "An error occurred while fetching services.";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
};

const AllUserServices = () => {
  const { services, loading, error } = useFetchUserServices();

  // Define DataGrid columns
  const columns = [
    { field: "id", headerName: "Service ID", width: 150 },
    { field: "serviceName", headerName: "Service Name", width: 150 },
    { field: "serviceDate", headerName: "Service Date", width: 150 },
    {
      field: "identificationDocument",
      headerName: "Identification Document",
      width: 250,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          View Document
        </a>
      ),
    },

    {
      field: "serviceStatus",
      headerName: "Service Status",
      width: 150,
      renderCell: (params) => {
        let color = "";

        switch (params.value) {
          case "pending":
            color = "orange";
            break;
          case "completed":
            color = "green";
            break;
          case "cancelled":
            color = "red";
            break;
          default:
            color = "black";
        }

        return (
          <span
            style={{
              color,
              fontWeight: "bold",
              fontSize: "14px",
              textTransform: "capitalize",
            }}
          >
            {params.value}
          </span>
        );
      },
    },
  ];

  // Format date to DD/MM/YYYY
  const formatDate = (dateString) => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Intl.DateTimeFormat("en-GB", options).format(
      new Date(dateString)
    );
  };

  // Prepare rows for DataGrid
  const rows = services.map((service) => ({
    id: service._id?.slice(-10).concat("..."),
    serviceName: service.serviceName,
    serviceDate: formatDate(service.serviceDate),
    identificationDocument: service.identificationDocument,
    serviceStatus: service.serviceStatus,
  }));

  return (
    <section className="church-services-table-wrapper">
      <h1>Church Services</h1>

      {loading ? (
        <PageLoader
          isLoading={loading}
          message="Loading ..."
          size={90}
        />
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : services.length === 0 ? (
        <p className="error-message">No services found</p>
      ) : (
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

export default AllUserServices;
