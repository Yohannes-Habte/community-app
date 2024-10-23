import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentEvent: null,
  events: [],
  error: null,
  loading: false,
};

// Helper functions for reducing redundancy
const requestStart = (state) => {
  state.loading = true;
  state.error = null; // Reset error state
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const requestFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const eventReducer = createSlice({
  name: "event",
  initialState,
  reducers: {
    // Post an event
    eventPostStart: requestStart,
    eventPostSuccess: (state, action) =>
      requestSuccess(state, action, "currentEvent"),
    eventPostFailure: requestFailure,

    // Fetch a single event
    fetchEventStart: requestStart,
    fetchEventSuccess: (state, action) =>
      requestSuccess(state, action, "currentEvent"),
    fetchEventFailure: requestFailure,

    // Update an event
    updateEventStart: requestStart,
    updateEventSuccess: (state, action) =>
      requestSuccess(state, action, "currentEvent"),
    updateEventFailure: requestFailure,

    // Delete a single event
    deleteEventStart: requestStart,
    deleteEventSuccess: (state, action) =>
      requestSuccess(state, action, "currentEvent"),
    deleteEventFailure: requestFailure,

    // Fetch all events
    fetchAllEventsStart: requestStart,
    fetchAllEventsSuccess: (state, action) =>
      requestSuccess(state, action, "events"),
    fetchAllEventsFailure: requestFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  eventPostStart,
  eventPostSuccess,
  eventPostFailure,

  fetchEventStart,
  fetchEventSuccess,
  fetchEventFailure,

  updateEventStart,
  updateEventSuccess,
  updateEventFailure,

  deleteEventStart,
  deleteEventSuccess,
  deleteEventFailure,

  fetchAllEventsStart,
  fetchAllEventsSuccess,
  fetchAllEventsFailure,

  clearErrors,
} = eventReducer.actions;

export default eventReducer.reducer;
