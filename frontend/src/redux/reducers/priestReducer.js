import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  delegatedPriest: null,
  priests: [],
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

const priestReducer = createSlice({
  name: "priest",
  initialState,
  reducers: {
    // Delegated priest
    postDelegatePriestStart: setLoading,
    postDelegatePriestSuccess: (state, action) =>
      setSuccess(state, action, "delegatedPriest"),
    postDelegatePriestFailure: setFailure,

    // Fetch a single delegated priest
    fetchDelegatedPriestStart: setLoading,
    fetchDelegatedPriestSuccess: (state, action) =>
      setSuccess(state, action, "delegatedPriest"),
    fetchDelegatedPriestFailure: setFailure,

    // Update a single delegated priest
    updateDelegatedPriestStart: setLoading,
    updateDelegatedPriestSuccess: (state, action) =>
      setSuccess(state, action, "delegatedPriest"),
    updateDelegatedPriestFailure: setFailure,

    // Delete a single delegated priest
    deleteDelegatedPriestStart: setLoading,
    deleteDelegatedPriestSuccess: (state, action) =>
      setSuccess(state, action, "delegatedPriest"),
    deleteDelegatedPriestFailure: setFailure,

    // Get All Delegated priests
    fetchAllDelegatedPriestsStart: setLoading,
    fetchAllDelegatedPriestsSuccess: (state, action) =>
      setSuccess(state, action, "priests"),
    fetchAllDelegatedPriestsFailure: setFailure,

    // Clear errors
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postDelegatePriestStart,
  postDelegatePriestSuccess,
  postDelegatePriestFailure,

  fetchDelegatedPriestStart,
  fetchDelegatedPriestSuccess,
  fetchDelegatedPriestFailure,

  updateDelegatedPriestStart,
  updateDelegatedPriestSuccess,
  updateDelegatedPriestFailure,

  deleteDelegatedPriestStart,
  deleteDelegatedPriestSuccess,
  deleteDelegatedPriestFailure,

  fetchAllDelegatedPriestsStart,
  fetchAllDelegatedPriestsSuccess,
  fetchAllDelegatedPriestsFailure,

  clearErrors,
} = priestReducer.actions;

export default priestReducer.reducer;
