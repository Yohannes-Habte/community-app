import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  contribution: null,
  contributions: [], // Initialize as an empty array
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

const contributionSlice = createSlice({
  name: "contributions",
  initialState,
  reducers: {
    // Post a contribution
    postContributionStart: requestStart,
    postContributionSuccess: (state, action) =>
      requestSuccess(state, action, "contribution"),
    postContributionFailure: requestFailure,

    // Fetch a single contribution
    fetchContributionStart: requestStart,
    fetchContributionSuccess: (state, action) =>
      requestSuccess(state, action, "contribution"),
    fetchContributionFailure: requestFailure,

    // Update a single contribution
    updateContributionStart: requestStart,
    updateContributionSuccess: (state, action) =>
      requestSuccess(state, action, "contribution"),
    updateContributionFailure: requestFailure,

    // Delete a single contribution
    deleteContributionStart: requestStart,
    deleteContributionSuccess: (state, action) =>
      requestSuccess(state, action, "contribution"),
    deleteContributionFailure: requestFailure,

    // Fetch all contributions
    fetchAllContributionsStart: requestStart,
    fetchAllContributionsSuccess: (state, action) =>
      requestSuccess(state, action, "contributions"),
    fetchAllContributionsFailure: requestFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postContributionStart,
  postContributionSuccess,
  postContributionFailure,

  fetchContributionStart,
  fetchContributionSuccess,
  fetchContributionFailure,

  updateContributionStart,
  updateContributionSuccess,
  updateContributionFailure,

  deleteContributionStart,
  deleteContributionSuccess,
  deleteContributionFailure,

  fetchAllContributionsStart,
  fetchAllContributionsSuccess,
  fetchAllContributionsFailure,

  clearErrors,
} = contributionSlice.actions;

export default contributionSlice.reducer;
