import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import {
  clearAllErrors,
  fetchAllServices,
} from "../../../redux/actions/service/serviceAction";
import axios from "axios";
import { toast } from "react-toastify";
import "./AllChurchServices.scss";
import { Link } from "react-router-dom";
import { API } from "../../../utile/security/secreteKey";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Alert } from "@mui/material";

const AllChurchServices = () => {
  const dispatch = useDispatch();
  const { services, loading, error } = useSelector((state) => state.service);

  // Local state variable
  const [serviceId, setServiceId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllServices());

    // Optional: Clear errors on component unmount
    return () => {
      dispatch(clearAllErrors());
    };
  }, [dispatch]);

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/services/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(fetchAllServices());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  // Parishioners header
  const columns = [
  
    { field: "serviceName", headerName: "Service Name", width: 200 },
    { field: "serviceDate", headerName: "Service Date", width: 200 },
    {
      field: "identificationDocument",
      headerName: "Identification Document",
      width: 300,
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

        if (params.value === "pending") color = "orange";
        else if (params.value === "completed") color = "green";
        else if (params.value === "cancelled") color = "red";

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
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => (
        <div className="action-wrapper">
          <Link to={`/services/${params.id}`} className="edit">
            <MdEditSquare className="edit-icon" />
          </Link>

          <button
            className="delete-btn"
            onClick={() => setServiceId(params.id) || setOpen(true)}
          >
            <FaTrashAlt className="delete-icon" />
          </button>
        </div>
      ),
    },
  ];

  const rows = services.map((service) => ({
    id: service._id,
    serviceName: service.serviceName,
    serviceDate: new Date(service.serviceDate).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }),
    identificationDocument: service.identificationDocument,
    message: service.message.slice(0, 20) + "...",
    serviceStatus: service.serviceStatus,
  }));

  return (
    <section className="church-services-table-wrapper">
      <h1 className="church-services-table-title"> Church Services </h1>

      {loading ? (
        <PageLoader />
      ) : error ? (
        <Alert className="error-message"> {error} </Alert>
      ) : services.length === 0 ? (
        <Alert className="no-services-message">No available services</Alert>
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

      {open && (
        <article className="service-delete-confirmation-modal">
          <h3 className="delete-confirmation-title">Delete Church Service</h3>
          <p className="delete-confirmation-statement">
            Are you sure you want to delete this church service? This action
            cannot be undone.
          </p>
          <div className="confirmation-buttons-wrapper">
            <button
              className="cancel-delete-btn"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>

            <button
              className="confirm-delete-btn"
              onClick={() => setOpen(false) || handleDelete(serviceId)}
            >
              Delete
            </button>
          </div>
        </article>
      )}
    </section>
  );
};

export default AllChurchServices;
