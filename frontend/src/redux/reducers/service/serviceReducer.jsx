import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  serviceRequest: null,
  services: [],
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

const serviceReducer = createSlice({
  name: "service",
  initialState,
  reducers: {
    // Create service request
    postServiceRequestStart: setLoading,
    postServiceRequestSuccess: (state, action) =>
      setSuccess(state, action, "serviceRequest"),
    postServiceRequestFailure: setFailure,

    // Fetch a single service request
    fetchServiceStart: setLoading,
    fetchServiceSuccess: (state, action) =>
      setSuccess(state, action, "serviceRequest"),
    fetchServiceFailure: setFailure,

    // Delete a single service request
    deleteServiceStart: setLoading,
    deleteServiceSuccess: (state, action) =>
      setSuccess(state, action, "serviceRequest"),
    deleteServiceFailure: setFailure,

    // Fetch all service requests
    fetchAllServicesStart: setLoading,
    fetchAllServicesSuccess: (state, action) =>
      setSuccess(state, action, "services"),
    fetchAllServicesFailure: setFailure,

    // Count all services
    servicesCountStart: setLoading,
    servicesCountSuccess: (state, action) => setSuccess(state, action, "count"),
    servicesCountFailure: setFailure,

    // Clear errors
    clearServiceErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postServiceRequestStart,
  postServiceRequestSuccess,
  postServiceRequestFailure,

  fetchServiceStart,
  fetchServiceSuccess,
  fetchServiceFailure,

  deleteServiceStart,
  deleteServiceSuccess,
  deleteServiceFailure,

  fetchAllServicesStart,
  fetchAllServicesSuccess,
  fetchAllServicesFailure,

  servicesCountStart,
  servicesCountSuccess,
  servicesCountFailure,

  clearServiceErrors,
} = serviceReducer.actions;

export default serviceReducer.reducer;
