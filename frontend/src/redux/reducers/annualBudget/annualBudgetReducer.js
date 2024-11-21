import { createSlice } from "@reduxjs/toolkit";

// Initial state for the annual budget management
const initialState = {
  currentAnnualBudget: null,
  annualBudgets: [],
  error: null,
  loading: false,
};

// Helper functions for state transitions
const requestStart = (state) => {
  state.loading = true;
  state.error = null;
};

const requestSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

// Define the slice
const annualBudgetSlice = createSlice({
  name: "annualBudget",
  initialState,
  reducers: {
    // Handle adding a new annual budget
    addAnnualBudgetStart: requestStart,
    addAnnualBudgetSuccess: (state, action) =>
      requestSuccess(state, action, "currentAnnualBudget"),
    addAnnualBudgetFailure: setError,

    // Handle fetching a single annual budget
    fetchSingleAnnualBudgetStart: requestStart,
    fetchSingleAnnualBudgetSuccess: (state, action) =>
      requestSuccess(state, action, "currentAnnualBudget"),
    fetchSingleAnnualBudgetFailure: setError,

    // Handle updating an annual budget
    updateAnnualBudgetStart: requestStart,
    updateAnnualBudgetSuccess: (state, action) =>
      requestSuccess(state, action, "currentAnnualBudget"),
    updateAnnualBudgetFailure: setError,

    // Handle fetching all annual budgets
    fetchAllAnnualBudgetsStart: requestStart,
    fetchAllAnnualBudgetsSuccess: (state, action) =>
      requestSuccess(state, action, "annualBudgets"),
    fetchAllAnnualBudgetsFailure: setError,

    // Handle deleting an annual budget
    deleteAnnualBudgetStart: requestStart,
    deleteAnnualBudgetSuccess: (state, action) =>
      requestSuccess(state, action, "currentAnnualBudget"),
    deleteAnnualBudgetFailure: setError,

    // Clear error state
    clearAnnualBudgetError: (state) => {
      state.error = null;
    },

    // Clear loading state
    clearAnnualBudgetLoading: (state) => {
      state.loading = false;
    },
  },
});

// Export actions
export const {
  addAnnualBudgetStart,
  addAnnualBudgetSuccess,
  addAnnualBudgetFailure,

  fetchSingleAnnualBudgetStart,
  fetchSingleAnnualBudgetSuccess,
  fetchSingleAnnualBudgetFailure,

  updateAnnualBudgetStart,
  updateAnnualBudgetSuccess,
  updateAnnualBudgetFailure,

  fetchAllAnnualBudgetsStart,
  fetchAllAnnualBudgetsSuccess,
  fetchAllAnnualBudgetsFailure,

  deleteAnnualBudgetStart,
  deleteAnnualBudgetSuccess,
  deleteAnnualBudgetFailure,

  clearAnnualBudgetError,
  clearAnnualBudgetLoading,
} = annualBudgetSlice.actions;

// Export the reducer
export default annualBudgetSlice.reducer;
