import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  prayerRequest: null,
  prayers: [],
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
};

const setFailure = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const prayerReducer = createSlice({
  name: "prayer",
  initialState,
  reducers: {
    // Create prayer request
    postPrayerRequestStart: setLoading,
    postPrayerRequestSuccess: (state, action) =>
      setSuccess(state, action, "prayerRequest"),
    postPrayerRequestFailure: setFailure,

    // Fetch a single prayer request
    fetchPrayerStart: setLoading,
    fetchPrayerSuccess: (state, action) =>
      setSuccess(state, action, "prayerRequest"),
    fetchPrayerFailure: setFailure,

    // Delete a single prayer request
    deletePrayerStart: setLoading,
    deletePrayerSuccess: (state, action) =>
      setSuccess(state, action, "prayerRequest"),
    deletePrayerFailure: setFailure,

    // Fetch all prayer requests
    fetchAllPrayersStart: setLoading,
    fetchAllPrayersSuccess: (state, action) =>
      setSuccess(state, action, "prayers"),
    fetchAllPrayersFailure: setFailure,

    // Count all prayers
    prayersCountStart: setLoading,
    prayersCountSuccess: (state, action) => setSuccess(state, action, "count"),
    prayersCountFailure: setFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postPrayerRequestStart,
  postPrayerRequestSuccess,
  postPrayerRequestFailure,

  fetchPrayerStart,
  fetchPrayerSuccess,
  fetchPrayerFailure,

  deletePrayerStart,
  deletePrayerSuccess,
  deletePrayerFailure,

  fetchAllPrayersStart,
  fetchAllPrayersSuccess,
  fetchAllPrayersFailure,

  prayersCountStart,
  prayersCountSuccess,
  prayersCountFailure,

  clearErrors,
} = prayerReducer.actions;

export default prayerReducer.reducer;
