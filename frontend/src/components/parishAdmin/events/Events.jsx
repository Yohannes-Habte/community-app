import { useDispatch, useSelector } from "react-redux";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import AddEvent from "../../forms/event/AddEvent";
import "./Events.scss";
import { useEffect, useState } from "react";
import {
  clearAllEventErrors,
  fetchAllEvents,
} from "../../../redux/actions/event/eventAction";
import { Link } from "react-router-dom";
import { FaTrashAlt } from "react-icons/fa";
import { MdEditSquare } from "react-icons/md";
import axios from "axios";
import { toast } from "react-toastify";
import { API } from "../../../utiles/securitiy/secreteKey";

const Events = () => {
  const dispatch = useDispatch();
  const { events, loading, error } = useSelector((state) => state.event);
  // Local state variable
  const [eventId, setEventId] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchAllEvents());

    // Clear errors
    return () => {
      dispatch(clearAllEventErrors());
    };
  }, []);

  const columns = [
    { field: "eventName", headerName: "Event Name", width: 250 },
    { field: "eventOrganizer", headerName: "Event Organizer", width: 250 },
    { field: "eventFacilitator", headerName: "Event Facilitator", width: 250 },
    { field: "eventAddress", headerName: "Event Address", width: 200 },
    { field: "eventDate", headerName: "Event Date", width: 150 },

    {
      field: "eventStatus",
      headerName: "Event Status",
      width: 150,
      renderCell: (params) => {
        let color = "";

        // Set the color based on the serviceStatus value
        if (params.value === "upcoming") {
          color = "orange";
        } else if (params.value === "past") {
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
            {params.value?.charAt(0).toUpperCase() + params.value?.slice(1)}
          </span>
        );
      },
    },
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
              onClick={() => setEventId(params.id) || setOpen(true)}
            >
              <FaTrashAlt />
            </button>
          </div>
        );
      },
    },
  ];

  const rows = [];

  events &&
    events.map((event) => {
      const formattedDate = new Date(event.eventDate).toLocaleDateString(
        "en-GB",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      );
      return rows.push({
        id: event._id,
        eventName: event.eventName,
        eventOrganizer: event.eventOrganizer,
        eventFacilitator: event.eventFacilitator,
        eventAddress: event.eventAddress,
        eventDate: formattedDate,
        eventStatus: event.eventStatus,
      });
    });

  // Delete event
  const handleDelete = async (id) => {
    try {
      const { data } = await axios.delete(`${API}/events/${id}`, {
        withCredentials: true,
      });
      toast.success(data.message);
      dispatch(fetchAllEvents());
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <section className="events-section-wrapper">
      <AddEvent />
      <h3 className="events-section-title">List of Events</h3>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {events.length === 0 && <p>No events available</p>}

      {!loading && !error && events.length > 0 && (
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
          //
        />
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
              onClick={() => setOpen(false) || handleDelete(eventId)}
            >
              confirm
            </h3>
            <p className={`cancel-delete`} onClick={() => setOpen(false)}>
              cancel
            </p>
          </aside>
        </article>
      )}
    </section>
  );
};

export default Events;
