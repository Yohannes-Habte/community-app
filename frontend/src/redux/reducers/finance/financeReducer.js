import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentReport: null,
  financialReports: [],
  loading: false,
  error: null,
};

// Utility function to handle setting loading and error states
const startLoading = (state) => {
  state.loading = true;
  state.error = null; // Reset error state
};

const setSuccess = (state, action, key) => {
  state[key] = action.payload;
  state.loading = false;
};

const setError = (state, action) => {
  state.error = action.payload;
  state.loading = false;
};

const financeReducer = createSlice({
  name: "finance",
  initialState,
  reducers: {
    // Post a financial report
    postFinancialReportStart: (state) => startLoading(state),
    postFinancialReportSuccess: (state, action) =>
      setSuccess(state, action, "currentReport"),
    postFinancialReportFailure: (state, action) => setError(state, action),

    // Fetch a single financial report
    fetchFinancialReportStart: (state) => startLoading(state),
    fetchFinancialReportSuccess: (state, action) =>
      setSuccess(state, action, "currentReport"),
    fetchFinancialReportFailure: (state, action) => setError(state, action),

    // Update a single financial report
    updateFinancialReportStart: (state) => startLoading(state),
    updateFinancialReportSuccess: (state, action) =>
      setSuccess(state, action, "currentReport"),
    updateFinancialReportFailure: (state, action) => setError(state, action),

    // Delete a single financial report
    deleteFinancialReportStart: (state) => startLoading(state),
    deleteFinancialReportSuccess: (state, action) =>
      setSuccess(state, action, "currentReport"),
    deleteFinancialReportFailure: (state, action) => setError(state, action),

    // Fetch all financial reports
    fetchAllFinancialReportsStart: (state) => startLoading(state),
    fetchAllFinancialReportsSuccess: (state, action) =>
      setSuccess(state, action, "financialReports"),
    fetchAllFinancialReportsFailure: (state, action) => setError(state, action),

    // Clear all errors
    clearFinanceErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  postFinancialReportStart,
  postFinancialReportSuccess,
  postFinancialReportFailure,

  fetchFinancialReportStart,
  fetchFinancialReportSuccess,
  fetchFinancialReportFailure,

  updateFinancialReportStart,
  updateFinancialReportSuccess,
  updateFinancialReportFailure,

  deleteFinancialReportStart,
  deleteFinancialReportSuccess,
  deleteFinancialReportFailure,

  fetchAllFinancialReportsStart,
  fetchAllFinancialReportsSuccess,
  fetchAllFinancialReportsFailure,

  clearFinanceErrors,
} = financeReducer.actions;

export default financeReducer.reducer;
