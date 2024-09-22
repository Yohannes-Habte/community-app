import "./AllDelegations.scss";
import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useDispatch, useSelector } from "react-redux";
import PageLoader from "../../../utiles/loader/pageLoader/PageLoader";
import {
  clearErrorsAction,
  fetchDelegatedPriests,
} from "../../../redux/actions/delegation/delegationAction";
import AddDelegation from "../../forms/priestDelegation/AddDelegation";
import { MdEditSquare } from "react-icons/md";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { API } from "../../../utiles/securitiy/secreteKey";
import { toast } from "react-toastify";

const AllDelegations = () => {
  // Global state variables
  const { priests, error, loading } = useSelector((state) => state.priest);
  const dispatch = useDispatch();

  // Local state variable
  const [delegationId, setDelegationId] = useState("");
  const [open, setOpen] = useState(false);
  const [openDelegation, setOpenDelegation] = useState(false);

  useEffect(() => {
    dispatch(fetchDelegatedPriests());

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
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="action-wrapper">
            <Link to={`/services/${params.id}`} className="edit">
              <MdEditSquare />
            </Link>

            <button
              className="delete"
              onClick={() => setDelegationId(params.id) || setOpen(true)}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
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

  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/services/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(fetchDelegatedPriests());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="delegated-priests-wrapper">
      <h2 className="delegated-priests-title"> Priests Delegation List </h2>

      {loading && <PageLoader />}

      {error ? <p className="error-message"> {error} </p> : null}

      <aside className="add-delegation-aside">
        <h3 className="add-delegation-aside-title">Add Delegated Priest</h3>
        <button
          onClick={() => setOpenDelegation(true)}
          className="add-delegation-btn"
        >
          Add New Delegation
        </button>
      </aside>

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
            X
          </span>

          <h3 className="you-want-delete">Are you sure you want delete?</h3>

          <aside className="cancel-or-confirm-delete">
            <h3
              className={`confirm-delete`}
              onClick={() => setOpen(false) || handleDelete(delegationId)}
            >
              confirm
            </h3>
            <p className={`cancel-delete`} onClick={() => setOpen(false)}>
              cancel
            </p>
          </aside>
        </article>
      )}

      {openDelegation && (
        <AddDelegation setOpenDelegation={setOpenDelegation} />
      )}
    </section>
  );
};

export default AllDelegations;
