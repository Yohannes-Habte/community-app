import axios from "axios";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { API } from "../../../utiles/securitiy/secreteKey";
import "./AllEvents.scss";

const AllEvents = () => {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const getAllEvents = async () => {
      try {
        const { data } = await axios.get(`${API}/events`);
        setEvents(data.result);
      } catch (error) {
        console.log(error);
      }
    };
    getAllEvents();
  }, []);

  const columns = [
    { field: "eventName", headerName: "Event Name", width: 250 },
    { field: "eventPurpose", headerName: "Event PUrpose", width: 400 },
    { field: "eventOrganizer", headerName: "Event Organizer", width: 150 },
    { field: "eventFacilitator", headerName: "Event Facilitator", width: 150 },
    { field: "eventAddress", headerName: "Event Address", width: 200 },
    { field: "eventDate", headerName: "Event Date", width: 150 },
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
        eventPurpose: event.eventPurpose,
        eventOrganizer: event.eventOrganizer,
        eventFacilitator: event.eventFacilitator,
        eventAddress: formattedDate,
        eventDate: event.eventDate,
      });
    });

  return (
    <section className="church-events-table-container">
      <h3 className="church-events-table-title">List of Events</h3>

      <DataGrid
        // Rows
        rows={rows}
        // Columns
        columns={columns}
        // Automatically adjust grid height based on rows
        autoHeight
        // Initial state
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
    </section>
  );
};

export default AllEvents;
