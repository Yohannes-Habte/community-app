import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentCommittee: null,
  committeeBatch: [],
  committees: [],
  error: null,
  loading: false,
};

// Helper functions
const requestStart = (state) => {
  state.loading = true;
  state.error = null; // Reset error state
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const committeeSlice = createSlice({
  name: "committee",
  initialState,
  reducers: {
    // Post committee member
    postCommitteeStart: requestStart,
    postCommitteeSuccess: (state, action) =>
      requestSuccess(state, action, "currentCommittee"),
    postCommitteeFailure: setError,

    // Fetch single committee member
    fetchSingleCommitteeStart: requestStart,
    fetchSingleCommitteeSuccess: (state, action) =>
      requestSuccess(state, action, "currentCommittee"),
    fetchSingleCommitteeFailure: setError,

    // Update committee member
    updateCommitteeStart: requestStart,
    updateCommitteeSuccess: (state, action) =>
      requestSuccess(state, action, "currentCommittee"),
    updateCommitteeFailure: setError,

    // Fetch committee members based on service year ranges
    fetchCommitteeBatchStart: requestStart,
    fetchCommitteeBatchSuccess: (state, action) =>
      requestSuccess(state, action, "committeeBatch"),
    fetchCommitteeBatchFailure: setError,

    // Fetch all committee members
    fetchAllCommitteesStart: requestStart,
    fetchAllCommitteesSuccess: (state, action) =>
      requestSuccess(state, action, "committees"),
    fetchAllCommitteesFailure: setError,

    // Delete committee member
    deleteCommitteeStart: requestStart,
    deleteCommitteeSuccess: (state, action) =>
      requestSuccess(state, action, "currentCommittee"),
    deleteCommitteeFailure: setError,

    // Clear error state
    clearError: (state) => {
      state.error = null;
    },

    // Clear loading state
    clearLoading: (state) => {
      state.loading = false;
    },
  },
});

export const {
  postCommitteeStart,
  postCommitteeSuccess,
  postCommitteeFailure,

  fetchSingleCommitteeStart,
  fetchSingleCommitteeSuccess,
  fetchSingleCommitteeFailure,

  updateCommitteeStart,
  updateCommitteeSuccess,
  updateCommitteeFailure,

  fetchCommitteeBatchStart,
  fetchCommitteeBatchSuccess,
  fetchCommitteeBatchFailure,

  fetchAllCommitteesStart,
  fetchAllCommitteesSuccess,
  fetchAllCommitteesFailure,

  deleteCommitteeStart,
  deleteCommitteeSuccess,
  deleteCommitteeFailure,

  clearError,
  clearLoading,
} = committeeSlice.actions;

export default committeeSlice.reducer;
