import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import {
  clearAllErrors,
  fetchAllServices,
} from "../../../redux/actions/service/serviceAction";
import ReactIcons from "../../reactIcons/ReactIcons";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";
import "./AllChurchServices.scss";

const AllChurchServices = () => {
  const { trashIcon, editIcon, closeIcon } = ReactIcons();
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

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/users/${id}`);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }

    // allUsers();
  };

  // Parishioners header
  const columns = [
    { field: "id", headerName: "Service ID", width: 250 },
    { field: "serviceName", headerName: "Service Name", width: 200 },
    { field: "serviceDate", headerName: "Service Date", width: 200 },
    { field: "identificationDocument", headerName: "Phone Number", width: 200 },
    { field: "message", headerName: "Message", width: 200 },
    { field: "serviceStatus", headerName: "Service Status", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <button className="edit" onClick={() => setOpen(true)}>
              {editIcon}
            </button>

            <button
              className="delete"
              onClick={() => setServiceId(params.id) || setOpen(true)}
            >
              {trashIcon}
            </button>
          </div>
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
        serviceDate: service.serviceDate,
        identificationDocument: service.identificationDocument,
        message: service.message,
        serviceStatus: service.serviceStatus,
      });
    });

  return (
    <section>
      <h1> Church Services </h1>

      {loading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

      {!loading && !error && (
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

      {open && (
        <article className="service-delete-confirmation-wrapper">
          <span className="delete-icon" onClick={() => setOpen(false)}>
            {" "}
            {closeIcon}{" "}
          </span>

          <h3 className="you-want-delete-user">
            Are you sure you want delete this service?
          </h3>
          <aside className="cancel-or-confirm-delete">
            <p className={`cancel-delete`} onClick={() => setOpen(false)}>
              cancel
            </p>
            <h3
              className={`confirm-delete`}
              onClick={() => setOpen(false) || handleDelete(serviceId)}
            >
              confirm
            </h3>
          </aside>
        </article>
      )}
    </section>
  );
};

export default AllChurchServices;
