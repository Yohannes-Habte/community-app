import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spiritualRequest: null,
  spirituals: [],
  count: null,
  error: null,
  loading: false,
};

const setLoading = (state) => {
  state.loading = true;
};

const setSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
  state.error = null;
};

const setFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const spiritualReducer = createSlice({
  name: "spiritual",
  initialState,
  reducers: {
    // Create spiritual request
    postSpiritualRequestStart: setLoading,
    postSpiritualRequestSuccess: (state, action) =>
      setSuccess(state, action, "spiritualRequest"),
    postSpiritualRequestFailure: setFailure,

    // Fetch a single spiritual development
    fetchSpiritualStart: setLoading,
    fetchSpiritualSuccess: (state, action) =>
      setSuccess(state, action, "spirituals"),
    fetchSpiritualFailure: setFailure,

    // Delete a single spiritual development
    deleteSpiritualStart: setLoading,
    deleteSpiritualSuccess: (state, action) =>
      setSuccess(state, action, "spirituals"),
    deleteSpiritualFailure: setFailure,

    // Fetch all spiritual developments
    fetchAllSpiritualsStart: setLoading,
    fetchAllSpiritualsSuccess: (state, action) =>
      setSuccess(state, action, "spirituals"),
    fetchAllSpiritualsFailure: setFailure,

    // Count all spiritual developments
    countSpiritualsStart: setLoading,
    countSpiritualsSuccess: (state, action) =>
      setSuccess(state, action, "count"),
    countSpiritualsFailure: setFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postSpiritualRequestStart,
  postSpiritualRequestSuccess,
  postSpiritualRequestFailure,

  fetchSpiritualStart,
  fetchSpiritualSuccess,
  fetchSpiritualFailure,

  deleteSpiritualStart,
  deleteSpiritualSuccess,
  deleteSpiritualFailure,

  fetchAllSpiritualsStart,
  fetchAllSpiritualsSuccess,
  fetchAllSpiritualsFailure,

  countSpiritualsStart,
  countSpiritualsSuccess,
  countSpiritualsFailure,

  clearErrors,
} = spiritualReducer.actions;

export default spiritualReducer.reducer;
