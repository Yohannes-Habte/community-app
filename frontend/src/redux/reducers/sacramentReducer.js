import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sacramentRequest: null,
  sacraments: [],
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

const sacramentReducer = createSlice({
  name: "sacrament",
  initialState,
  reducers: {
    // Create sacrament request
    postSacramentStart: setLoading,
    postSacramentSuccess: (state, action) =>
      setSuccess(state, action, "sacramentRequest"),
    postSacramentFailure: setFailure,

    // Fetch a single sacrament
    fetchSacramentStart: setLoading,
    fetchSacramentSuccess: (state, action) =>
      setSuccess(state, action, "sacramentRequest"),
    fetchSacramentFailure: setFailure,

    // Delete a single sacrament
    deleteSacramentStart: setLoading,
    deleteSacramentSuccess: (state, action) =>
      setSuccess(state, action, "sacramentRequest"),
    deleteSacramentFailure: setFailure,

    // Fetch all sacraments
    fetchAllSacramentsStart: setLoading,
    fetchAllSacramentsSuccess: (state, action) =>
      setSuccess(state, action, "sacraments"),
    fetchAllSacramentsFailure: setFailure,

    // Count all sacraments
    countSacramentsStart: setLoading,
    countSacramentsSuccess: (state, action) =>
      setSuccess(state, action, "count"),
    countSacramentsFailure: setFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postSacramentStart,
  postSacramentSuccess,
  postSacramentFailure,

  fetchSacramentStart,
  fetchSacramentSuccess,
  fetchSacramentFailure,

  deleteSacramentStart,
  deleteSacramentSuccess,
  deleteSacramentFailure,

  fetchAllSacramentsStart,
  fetchAllSacramentsSuccess,
  fetchAllSacramentsFailure,

  countSacramentsStart,
  countSacramentsSuccess,
  countSacramentsFailure,

  clearErrors,
} = sacramentReducer.actions;

export default sacramentReducer.reducer;
