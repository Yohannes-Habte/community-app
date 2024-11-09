import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";
import "./AllEvents.scss";
import { Alert } from "@mui/material";
import PageLoader from "../../../utile/loader/pageLoader/PageLoader";

import { useDispatch, useSelector } from "react-redux";
import {
  clearAllEventErrors,
  fetchEntireEvents,
} from "../../../redux/actions/event/eventAction";

const AllEvents = () => {
  const dispatch = useDispatch();
  const { events = [], loading, error } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(fetchEntireEvents());

    return () => {
      dispatch(clearAllEventErrors());
    };
  }, [dispatch]);

  // const handleViewEvents = () => {
  //   navigate("/admin/dashboard");
  //   setIsActive(7);
  // };

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
    
      )}
    </section>
  );
};

export default AllEvents;
