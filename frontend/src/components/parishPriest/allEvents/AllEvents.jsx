import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState, useMemo } from "react";
import "./AllEvents.scss";
import { Alert } from "@mui/material";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";
import { API } from "../../../utile/security/secreteKey";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getAllEvents = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await axios.get(`${API}/events/priest`, {
          withCredentials: true,
        });
        setEvents(data.result || []);
      } catch (err) {
        setError(err?.response?.data?.message || "Failed to fetch events.");
      } finally {
        setLoading(false);
      }
    };
    getAllEvents();
  }, []);

  // DataGrid columns configuration
  const columns = useMemo(
    () => [
      { field: "eventDate", headerName: "Event Date", width: 150 },
      { field: "eventName", headerName: "Event Name", width: 250 },
      { field: "eventOrganizer", headerName: "Organizer", width: 250 },
      { field: "eventFacilitator", headerName: "Facilitator", width: 250 },
      { field: "eventAddress", headerName: "Address", width: 200 },
    ],
    []
  );

  // Memoize rows to prevent unnecessary recalculations
  const rows = useMemo(
    () =>
      events.map((event) => ({
        id: event._id,
        eventName: event.eventName,
        eventPurpose: event.eventPurpose?.slice(0, 30).concat("...") || "N/A",
        eventOrganizer: event.eventOrganizer,
        eventFacilitator: event.eventFacilitator,
        eventAddress: event.eventAddress,
        eventDate: new Date(event.eventDate).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }),
      })),
    [events]
  );

  return (
    <section className="church-events-table-container">
      <h3 className="church-events-table-title">List of Events</h3>

      {/* Show loading spinner if the data is loading */}
      {loading ? (
        <PageLoader isLoading={loading} message="Loading..." size={90} />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : rows.length === 0 ? (
        <Alert severity="info">No events found.</Alert>
      ) : (
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

export default AllEvents;
